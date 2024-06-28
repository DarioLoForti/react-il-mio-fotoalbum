import React, { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import { MdDelete, MdEditNote } from "react-icons/md";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export default function Photo() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [fullscreen, setFullscreen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Stato per gestire la visualizzazione del dialogo di conferma

    const fetchPhoto = async () => {
        try {
            const { data } = await axios.get(`/photos/${id}`);
            setPhoto(data);
        } catch (error) {
            console.error("Error fetching photo:", error);
        }
    };

    const navigate = useNavigate();

    const deletePhoto = async (id) => {
        try {
            await axios.delete(`/photos/${id}`);
            navigate('/photos');
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };

    useEffect(() => {
        fetchPhoto();
    }, [id]);

    const toggleFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true); // Mostra il dialogo di conferma prima di eliminare
    };

    const confirmDelete = async () => {
        await deletePhoto(photo.id);
        setShowDeleteConfirm(false); // Nasconde il dialogo di conferma dopo aver eliminato
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false); // Nasconde il dialogo di conferma senza eliminare
    };

    return (
        <>
            {photo === null ? (
                <span>Loading...</span>
            ) : (
                <div className="photo">
                    <div className="back">
                        <Link to="../">Back</Link>
                    </div>
                    <div className="card-photo">
                        <div className="top-card">
                            <h4>
                                <Link to={`/photos/${id}/edit`}>
                                    Modifica <MdEditNote />
                                </Link>
                            </h4>
                            <h4 onClick={handleDeleteClick}>Elimina <MdDelete /></h4>
                        </div>
                        {/* Gestione dell'immagine a schermo intero */}
                        {fullscreen && (
                            <div className="fullscreen-overlay" onClick={toggleFullscreen}>
                                <img src={photo.image} alt={photo.title} className="fullscreen-image" />
                            </div>
                        )}
                        {!fullscreen && (
                            <img src={photo.image} alt={photo.title} onClick={toggleFullscreen} />
                        )}
                        <h1>{photo.title}</h1>
                        <p>{photo.description}</p>
                        {photo.categories && <h4>Categorie:</h4>}
                        <ul>
                            {photo.categories.map((c) => (
                                <li key={`category${c.id}`}>
                                    <h5>{c.name}</h5>
                                </li>
                            ))}
                        </ul>
                        {photo.user && <h4>User: {photo.user}</h4>}
                    </div>
                </div>
            )}

            {/* Componente del dialogo di conferma */}
            {showDeleteConfirm && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Sei sicuro di voler eliminare questa foto?</p>
                        <div className="btn"> 
                            <button onClick={confirmDelete}>Conferma</button>
                            <button onClick={cancelDelete}>Annulla</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
