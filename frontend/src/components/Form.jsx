import { useState } from 'react';
import { useGlobal } from '../contexts/GlobalContext';

export default function ({initialData, onSubmit}) {

    const { categories, tags } = useGlobal();

    const defaultData = initialData || {
        title: '',
        content: '',
        image: '',
        categoryId: '',
        tags: [],
        published: false
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
                    <label> Content </label><br />
                    <textarea
                        value={data.content}
                        onChange={(e) => changeData('content', e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label> Image </label>
                    <input 
                        type="file"
                        // value={data.image}
                        onChange={(e) => changeData('image', e.target.files[0])}
                    />
                </div>
                <div className='form-control'>
                    <label> Category </label>
                    <select
                        value={data.categoryId}
                        onChange={(e) => changeData('categoryId', e.target.value)}
                    >
                        <option value="" disabled>Seleziona categoria</option>
                        {categories.map(c => (
                            <option key={`categoryId${c.id}`} 
                            value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className='form-control'>
                    <h3>tags:</h3>
                    <div className='tags'>
                        {tags.map(({id, name}, index) => (
                            <label key={`tag${index}`}>
                                <input
                                    type="checkbox"
                                    checked={data.tags.includes(id)}
                                    onChange={() => {
                                        const curr = data.tags;
                                        const newTags = curr.includes(id) ?
                                         curr.filter(t => t !== id) :
                                          [...curr, id];
                                        changeData('tags', newTags);
                                    }}
                                />
                                {name}
                            </label>
                        ))}
                    </div>
                </div>
                <div className='form-control'>
                    <div className='published'>
                    <label> Published </label>
                    <input
                        type="checkbox"
                        checked={data.published}
                        onChange={(e) => changeData('published', e.target.checked)}
                    />
                    </div>
                </div>
                
                    <button>Submit</button>
            </form>
            {error && <div className="error">{error}</div>}
        </>
    )


}
        