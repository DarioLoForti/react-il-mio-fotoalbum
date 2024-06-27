import { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';

export default function(){

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const { data: array } = await axios.get(`/categories`);
        setCategories(array);
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    
        return (
           
                <div className="categories">
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