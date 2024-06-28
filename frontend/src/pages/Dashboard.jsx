import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const urlPhoto = [
    {
        label: 'Photos',
        href: '/photos'
    },
    {
        label: 'Add Photo',
        href: '/create-photo'
    },
];

const urlCategories = [
    {
        label: 'Categories',
        href: '/categories'
    },
    {
        label: 'Add Category',
        href: '/create-category'
    },
];

const urlMessage = [
    {
        label: 'Messages',
        href: '/messages'
    }
];


export default function(){

const {isLoggedIn, logout, user} = useAuth();

    return (<>
    <div className="dashboard-container">
    <h1 className="dash">My Dashboard</h1>

        <div className="dashboard">
    <div className="card">
            {user.image_profile &&
                <figure>
                    <img src={user.image_profile} alt={user.name} />
                </figure>
            }
            <div className="user">
                <h3>{user.name && user.name}</h3>
                <button onClick={logout}>Logout</button>
            </div>
    </div>
    <div className="card">
    {urlPhoto.map( ({label, href}, i) => (
            <h3 key={`urlPhoto${i}`}>
                <NavLink to={href}>{label}</NavLink>
            </h3>
        ))}
    </div>
    <div className="card">
    {urlCategories.map( ({label, href}, i) => (
            <h3 key={`urlCategories${i}`}>
                <NavLink to={href}>{label}</NavLink>
            </h3>
        ))}
    </div>
    <div className="card">
    {urlMessage.map( ({label, href}, i) => (
            <h3 key={`urlMessage${i}`}>
                <NavLink to={href}>{label}</NavLink>
            </h3>
        ))}
    </div>
    
</div>
    </div>
    
        </>

        
    )
}