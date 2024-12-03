const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Booking=require('../models/Booking');


// Set up nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'kunisettyramdheeraj061204@gmail.com', 
        pass: 'dhmc peub imsq zxka' 
    }
});

// Send OTP
exports.sendOTP = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 5);

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.otp = otp;
        user.otpExpiration = otpExpiration;
        await user.save();

        const mailOptions = {
            from: 'kbhargavreddy22@gmail.com',
            to: email,
            subject: 'Forget Password - One Time Password',
            text: `Your OTP is: ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error sending OTP' });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: 'OTP sent successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// OTP Login
exports.loginOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.otp) {
            return res.status(401).json({ message: 'OTP already used or expired' });
        }

        if (user.otp !== otp) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        const currentTime = new Date();
        if (currentTime > user.otpExpiration) {
            user.otp = '';
            await user.save();
            return res.status(401).json({ message: 'OTP expired' });
        }

        user.otp = ''; // Clear OTP after successful login
        await user.save();

        // Respond with user details, token, or redirect path
        return res.status(200).json({ message: 'Login successful', role: user.role, username: user.username, email: user.email });
    } catch (err) {
        console.error('Error: ', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.otp) {
            return res.status(401).json({ message: 'OTP already used or expired' });
        }

        if (user.otp !== otp) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        const currentTime = new Date();
        if (currentTime > user.otpExpiration) {
            user.otp = ''; 
            await user.save();
            return res.status(401).json({ message: 'OTP expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = ''; // Clear OTP after password reset
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Signup Controller
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    try {
        let user = await User.findOne({ email }).exec();
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(200).json({ msg: 'Signup Successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userfound = await User.findOne({ email }).exec();
        if (!userfound) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, userfound.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        req.session.user = userfound; // Storing user in the session
        console.log('Session created:', req.session.user);

        res.status(200).json({ msg: 'Login Successful',role:userfound.role });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Check Session Controller
exports.checksession = (req, res) => {
    if (req.session.user) {
        const user=req.session.user;
        res.status(200).json({user});
    } else {
        res.status(400).json({ msg: "Session does not exist" });
    }
};
exports.userbookings=async (req,res)=>{
    const user = req.session.user;
    try{
        const bookings=await Booking.find({user:user._id}).populate('shop');
        res.status(200).json({bookings});
    }catch(err){
        console.error(err.message);
    }
};
// Update user contact
exports.updatecontact = async (req, res) => {
    const { contact } = req.body;
    const userId = req.session.user._id;

    if (!contact) {
        return res.status(400).json({ message: 'Contact is required' });
    }

    try {
        // Update the user's contact
        const updatedUser = await User.findByIdAndUpdate(userId, { contact }, { new: true });
        req.session.user = updatedUser; // Update session with new contact

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error updating contact:', err.message);
        res.status(500).json({ message: 'Failed to update contact' });
    }
};
exports.logout=async (req,res)=>{
    if (req.session && req.session.user) {
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

exports.submitfeedback = async (req, res) => {
    const { bookingId, rating, review } = req.body;
    console.log(req.body)
    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Update feedback fields
        booking.feedback = {
            rating,
            review,
            feedbackDate: new Date()
        };

        await booking.save();
        console.log(booking);
        res.status(200).json({ message: 'Feedback submitted successfully', booking });
    } catch (err) {
        console.error('Error submitting feedback:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
