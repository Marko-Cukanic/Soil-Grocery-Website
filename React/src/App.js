import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import FarmingAdvice from './pages/farmingAdvice';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Products from './pages/Products';
import WeeklySpecials from './pages/WeeklySpecials';
import DietPlan from './pages/DietPlan';
import DietPlanDetails from './pages/DeitPlanDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';


function App() {

  
  return (
    <div>
      <Navbar />
      <div className="containera">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farmingAdvice" element={<FarmingAdvice />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/weeklySpecials" element={<WeeklySpecials/>}/>
          <Route path="/dietPlan" element={<DietPlan/>}/>
          <Route path="/dietPlanDetails" element={<DietPlanDetails/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/payment" element={<Payment/>}/>

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;