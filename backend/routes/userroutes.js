const express = require('express');
const Usercontroller = require('../controllers/usercontroller');
const router = express.Router();

router.post('/signup', Usercontroller.signup);
router.post('/login', Usercontroller.login);
router.get('/checksession',Usercontroller.checksession);
router.post('/sendOTP', Usercontroller.sendOTP);
router.post('/loginOTP', Usercontroller.loginOTP);
router.post('/resetPassword', Usercontroller.resetPassword);
router.get('/userbookings',Usercontroller.userbookings);
router.post('/updatecontact',Usercontroller.updatecontact);
router.post('/logout',Usercontroller.logout)
module.exports = router;
