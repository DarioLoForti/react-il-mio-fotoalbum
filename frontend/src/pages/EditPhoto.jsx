import axios from "../utils/axiosClient";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";

export default function(){

    const { id } = useParams();

    const navigate = useNavigate();

    const [dataToEdit, setDataToEdit] = useState(null);

    const fetchDataToEdit = async () => {
        const { data: p } = await axios.get(`/photos/${id}`);
        setDataToEdit({
            title: p.title,
            description: p.description,
            image: p.image,
            visible: p.visible,
            categories: p.categories.map(c => c.id),
        });
    }

    useEffect(() => {
        fetchDataToEdit();
        return () => {
            setDataToEdit(null);
        }
    },[id]);

    const editPhoto = async formData => {
        console.log(formData);
        const res = await axios.put(`/photos/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res);
        if(res.status < 400){
            navigate(`/photos/${res.data.id}`)
        }
    }

    return(
        <div className="edit">
            <Link to="../" relative='path'> Back to posts</Link>
            {dataToEdit === null ?
                <div>Loading...</div>
            :
            <>
            <h1>Edit photo</h1>
                <Form
                    initialData={dataToEdit}
                    onSubmit={editPhoto}
                />
            </>
            }
        </div>
    )
}