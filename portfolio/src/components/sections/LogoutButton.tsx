// import useAuth from "../../utils/AuthHook";


import {useContext} from "react";
import Auth1Context from "../../context/Auth1Context";


const LogoutButton= () => {
    let context= useContext(Auth1Context);




    const handleClick= () => {
        context.logOut().then(r => r)
    }
    return (
        <button
        onClick={handleClick}
        className={'mt-2 underline hover:translate-y-0.5 hover:text-blue-400'}
        >
        Log Out
        </button>
    );
}

export default LogoutButton
