// import logo from './logo.svg';
// import './App.css';
// import { useEffect, useState } from 'react';
//
//
// // Get latitude and longitude from browser
//
// const App = () => {
//
//       let [lat,setLat]=useState(0.0);
//       let [lon,setLon]=useState(0.0);
//
//       useEffect(() => {
//      if ("geolocation" in navigator) {
//         navigator.geolocation.getCurrentPosition(function (position) {
//           try {
//               setLat(position.coords.latitude)
//               setLon(position.coords.longitude)
//               console.log("Latitude is :", position.coords.latitude);
//               console.log("Longitude is :", position.coords.longitude);
//           } catch (err) {
//              console.log(err);
//           }
//
//         });
//      } else {
//         console.log("Not Available");
//      }
//       });
//
//       return (
//      <div className="App">
//         <div className="App">
//           <h1>Latitude: {lat}</h1>
//           <h1>Longitude: {lon}</h1>
//         </div>
//
//      </div>
//       )
// }
//
// export default App;

import React from "react";
import "./index.css";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <Navbar />
          <Switch>
            <PrivateRoute component={ProtectedPage} path="/protected" exact />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={Home} path="/" />
          </Switch>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;