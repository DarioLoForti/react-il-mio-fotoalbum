import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
import Slider from "../components/Slider";


export default function(){

    const {isLoggedIn, user} = useAuth();

    const [photos, setPhotos] = useState(null);

    // const [searchParams, setSearchParams] = useSearchParams({page: 1});

    // const currPage = parseInt(searchParams.get('page'));

    const fetchPhotos = async () => {
        const { data: array } = await axios.get(`/photos`);
        setPhotos(array.data);
    }


    useEffect(() => {
       fetchPhotos();
    }, []);
    console.log(photos);


    return (<>
        <div className="homepage">
            <h1>Home Page</h1>
            {isLoggedIn ?
             <h3>Welcome {user.name}!</h3> :
                <h3>Welcome guest!</h3>
            }
        <Link to="photos">Tutte le mie foto</Link>

        {photos ? <Slider photos={photos} /> : <p>Loading photos...</p>}
        </div>


    </>)
}
