// import useAuth from "../../utils/AuthHook";


import {useContext} from "react";
import Auth1Context from "../../context/Auth1Context";


const Logout= () => {
    let context= useContext(Auth1Context);




    const handleClick= () => {
        context.logOut().then(r => r)
    }
    return (
        <button
        onClick={handleClick}>
        Log Out
        </button>
    );
}

export default Logout
