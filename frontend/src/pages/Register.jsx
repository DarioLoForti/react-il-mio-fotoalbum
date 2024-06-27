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
    //     <div className="login">
    //     <h1>Login</h1>
    //     <form onSubmit={handleLogin}>
    //     <label> Email </label>
    //         <input 
    //             type="text"
    //             placeholder="Email" 
    //             value={formData.email}
    //             onChange={e => changeData('email', e.target.value)}
    //         />
    //         <label> Password </label>
    //         <input 
    //             type="password"
    //             placeholder="Password" 
    //             value={formData.password}
    //             onChange={e => changeData('password', e.target.value)}
    //         />
    //         {loginError !== null && <div className="error">{loginError.message}</div>}
    //         {loginError?.errors && loginError.errors.map( (err, index) => (
    //             <div key={`err${index}`}>{err.msg}</div>
    //         ))}
    //         <button>Login</button>
    //     </form>

    //     <div className="signIn">
    //         <h3>
    //         don't have an account? <Link to="/register">Register</Link>
    //         </h3>
    //     </div>
    // </div>
        
        <div className="register-container">
                <h1>Register</h1>
            <form onSubmit={handleSubmit} >
                    <label>Username</label>
                    <input 
                        type="text"
                        placeholder="Username" 
                        required
                        value={formData.name}
                        onChange={e => changeData('name', e.target.value)}/>

                    <label>Email</label>
                    <input 
                        type="text"
                        placeholder="Email" 
                        required
                        value={formData.email}
                        onChange={e => changeData('email', e.target.value)}/>
                
                    <label>Password</label>
                    <input 
                        type="password"
                        required
                        placeholder="Password" 
                        value={formData.password}
                        onChange={e => changeData('password', e.target.value)}/>
                
                    <label>Image Profile</label>
                    <input 
                    type="file"
                    onChange={e => changeData('image_profile', e.target.files[0])}/>
            
                {signupError !== null && <div className="error">{signupError.message}</div>}
                {signupError?.errors && signupError.errors.map( (err, index) => (
                    <div key={`err${index}`}>{err.msg}</div>
                ))}
                <button>Register</button>
            </form>
        </div>
    )
}
