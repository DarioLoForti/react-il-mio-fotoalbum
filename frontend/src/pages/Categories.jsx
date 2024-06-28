import { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function(){

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        const { data: array } = await axios.get(`/categories`);
        setCategories(array);
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    
        return (
           
                <div className="categories-view">
                   <div className="back">
                <a onClick={() => navigate(-1)}>Back</a>
            </div>
                    <h1>Categorie</h1>
                    <ul>
                        {categories.map(c => (
                            <li key={`category${c.id}`}>
                                <h5>{c.name}</h5>
                            </li>
                        ))}
                    </ul>
                </div>
            
        )
    }