import axios from "../utils/axiosClient";
import { useEffect, useState } from "react";
import { MdDelete, MdEditNote } from "react-icons/md";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export default function(){

    const { id } = useParams();

    const [photo, setPhoto] = useState(null);

    const fetchPost = async () => {
        const { data: photo } = await axios.get(`/photos/${id}`);
            setPhoto(photo);
    }

    const navigate = useNavigate();

    const deletePhoto = async id => {
        await axios.delete(`/photos/${id}`);
        navigate('/photos');

    }

    useEffect(() => {
        fetchPost();
    },[]); 

    

    return(<>
    <div className="back">
        <Link to="../" relative="path">Back</Link>
    </div>
    {/* <div className="back">
        <Link to={`/posts/${slug}/edit`}>edit photo</Link>
    </div> */}
        {photo === null ? <span>loading</span> :
            <div className="photo">
                <div className="card-photo">
                    <div className="top-card">
                        <h4><Link to={`/photos/${id}/edit`}>Modifica <MdEditNote /></Link></h4>
                        <h1>{ photo.title }</h1>
                        <h4 onClick={() => deletePhoto(photo.id)}>Elimina <MdDelete/></h4>
                    </div>
                    <img src={photo.image} alt={photo.title} />
                    <p>{photo.description}</p>
                    {photo.categories && <h4>Categorie:</h4>}
                    <ul>
                        {photo.categories.map(c => (
                            <li key={`category${c.id}`}>
                                {c.name}
                            </li>
                        ))}
                    </ul>
                    {photo.user && <h4>User: {photo.user}</h4>}
                </div>
            </div>
        }
    </>)
    
}
