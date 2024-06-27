import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function(){

    const { register } = useAuth();

    const initialData = {
        email: '',
        password: '',
        name: '',
        image_profile: ''
    };
    const [formData, setFormData] = useState(initialData);

    const [signupError, setSignupError] = useState(null);

    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            await register(formData);
            setFormData(initialData);
        }catch(err){
            setSignupError(err);
        }
    }

    return (
        
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h1>Register</h1>
                <div className="form-control">
                    <label>Username</label>
                    <input 
                        type="text"
                        placeholder="Username" 
                        required
                        value={formData.name}
                        onChange={e => changeData('name', e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Email</label>
                    <input 
                        type="text"
                        placeholder="Email" 
                        required
                        value={formData.email}
                        onChange={e => changeData('email', e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input 
                        type="password"
                        required
                        placeholder="Password" 
                        value={formData.password}
                        onChange={e => changeData('password', e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Image Profile</label>
                    <input 
                    type="file"
                    onChange={e => changeData('image_profile', e.target.files[0])}
                />
                </div>
                {signupError !== null && <div className="error">{signupError.message}</div>}
                {signupError?.errors && signupError.errors.map( (err, index) => (
                    <div key={`err${index}`}>{err.msg}</div>
                ))}
                <button>Register</button>
            </form>
        </div>
    )
}
