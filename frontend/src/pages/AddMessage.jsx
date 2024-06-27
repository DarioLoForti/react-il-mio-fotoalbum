import { Link, useNavigate } from 'react-router-dom';
import FormCategory from '../components/FormMessage';
import axios from '../utils/axiosClient';
import FormMessage from '../components/FormMessage';

export default function() {
    
        const navigate = useNavigate();
    
        const sendingMessage = async data => {
            console.log(data);
            const res = await axios.post(`/messages`, data, {
            });
            console.log(res);
            if(res.status < 400){
                navigate('/');
            }
        }
    
        return (
        
            <div className="create">
                <Link to="../" relative='path'> Back to posts</Link>
                <h1>Enter your message</h1>
                <FormMessage
                onSubmit={sendingMessage} 
                />
            </div>
            
        )
    }