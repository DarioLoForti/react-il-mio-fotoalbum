import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const urlPages = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Photos',
        href: '/photos'
    
    },
    {
        label: 'Contact us',
        href: '/create-message'
    
    }
]

export default function(){

const {isLoggedIn, logout, user} = useAuth();

    return (
        <header>
            <nav className="navbar">
                <menu>
                    {urlPages.map( ({label, href}, i) => (
                        <li key={`urlPage${i}`}>
                            <NavLink to={href}>{label}</NavLink>
                        </li>
                    ))}
                    {!isLoggedIn && <>
                        <li>
                            <NavLink to={`/login`}>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/register`}>Register</NavLink>
                        </li>
                    </>}
                    {isLoggedIn &&
                        <li>
                            <NavLink to={`/dashboard`}>Dashboard</NavLink>
                        </li>
                    }
                </menu>
            </nav>
        </header>
    )
}