import { useState } from 'react';
import { useGlobal } from '../contexts/GlobalContext';

export default function ({initialData, onSubmit}) {

    const defaultData = initialData || {
        name: '',
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
                    <label> Name </label>
                    <input 
                        type="text"
                        value={data.name}
                        onChange={(e) => changeData('name', e.target.value)}
                    />
                </div>
                    <button>Submit</button>
            </form>
            {error && <div className="error">{error}</div>}
        </>
    )


}
        