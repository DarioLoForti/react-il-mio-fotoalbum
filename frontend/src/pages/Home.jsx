import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
import Slider from "../components/Slider";

const phrases = [
    "La fotografia è l'arte di congelare un istante, catturando l'anima e l'essenza di ogni momento.",
    "La fotografia è una poesia visiva che racconta storie senza parole.",
    "Ogni scatto è un viaggio nell'emozione, un frammento di tempo reso eterno.",
    "La fotografia cattura l'essenza invisibile dell'istante, rendendolo immortale.",
    "Con ogni click, trasformiamo il mondo in una galleria di meraviglie.",
    "Una fotografia è un ricordo dipinto con la luce e l'ombra.",
    "Attraverso l'obiettivo, vediamo il mondo con occhi nuovi e cuori aperti.",
    "Ogni foto è una finestra su un universo di emozioni e storie.",
    "La magia della fotografia è rendere straordinario l'ordinario.",
    "In ogni immagine c'è un frammento dell'anima del fotografo.",
    "La fotografia non è solo uno scatto, è una forma d'arte che cattura l'invisibile."
];


export default function(){

    const {isLoggedIn, user} = useAuth();

    const [photos, setPhotos] = useState(null);

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    // const [searchParams, setSearchParams] = useSearchParams({page: 1});

    // const currPage = parseInt(searchParams.get('page'));

    const fetchPhotos = async () => {
        const { data: array } = await axios.get(`/photos`);
        setPhotos(array.data);
    }


    useEffect(() => {
       fetchPhotos();
    }, []);
   
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    return (<>
        <div className="homepage">         
          <div className="phrases">
            {phrases.map((phrase, index) => (
                <p key={index} className={`phrase ${index === currentPhraseIndex ? 'active' : ''}`}>{phrase}</p>
            ))}
        </div>
        {/* <Link to="photos">Tutte le mie foto</Link> */}

        {photos ? <Slider photos={photos} /> : <p>Loading photos...</p>}
        </div>


    </>)
}
