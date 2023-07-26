import {useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    // Make user data saved in local storage
    useEffect(() => {
        const data = localStorage.getItem("auth");
        if(data) {
            const parsed = JSON.parse(data);
            setAuth({ ...auth, user: parsed.user, token: parsed.token})
        }
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);
// const [auth, setAuth] = useAuth()


export { useAuth, AuthProvider };


