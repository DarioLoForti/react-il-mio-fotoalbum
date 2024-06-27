import { Link, useNavigate } from 'react-router-dom';
import FormCategory from '../components/FormCategory';
import axios from '../utils/axiosClient';

export default function() {
    
        const navigate = useNavigate();
    
        const createCategory = async data => {
            console.log(data);
            const res = await axios.post(`/categories`, data, {
            });
            console.log(res);
            if(res.status < 400){
                navigate('/');
            }
        }
    
        return (
        
            <div className="create">
                <Link to="../" relative='path'> Back to posts</Link>
                <h1>Add new category</h1>
                <FormCategory
                onSubmit={createCategory} 
                />
            </div>
            
        )
    }