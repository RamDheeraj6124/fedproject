import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './Home/Home'
import './App.css';
import ShopLogin from './components/ShopLogin';
import ShopRegister from './components/ShopRegister';
import ShopDashboard from './Shop/ShopDashboard';
import Venue2 from './BookPage/Venue2';
import ArticleCard from './Learncard/ArticleCard';
import BookingPage from './Home/Booking/BookingPage';
import Slide from './LearnVolleyBall/Slide';
import CricketSlide from './LearnCricket/CricketSlide';
import AboutUs from './Footer/AboutUs';
import FAQ from './Footer/Faq';
import PrivacyPolicy from './Footer/PrivacyPolicy';
import TermsOfService from './Footer/TermsofService';
import CancellationPolicy from './Footer/CancellationPolicy';
import Dashboard from './Admin/Dashboard';
import UserMode from './Admin/UserMode';
import VerifyShopMode from './Admin/VerifyShopMode';
import ShopMode from './Admin/ShopMode';
import TodayBooking from './Home/play/TodaysBookings';
import Forgotpassword from './components/Forgotpassword';
import Loginwithotp from './components/Loginwithotp';
import Updateotp from './components/Updateotp';
import Revenuecheck from './Admin/Revenuecheck';
import BookingsList from './Admin/BookingList';
import UserDashboard from './Home/User/UserDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/shoplogin' element={<ShopLogin />} />
          <Route path='/shopregister' element={<ShopRegister />} />
          <Route path='/shopdashboard' element={<ShopDashboard />} />
          <Route path='/Learn' element={<ArticleCard />} />
          <Route path='/Book' element={<Venue2 />} />
          <Route path='/play' element={<TodayBooking />} />
          <Route path='/' element={<Home />} />
          <Route path='/Learnfootball' element={<Slide />} />
          <Route path='/Learncricket' element={<CricketSlide />} />
          <Route path="/Booking/:name" element={<BookingPage />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/faqs' element={<FAQ />} />
          <Route path='/privacypolicy' element={<PrivacyPolicy />} />
          <Route path='/termsofservice' element={<TermsOfService />} />
          <Route path='/cancellationpolicy' element={<CancellationPolicy />} />
          <Route path='/forgotpassword' element={<Forgotpassword />} />
          <Route path='/loginwithotp' element={<Loginwithotp />} />
          <Route path='/updatewithotp' element={<Updateotp />} />
          <Route path='/userdashboard' element={<UserDashboard />}/>
          <Route path='/admindashboard' element={<Dashboard />} >
                 <Route path='ManageUsers' element={<UserMode />}/>
                 <Route path='VerifyUsers' element={<VerifyShopMode />}/>
                 <Route path='ManageShops' element={<ShopMode />}/>
                 <Route path='Revenuecheck' element={<Revenuecheck />}/>
                 <Route path='BookingList' element={<BookingsList />}/>

         </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
