import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";

export default function(){

    const {isLoggedIn, user} = useAuth();


    return (<>
        <div className="homepage">
            <h1>Dashboard</h1>
        </div>
    </>)
}