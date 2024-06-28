import { useState } from 'react';
import { useGlobal } from '../contexts/GlobalContext';

export default function ({initialData, onSubmit}) {

    const { categories } = useGlobal();

    const defaultData = initialData || {
        title: '',
        description: '',
        image: '',
        categories: [],
        visible: false
    }


    const [error, setError] = useState('');
    const [data, setData] = useState(defaultData);


    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(data);
    }


    const changeData = (key, newValue) => {
        setData(data => ({...data, [key]: newValue}));
    }

    return (
        <>
            <form onSubmit={handleSubmit} id="articleForm">
                <div className='form-control'>
                    <label> Title </label>
                    <input 
                        type="text"
                        value={data.title}
                        onChange={(e) => changeData('title', e.target.value)}
                    />
                </div>
                <div className='form-text-area'>
                    <label> Description </label><br />
                    <textarea
                        value={data.description}
                        onChange={(e) => changeData('description', e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label> Image </label>
                    <input 
                        type="file"
                        onChange={(e) => changeData('image', e.target.files[0])}
                    />
                </div>
                <div className='form-control'>
                    <h3>categories:</h3>
                    <div className='categories'>
                        {categories.map(({id, name}, index) => (
                            <label key={`category${index}`}>
                                <input
                                    type="checkbox"
                                    checked={data.categories.includes(id)}
                                    onChange={() => {
                                        const curr = data.categories;
                                        const newCategories = curr.includes(id) ?
                                         curr.filter(c => c !== id) :
                                          [...curr, id];
                                        changeData('categories', newCategories);
                                    }}
                                />
                                {name}
                            </label>
                        ))}
                    </div>
                </div>
                <div className='form-control'>
                    <div className='visible'>
                    <label> Visible </label>
                    <input
                        type="checkbox"
                        checked={data.visible}
                        onChange={(e) => changeData('visible', e.target.checked)}
                    />
                    </div>
                </div>
                
                    <button>Submit</button>
            </form>
            {error && <div className="error">{error}</div>}
        </>
    )


}
        