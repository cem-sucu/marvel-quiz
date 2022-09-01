import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Config, { FirebaseContext } from "./components/Firebase";
import reportWebVitals from "./reportWebVitals";

import * as serviceWorker from "./serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <FirebaseContext.Provider value={new Config()}>
            <App />
        </FirebaseContext.Provider>
    </React.StrictMode>
);

reportWebVitals();
serviceWorker.unregister();
