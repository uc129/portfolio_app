import useAuth from "../../utils/AuthHook";


const Logout= () => {
    const context = useAuth();
    const logOut= context.logOut()
    return (
        <button
        onClick={() => logOut}>
        Log Out
        </button>
    );
}

export default Logout
