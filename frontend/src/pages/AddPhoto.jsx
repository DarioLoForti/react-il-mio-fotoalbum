import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import axios from '../utils/axiosClient';

export default function() {
    
        const navigate = useNavigate();
    
        const createPhoto = async data => {
            console.log(data);
            const res = await axios.post(`/photos`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res);
            if(res.status < 400){
                navigate('/photos');
            }
        }
    
        return (
        
            <div className="create">
                <Link to="../" relative='path'> Back to posts</Link>
                <h1>Add new photo</h1>
                <Form 
                onSubmit={createPhoto} 
                />
            </div>
            
        )
    }