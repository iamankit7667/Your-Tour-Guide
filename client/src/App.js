import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "./AxiosConfig";

import ScrollTop from "./components/ScrollTop"
import Index from "./components/Main/Index";
import ViewPlace from "./components/viewplaces/ViewPlace";
import PlaceDetails from "./components/PlacesHotel/PlaceDetails";
import Book from "./components/Book/Book";
import Payment from "./components/PaymentGateway/Payment";
import Error from "./components/ErrorPage/Error";
import Profile from "./components/ProfilePage/Profile";
import Tours from "./components/BookingCart/Cart";
import Bookings from "./components/Bookings/Bookings";
import Admin from "./components/Admin/Admin";
import Addadmin from "./components/Admin/Addadmin";
import AddPlaces from "./components/Admin/AddPlaces";
import Feedbacks from "./components/Admin/Feedbacks";
import ViewAll from "./components/Admin/ViewAll";
import Edit from "./components/BookingCart/Edit";
import DisplayPackages from "./components/Admin/DisplayPackages";
function App() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
        <ScrollTop smooth />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="login" element={<Index formType={"login"} />} />
          <Route
            path="registration/:id"
            element={<Index formType={"register"} />}
          />
          <Route
            path="verification/:id"
            element={<Index formType={"verify"} />}
          />
          <Route
            path="forgotpassword/:id"
            element={<Index formType={"forgot"} />}
          />
          <Route path="index" element={<Index />} />
          <Route path="places/:id" element={<ViewPlace />} />
          <Route path="placedetails/:id" element={<PlaceDetails />} />
          <Route path="book/:id" element={<Book />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="profile" element={<Profile />} />
          <Route path="mytours" element={<Tours />} />
          <Route path="transactions" element={<Bookings />} />
          <Route path="givefeedback/:id" element={<Bookings />} />
          <Route path="admin" element={<Admin />} />
          <Route path="adminform" element={<Addadmin />} />
          <Route path="adminplaces" element={<AddPlaces />} />
          <Route
            path="editpackage/:id"
            element={<AddPlaces keyType={"edit"} />}
          />
          <Route path="packages" element={<DisplayPackages />} />
          <Route path="feedbacks" element={<Feedbacks />} />
          <Route path="viewtours/:id" element={<ViewAll />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="*" element={<Error />} />
        </Routes>
        {/* {login && <LoginPage formType={"login"} closeLoginForm={()=>{setLogin(false)}}/>} */}
      </BrowserRouter>
    </>
  );
}

export default App;
