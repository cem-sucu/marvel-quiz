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
import ForgetPassword from "../ForgetPassword";
import { IconContext } from "react-icons"; // avec le iconContext.Provider permet d'aligner correctement l'icon chevron a coté des questions

function App() {
    return (
        <Router>
            <IconContext.Provider
                value={{ style: { verticalAlign: "middle" } }}
            >
                <Header />
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route exact path="/welcome" element={<Welcome />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<SignUp />} />
                    <Route
                        exact
                        path="/forgetpassword"
                        element={<ForgetPassword />}
                    />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
            </IconContext.Provider>
        </Router>
    );
}

export default App;
