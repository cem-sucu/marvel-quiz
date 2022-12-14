import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const Logout = () => {
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (checked) {
            signOut(auth)
                .then(() => {
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                })
                .catch((error) => {
                    console.log("Oups, nous avons une erreur!");
                });
        }
    }, [checked, navigate]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input
                    onChange={handleChange}
                    type="checkbox"
                    checked={checked}
                />
                <span className="slider round" data-tip="Déconnexion"></span>
            </label>
            <ReactTooltip
                effect="solid"
                place="left"
                textColor="white"
                backgroundColor="#313333"
                borderColor="darkgreen"
                arrowColor="#313333"
            />
        </div>
    );
};

export default Logout;
