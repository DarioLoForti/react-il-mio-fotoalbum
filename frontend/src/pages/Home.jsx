import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";

export default function(){

    const {isLoggedIn, user} = useAuth();

    const [photos, setPhotos] = useState(null);

    // const [searchParams, setSearchParams] = useSearchParams({page: 1});

    // const currPage = parseInt(searchParams.get('page'));

    useEffect(() => {
        setPhotos(null);
            axios.get(`/photos`).then(({data: res}) => setPhotos(res.data)
            
        );
    }, []);


    return (<>
        <div className="homepage">
            <h1>Home Page</h1>
            {isLoggedIn ?
             <h3>Welcome {user.name}!</h3> :
                <h3>Welcome guest!</h3>
            }
        </div>

        <Link to="photos">Tutte le mie foto</Link>
    </>)
}