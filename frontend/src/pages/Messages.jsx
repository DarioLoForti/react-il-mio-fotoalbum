import { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';


export default function(){

    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const fetchMessages = async () => {
        const { data: array } = await axios.get(`/messages`);
        setMessages(array.data);
    }

    useEffect(() => {
        fetchMessages();
    }, []);
    
        return (
           
                <div className="messages">
                    <div className="back">
                        <a onClick={() => navigate(-1)}>Back</a>
                    </div>
                    <h1>Messaggi</h1>
                    <ul>
                        {messages.map(m => (
                            <li key={`message${m.id}`}>
                                <div className="message">
                                <h3>{m.name}</h3>
                                <h5>{m.email}</h5>
                                <p>{m.message}</p>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
            
        )
    }