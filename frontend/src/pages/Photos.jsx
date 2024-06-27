import { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import { Link, useSearchParams } from "react-router-dom";

export default function(){

const [photos, setPhotos] = useState(null);

useEffect(() => {
    setPhotos(null);
        axios.get(`/photos`).then(({data: res}) => setPhotos(res.data)
        
    );
}, []);


    return (<>
           
           <div className="photos">
            <h1>Le mie foto</h1>
            {/* <div className="paginator">
                <span>Current Page: {currPage}</span>
                <button 
                    style={{visibility: currPage - 1 > 0 ? 'visible' : 'hidden'}} 
                    onClick={()=>setSearchParams({page: currPage - 1})
                }>-</button>
                <button 
                    onClick={()=>setSearchParams({page: currPage + 1})
                }>+</button>
            </div> */}
            {photos === null && <span className="loader"></span>}
            {photos?.length === 0 && 'Photo not found.'}
            {photos?.length > 0 && 
                <div className="card-container">
                {photos.map(p => (
                    <div className="card" key={`photos${p.id}`}>
                        <img src={p.image} alt={p.title} />
                        <Link to={`/photos/${p.id}`} state={{ photos: p }}>
                            <h2>{p.title}</h2>
                        </Link>
                            <p>{p.description}</p>
                    </div>
                ))}
            </div>
            }
        </div>
    </>)
}
