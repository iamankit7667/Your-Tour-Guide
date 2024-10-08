import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "./AxiosConfig";

import ScrollTop from "./Components/ScrollTop";
import Index from "./Components/Main/Index";
import ViewPlace from "./Components/viewplaces/ViewPlace";
import PlaceDetails from "./Components/PlacesHotel/PlaceDetails";
import Book from "./Components/Book/Book";
import Payment from "./Components/PaymentGateway/Payment";
import Error from "./Components/ErrorPage/Error";
import Profile from "./Components/ProfilePage/Profile";
import Tours from "./Components/BookingCart/Cart";
import Bookings from "./Components/Bookings/Bookings";
import Admin from "./Components/Admin/Admin";
import Addadmin from "./Components/Admin/Addadmin";
import AddPlaces from "./Components/Admin/AddPlaces";
import Feedbacks from "./Components/Admin/Feedbacks";
import ViewAll from "./Components/Admin/ViewAll";
import Edit from "./Components/BookingCart/Edit";
import DisplayPackages from "./Components/Admin/DisplayPackages";
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
