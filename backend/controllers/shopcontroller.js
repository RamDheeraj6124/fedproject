const Shop = require('../models/Shop'); // Import the Shop model
const bcrypt = require('bcryptjs'); // For hashing passwords
const fs = require('fs');
const path = require('path');
const Booking = require('../models/Booking');
// Controller for registering a new shop
exports.registershop = async (req, res) => {
  const { owner,email, password } = req.body;

  try {
    // Check if the shop email already exists
    const existingShop = await Shop.findOne({ email });
    if (existingShop) {
      return res.status(400).json({ message: 'Shop with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new shop instance
    const newShop = new Shop({
      owner,
      email,
      password: hashedPassword
    });

    // Save the new shop in the database
    await newShop.save();

    res.status(201).json({ message: 'Shop registered successfully', shop: newShop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
exports.loginshop = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Email and password are required' });
    }

    try {
        // Find the shop by email
        const shop = await Shop.findOne({ email }).exec();
        if (!shop) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, shop.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Store shop details in the session
        req.session.shop = shop;
        console.log('Session created:', req.session.shop);
        res.status(200).json({ msg: 'Login Successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};


exports.checkshopsession = (req, res) => {

    if (req.session.shop) {

        const shop = req.session.shop;

        if (shop.availablesports && shop.availablesports.length > 0) {
            shop.availablesports = shop.availablesports.map((sport) => {
                try {
                    const filepath = path.join(__dirname, '..', sport.image);
                    const imageBuffer = fs.readFileSync(filepath);
                    // Convert the image to a base64 string with MIME type
                    sport.getimage = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
                } catch (imageError) {
                    console.error(`Error reading image for ${sport.groundname}:`, imageError);
                    sport.getimage = ''; // Push an empty string if image not found
                }
                return sport;
            });
        } else {
            console.log('No available sports found for this shop.');
        }

        res.status(200).json({ msg: 'Shop session exists', shop: req.session.shop });
    } else {
        res.status(400).json({ msg: "Session does not exist" });
    }
};


exports.updateshop = async (req, res) => {
    if (!req.session.shop) {
        return res.status(401).json({ msg: 'No shop logged in' });
    }

    const shopId = req.session.shop._id;
    const { shopname, address } = req.body;

    try {
        const updatedShop = await Shop.findByIdAndUpdate(shopId, { shopname, address }, { new: true });

        if (!updatedShop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }

        req.session.shop = updatedShop; // Optionally update session data
        res.status(200).json({ msg: 'Shop details updated successfully', updatedShop });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};


exports.addground = async (req, res) => {
    const { groundname, priceperhour, maxplayers, groundLength, groundwidth, facilities, surfaceType, availability } = req.body;
    const image = req.file; // Multer stores the uploaded file in req.file

    // Parse the availability from the request
    let parsedAvailability;
    console.log(req.body);
    console.log(availability);

    try {
        // Check if availability is a string and parse it
        if (typeof availability === 'string') {
            parsedAvailability = JSON.parse(availability);
        } else {
            parsedAvailability = availability;
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Invalid availability data' });
    }

    // Validate the required fields
    if (!groundname || !priceperhour || !maxplayers || !groundLength || !groundwidth || !facilities || !surfaceType) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        // Find the shop by user session or ID (you may want to adapt this)
        const shopId = req.session.shop._id; // Assuming you store shop ID in session
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }

        // Determine the file extension from the mimetype
        const fileExtension = image.originalname.split('.').pop();
        const imagePath = `public/images/${shopId}${groundname}.${fileExtension}`; // Fixed file path format

        // Create a new ground object
        const newGround = {
            groundname,
            priceperhour,
            maxplayers,
            grounddimensions: {
                length: groundLength,
                width: groundwidth,
            },
            facilities: facilities.split(',').map(facility => facility.trim()), // Convert to array
            surfacetype: surfaceType,
            availability: parsedAvailability, // Use parsed availability
            image: imagePath, // Save the image path if it exists
            status: 'Active', // Default status
            verify: false,    // Default verification
            appliedforverification: false // Default verification application
        };

        // Push the new ground to the shop's availablesports array
        shop.availablesports.push(newGround);
        await shop.save();
        shop.availablesports = shop.availablesports.map((sport) => {
            try {
                const filepath = path.join(__dirname, '..', sport.image);
                if (fs.existsSync(filepath)) {
                    const imageBuffer = fs.readFileSync(filepath);
                    sport.getimage = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
                } else {
                    sport.getimage = ''; // If image doesn't exist, use an empty string
                }
            } catch (imageError) {
                console.error(`Error reading image for ${sport.groundname}:`, imageError);
                sport.getimage = ''; // If any error occurs, set the image to an empty string
            }
            return sport;
        });
        req.session.shop = shop;

        res.status(201).json({ msg: 'Ground added successfully!', shop });
    } catch (error) {
        console.error('Error adding ground:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};
exports.applyforverification = async (req, res) => {
    try {
      const { groundname } = req.body;
  
      // Find the ground in the shop's available sports and mark it as applied for verification
      const shopid = req.session.shop;
      const shop=await Shop.findById(shopid);
      const ground = shop.availablesports.find(g => g.groundname === groundname);
      
      if (ground) {
        ground.appliedforverification = true;
        await shop.save(); // Save changes to the database
        
        // Update session data with the new shop object
        req.session.shop = shop;

  
        return res.status(200).json({ message: 'Verification applied successfully' });
      } else {
        return res.status(404).json({ message: 'Ground not found' });
      }
    } catch (error) {
      console.error('Error applying for verification:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
 // Adjust the path to your Shop model

exports.loadVenues = async (req, res) => {
  try {
    // Fetch all shops with at least one verified sport ground
    const shopsWithVenues = await Shop.find({ 'availablesports.verify': true }).exec();

    // Create a response format for venues
    const venueData = shopsWithVenues.map(shop => {
      // Filter only verified sports grounds
      const verifiedSports = shop.availablesports.filter(sport => sport.verify);

      // Return only if there are verified sports grounds
      return verifiedSports.map(sport => {
        // Construct the image path
        const imagePath = path.join(__dirname, '..', sport.image); // Adjust path as needed
        let imageBase64 = '';
        // Read the image file and convert to base64
        try {
          const imageBuffer = fs.readFileSync(imagePath);
          imageBase64 = imageBuffer.toString('base64');
        } catch (imageError) {
          console.error(`Error reading image for ${sport.groundname}:`, imageError);
          imageBase64 = ''; // Default to an empty string if image not found
        }

        // Return venue data including ground dimensions, availability, and facilities
        return {
          name: shop.shopname,
          address: shop.address,
          image: `data:image/jpeg;base64,${imageBase64}`, // Include base64 encoded image
          groundname: sport.groundname,
          priceperhour: sport.priceperhour,
          maxplayers: sport.maxplayers,
          surfacetype: sport.surfacetype,
          status: sport.status,
          grounddimensions: sport.grounddimensions,
          availability: sport.availability,
          facilities: sport.facilities
        };
      });
    }).flat(); // Flatten the array of arrays into a single array

    // Check if any verified venues were found
    if (venueData.length === 0) {
      return res.status(404).json({ message: 'No verified venues found' });
    }

    // Send the venues data in response
    res.status(200).json(venueData);
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.loadGround = async (req, res) => {
    try {
        const { name } = req.body;
        const shopname = name.split('_')[0].replace(/-/g, ' ');
        const groundname = name.split('_')[1];
        
        const shop = await Shop.findOne({ shopname });
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found.' });
        }

        const groundIndex = shop.availablesports.findIndex(sport => sport.groundname === groundname);
        if (groundIndex === -1) {
            return res.status(404).json({ message: 'Ground not found in this shop.' });
        }

        const ground = shop.availablesports[groundIndex];
        const imagePath = path.join(__dirname, '..', ground.image);

        // Check if the image path exists and convert to Base64
        if (ground.image) {
            // Read the image file and convert to base64
            try {
                const imageBuffer = fs.readFileSync(imagePath);
                const imageBase64 = imageBuffer.toString('base64');
                const imageType = path.extname(ground.image).substring(1); // Get the image type
                ground.image = `data:image/${imageType};base64,${imageBase64}`;
            } catch (imageError) {
                console.error(`Error reading image for ${ground.groundname}:`, imageError);
                ground.image = null; // Set image to null if error occurs
            }
        }
        const address=shop.address;

        res.status(200).json({ground,address});
    } catch (error) {
        console.error('Error loading ground:', error);
        res.status(500).json({ message: 'An error occurred while loading the ground.' });
    }
};

exports.bookground = async (req, res) => {
    const {  shopname, groundname, date, timeSlot,groundfee,platformfee, amountPaid } = req.body;
    console.log(shopname+ groundname+ date+ timeSlot+ amountPaid )
    // Validation
    if ( !shopname || !groundname || !date || !timeSlot || !amountPaid) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    
    
    try {
        const user=req.session.user;
    const shop=await Shop.findOne({shopname:shopname});
    // Create a new booking record
    const newBooking = new Booking({
        user,
        shop,
        groundname,
        date: new Date(date),
        timeSlot,
        amountPaid,
        groundfee,
          platformfee,
          amountPaid,
        status: 'Confirmed', // Default status
    });
        // Save the new booking to the database
        await newBooking.save();
        return res.status(201).json({ message: 'Booking confirmed!', booking: newBooking });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while saving the booking.', error });
    }
};
exports.todaybookings = async (req, res) => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    console.log(today);

    try {
        const bookings = await Booking.find({
            date: {
                $gte: startOfToday,
                $lt: endOfToday
            }
        }).populate('user') // Adjust as needed
          .populate('shop'); // Adjust as needed

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};
exports.checkRevenue = async (req, res) => {
    try {
        // Fetch the shop with populated available sports
        const shop = await Shop.findById(req.session.shop._id).populate('availablesports'); 
        const bookings = await Booking.find({ shop: shop._id }).populate('shop');

        const groundRevenueMap = {};
        let totalRevenue = 0;

        bookings.forEach((booking) => {
            // Get the ground name from the booking
            const groundName = booking.groundname;
            const groundFee = booking.groundfee || 0; // Get ground fee or default to 0
            console.log(groundFee);
            totalRevenue += groundFee; // Increment total revenue

            // Increment ground revenue in the map
            if (groundRevenueMap[groundName]) {
                groundRevenueMap[groundName].groundFee += groundFee; // Increment existing ground fee
            } else {
                // Initialize ground revenue entry
                groundRevenueMap[groundName] = {
                    groundName: groundName,
                    groundFee: groundFee
                };
            }
        });

        console.log("Ground Revenue Map:", groundRevenueMap); // Log the revenue map

        // Transform the revenue map into an array format for response
        const groundRevenues = Object.values(groundRevenueMap);

        res.json({
            totalRevenue: totalRevenue,
            groundRevenues: groundRevenues
        });
    } catch (error) {
        console.error("Error fetching revenue data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.logout=async (req,res)=>{
    if (req.session && req.session.shop) {
        // Destroy the session
        req.session.destroy(err => {
            if (err) {
                console.error('Session destruction error:', err);
                return res.status(500).json({ message: 'Failed to log out' });
            }
            // Clear the cookie
            return res.status(200).json({ message: 'Logged out successfully' });
        });
    } else {
        return res.status(400).json({ message: 'No active session to log out from' });
    }
}

