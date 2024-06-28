import { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import { Link, useSearchParams } from "react-router-dom";

export default function(){

const [photos, setPhotos] = useState(null);

const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
    setPhotos(null);
        axios.get(`/photos`).then(({data: res}) => setPhotos(res.data)
        
    );
}, []);

const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
};

const filteredPhotos = photos?.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
);


    return (<>
           
           <div className="photos">
            <div className="top">
                <h1>Le mie foto</h1>
                <label>Search</label>
                <input
                    type="text"
                    placeholder="Cerca per titolo..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {/* <h1>Le mie foto</h1> */}
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
            {/* <label>Search</label>
            <input
                type="text"
                placeholder="Cerca per titolo..."
                value={searchTerm}
                onChange={handleSearchChange}
            /> */}
            {photos === null && <span className="loader"></span>}
            {filteredPhotos?.length === 0 && 'Photo not found.'}
            {filteredPhotos?.length > 0 &&
                <div className="card-container">
                    {filteredPhotos.map(p => (
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
