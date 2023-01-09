import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';




const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(

        // <Auth0Provider clientId={'Gs7z3LR164N712qoH7wYf8kdCa5AkU5j'} domain={'dev-53kp8vzt014zx0dm.us.auth0.com'} redirectUri={window.location.origin}>
        //     <React.StrictMode>
        //         <App/>
        //     </React.StrictMode>
        // </Auth0Provider>


        <React.StrictMode>
            <App />
        </React.StrictMode>



);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

