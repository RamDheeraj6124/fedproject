const express = require('express');
const User = require('../models/User');
const Shop = require('../models/Shop');
const Booking=require('../models/Booking');
const Sport=require('../models/Sport');

const displaydetails = async () => {
    let users = [];
    let shops = [];
    try {
        users = await User.find();
        shops = await Shop.find();
        return { users, shops }; // Return the data
    } catch (err) {
        console.error(err);
        throw new Error("Error retrieving data");
    }
};

exports.checksession = async (req, res) => {
    if (req.session.user && req.session.user.role === "admin") {
        try {
            // Call displaydetails directly
            const admin=await User.findById(req.session.user._id);
            const details = await displaydetails();
            res.status(200).json({
                message: "Session Exists",
                username:req.session.user.username,
                details,
                admin // Include the details in the response
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error retrieving details" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};


// Admin verify route
exports.adminverify= async (req, res) => {
    const { shopId, availablesports } = req.body;

    try {
        // Find the shop by ID
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Update the shop's availablesports verification status
        shop.availablesports = availablesports;

        // Save the updated shop
        const updatedShop = await shop.save();

        // Return the updated shop
        return res.json(updatedShop);
    } catch (error) {
        console.error("Error during shop verification:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.admindeleteground = async (req, res) => {
    const { shopId, groundName } = req.body;
    try {
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Find the index of the ground to be deleted
        const groundIndex = shop.availablesports.findIndex(sport => sport.groundname === groundName);
        if (groundIndex === -1) {
            return res.status(404).json({ message: 'Ground not found' });
        }

        // Remove the ground from the availablesports array
        shop.availablesports.splice(groundIndex, 1);
        
        // Save the updated shop document
        await shop.save();

        return res.status(200).json({ message: 'Ground deleted successfully', shop });
    } catch (error) {
        console.error("Error during shop deletion:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.admindeleteuser=async (req,res)=>{
    const {userId}=req.body;
    try{
        await User.findByIdAndDelete(userId);
    res.status(200).json({message:'Deleted Succesfully'});
    }
        catch(error){
            console.log(error);
        }

}



exports.fixpercentage=async (req,res)=>{
    const {percentage}=req.body;
    try{
        const adminid=req.session.user._id;
        const admin=await User.findById(adminid);
        admin.revenuepercentage=percentage;
        await admin.save();
        console.log('hi');
        res.status(200).json({message:'Percentage updated successfully'});
        }
        catch(error){
            console.log(error);
        }

}
exports.getpercentage = async (req, res) => {
    try {
        // Define the role first
        const role = 'admin'; // Assuming 'admin' is the role you want to query
        
        // Now, fetch the admin user based on the role
        const admin = await User.findOne({ role: role });

        if (admin) {
            // Respond with the revenue percentage
            res.status(200).json({ percentage: admin.revenuepercentage });
            console.log(admin.revenuepercentage)
        } else {
            // Handle case where admin is not found
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.checkRevenue = async (req, res) => {
    try {
        console.log("checkRevenue function called"); // Debug log
        
        // Step 1: Fetch all bookings
        const bookings = await Booking.find();
        // Step 2: Fetch all shops and create a mapping
        const shops = await Shop.find(); // Fetch all shops
        const shopMap = {};
        shops.forEach(shop => {
            shopMap[shop._id] = shop.shopname; // Map shop ID to shop name
        });

        const revenueMap = {};
        let totalRevenue = 0;

        bookings.forEach((booking) => {
            const shopId = booking.shop; // Directly get the shop ID
            const platformFee = booking.platformfee || 0;
            totalRevenue += platformFee;

            if (shopId) {
                if (revenueMap[shopId]) {
                    revenueMap[shopId].platformFee += platformFee;
                } else {
                    revenueMap[shopId] = {
                        shopName: shopMap[shopId] || "Unknown Shop", // Use the shopMap to get the shop name
                        platformFee: platformFee
                    };
                }
            }
        });

        console.log("Revenue Map:", revenueMap); // Log the revenue map

        const shopRevenues = Object.keys(revenueMap).map((shopId) => ({
            shopId: shopId,
            shopName: revenueMap[shopId].shopName,
            platformFee: revenueMap[shopId].platformFee
        }));

        res.json({
            totalRevenue: totalRevenue,
            shopRevenues: shopRevenues
        });
    } catch (error) {
        console.error("Error fetching revenue data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getallbookings = async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        // Fetch future bookings
        const futureBookings = await Booking.find({ date: { $gt: endOfDay } }).populate('user shop');

        // Fetch today's bookings
        const todaysBookings = await Booking.find({
            date: { $gte: startOfDay, $lte: endOfDay }
        }).populate('user shop');

        // Fetch past bookings
        const pastBookings = await Booking.find({ date: { $lt: startOfDay } }).populate('user shop');

        res.status(200).json({
            success: true,
            futureBookings,
            todaysBookings,
            pastBookings
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings',
            error: err.message
        });
    }
};
exports.getsportslist=async (req,res)=>{
   try{
     const sportslist=await Sport.find();
     console.log('hi Sport list')
     if(sportslist){
        res.status(200).json({success:true,sportslist});
     }else{
        res.status(404).json({success:false,message:'No sports found'});
     }
    } catch(err){
        console.log(err)
    }
}
exports.addsport = async (req, res) => {
    console.log('hi add to sport');
    try {
      const { sportName, equipmentRequired, rules } = req.body;
      console.log(sportName, equipmentRequired, rules);  // Debugging log

      // Check if all required fields are provided 
      if (!sportName || !equipmentRequired || !rules) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Create a new sport instance using the extracted data
      const newSport = new Sport({
        name: sportName,
        equipmentRequired,  // Now an array
        rules  // Now an array
      });

      // Save the new sport to the database
      await newSport.save();

      // Return a success response
      return res.status(201).json({ message: 'Sport added successfully', sport: newSport });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error. Failed to add sport.' });
    }
};

  
exports.logout=async (req,res)=>{
    if (req.session && req.session.user.role=='admin') {
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

