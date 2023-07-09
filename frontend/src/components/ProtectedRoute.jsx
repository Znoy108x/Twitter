import React , {useContext} from "react";
import { Route, Navigate } from "react-router-dom";
import TwitterContext from "../context/TwitterContext";

export default function ProtectedRoute ({children , fromAuth}) {
    const {AUTH_FUNC} = useContext(TwitterContext)
    const loggedin = AUTH_FUNC()
    if(fromAuth && !loggedin){
            return children
    }else if(fromAuth && loggedin){
        return <Navigate to="/"/>
    }
    else if(!loggedin){
        return <Navigate to="/auth"/>
    }
    return children
};