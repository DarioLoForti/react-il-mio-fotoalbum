import { useState } from 'react';
import { useGlobal } from '../contexts/GlobalContext';

export default function ({initialData, onSubmit}) {

    const defaultData = initialData || {
        name: '',
        email: '',
        message: ''
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
        <div className="messag">
            <form onSubmit={handleSubmit} id="articleForm">
                <div className='form-control'>
                    <label> Name </label>
                    <input 
                        type="text"
                        placeholder='Name'
                        value={data.name}
                        onChange={(e) => changeData('name', e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label> Email </label>
                    <input 
                        type="email"
                        placeholder='Email'
                        value={data.email}
                        onChange={(e) => changeData('email', e.target.value)}
                    />
                </div>
                <div className='form-text-area'>
                    <label> Message </label><br />
                    <textarea
                        value={data.message}
                        placeholder='Message'
                        onChange={(e) => changeData('message', e.target.value)}
                    />
                </div>
                    <button>Submit</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
        </>
    )


}
        