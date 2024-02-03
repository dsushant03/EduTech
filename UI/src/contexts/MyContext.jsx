import { useState, createContext } from "react";

export const MyContext = createContext();

export const MyContextProvider = (props) =>{

    const [tab, setTab] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState('');
    const [cartSize, setCartSize] = useState(0);

    return(
        <MyContext.Provider value={{tab, setTab, loggedIn, setLoggedIn, isAdmin, setIsAdmin, cartSize,      setCartSize}}>
            {props.children}
        </MyContext.Provider>
    )
}