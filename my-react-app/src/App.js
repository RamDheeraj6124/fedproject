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
import AddSports from './Admin/AddSports';
import News from './News/News';
import CricketVenue from './BookPage/CricketVenue';
import FootballVenue from './BookPage/FootballVenue';
import FootballSlide from './LearnCricket/FootballSlide';
import BasketballSlide from './LearnCricket/BasketballSlide';
import TennisSlide from './LearnCricket/TennisSlide';
import BadmintonSlide from './LearnCricket/BadmintonSlide';
import BaseballSlide from './LearnCricket/BaseballSlide';
import HockeySlide from './LearnCricket/HockeySlide';
import SearchCard from './BookPage/SearchCard';
import Baseballvenue from './BookPage/BaseballVenue';
import Tennisvenue from './BookPage/TennisVenue';
import BadmintonVenue from './BookPage/BadmintonVenue';
import BasketballVenue from './BookPage/BasketballVenue';
import Volleyballvenue from './BookPage/VolleyballVenue';
import HockeyVenue from './BookPage/HockeyVenue';



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
          <Route path='/News' element={<News />} />
          <Route path='/searchcard' element={<SearchCard />} />
          <Route path="/cricketvenue" element={<CricketVenue />} />
          <Route path="/footballvenue" element={<FootballVenue />} />
          <Route path='/baseballvenue' element={<Baseballvenue />} />
          <Route path='/tennisvenue' element={<Tennisvenue />} />
          <Route path='/badmintionVenue' element={<BadmintonVenue />} />
          <Route path='/basketballvenue' element={<BasketballVenue />} />
          <Route path='/volleyballvenue' element={<Volleyballvenue />} />
          <Route path='/hockeyvenue' element={<HockeyVenue />} />
          <Route path='/admindashboard' element={<Dashboard />} >
                 <Route path='ManageUsers' element={<UserMode />}/>
                 <Route path='VerifyUsers' element={<VerifyShopMode />}/>
                 <Route path='ManageShops' element={<ShopMode />}/>
                 <Route path='Revenuecheck' element={<Revenuecheck />}/>
                 <Route path='BookingList' element={<BookingsList />}/>
                 <Route path='AddSports'   element={<AddSports />}/>
         </Route>
         <Route path='/Learnvolleyball' element={<Slide />} />
          <Route path='/Learnfootball' element={<FootballSlide />} />
          <Route path='/Learncricket' element={<CricketSlide />} />
          <Route path='/Learnbasketball' element={<BasketballSlide />} />
          <Route path="/LearnTennis" element={<TennisSlide />} />
          <Route path="/LearnBadminton" element={<BadmintonSlide />} />
          <Route path="/LearnHockey" element={<HockeySlide />} />
          <Route path="/LearnBaseball" element={<BaseballSlide />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
