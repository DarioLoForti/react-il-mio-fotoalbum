import { useAuth } from "../contexts/AuthContext";


export default function(){

    const {isLoggedIn, user} = useAuth();


    return (<>
        <div className="homepage">
            <h1>Dashboard</h1>
            {isLoggedIn ?
             <h3>Welcome {user.name}!</h3> :
                <h3>Welcome guest!</h3>
            }
        </div>
    </>)
}