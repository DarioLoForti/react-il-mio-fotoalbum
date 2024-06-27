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

    return (

        <div className="sidebar">
            <h2>Sidebar</h2>
            <ul>
                {urlPhoto.map( ({label, href}, i) => (
                    <li key={`urlPhoto${i}`}>
                        <NavLink to={href}>{label}</NavLink>
                    </li>
                ))}
            </ul>
            <ul>
                {urlCategories.map( ({label, href}, i) => (
                    <li key={`urlCategories${i}`}>
                        <NavLink to={href}>{label}</NavLink>
                    </li>
                ))}
            </ul>
            <ul>
                {urlMessage.map( ({label, href}, i) => (
                    <li key={`urlMessage${i}`}>
                        <NavLink to={href}>{label}</NavLink>
                    </li>
                ))}
            </ul>
            {isLoggedIn &&
                        
                        <div>
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
                }
        </div>
        // <header>
        //     <nav className="navbar">
        //         <menu>
        //             {urlPages.map( ({label, href}, i) => (
        //                 <li key={`urlPage${i}`}>
        //                     <NavLink to={href}>{label}</NavLink>
        //                 </li>
        //             ))}
        //             {!isLoggedIn && <>
        //                 <li>
        //                     <NavLink to={`/login`}>Login</NavLink>
        //                 </li>
        //                 <li>
        //                     <NavLink to={`/register`}>Register</NavLink>
        //                 </li>
        //             </>}
        //             {isLoggedIn &&
        //                 <li>
        //                     <NavLink to={`/dashboard`}>Dashboard</NavLink>
        //                 </li>
        //             }
        //             {isLoggedIn &&
                        
        //                     <div className="avatar">
        //                         {user.image_path &&
        //                             <figure>
        //                                 <img src={user.image_path} alt={user.name} />
        //                             </figure>
        //                         }
        //                         {user.name && <h3>{user.name}</h3>}
        //                         <button onClick={logout}>Logout</button>
        //                     </div>
                        
        //             }
        //         </menu>
        //     </nav>
        // </header>
    )
}