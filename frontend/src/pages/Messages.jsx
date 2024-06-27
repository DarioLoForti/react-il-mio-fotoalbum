import { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';


export default function(){

    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        const { data: array } = await axios.get(`/messages`);
        setMessages(array.data);
    }

    useEffect(() => {
        fetchMessages();
    }, []);
    
        return (
           
                <div className="messages">
                    <h1>Messaggi</h1>
                    <ul>
                        {messages.map(m => (
                            <li key={`message${m.id}`}>
                                <h3>{m.name}</h3>
                                <h5>{m.email}</h5>
                                <p>{m.message}</p>

                            </li>
                        ))}
                    </ul>
                </div>
            
        )
    }