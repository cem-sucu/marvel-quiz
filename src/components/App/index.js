import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../../App.css";
import ErrorPage from "../ErrorPage";
import Footer from "../Footer";
import Header from "../Header";
import Landing from "../Landing";
import Login from "../Login";
import SignUp from "../SignUp";
import Welcome from "../Welcome";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/welcome" element={<Welcome />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
