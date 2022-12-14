import React, { useRef, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";


const Landing = () => {
    const [btn, setBtn] = useState(false);

    const refWolverine = useRef(null);

    useEffect(() => {
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 500);
    }, []);

    const setLefImg = () => {
        refWolverine.current.classList.add("leftImg");
    };

    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg");
    };

    const clearImg = () => {
        if (refWolverine.current.classList.contains("leftImg")) {
            refWolverine.current.classList.remove("leftImg");
        } else if (refWolverine.current.classList.contains("rightImg")) {
            refWolverine.current.classList.remove("rightImg");
        }
    };

    const displayBtn = btn && (
        <Fragment>
            <div
                onMouseOver={setLefImg}
                onMouseOut={clearImg}
                className="leftBox"
            >
                <Link to="/signup" className="btn-welcome">Inscription</Link>
            </div>
            <div
                onMouseOver={setRightImg}
                onMouseOut={clearImg}
                className="rightBox"
            >
                <Link to="/login" className="btn-welcome">Connexion</Link>
            </div>
        </Fragment>
    );

    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    );
};

export default Landing;
