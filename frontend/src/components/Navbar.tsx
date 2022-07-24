import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'

function Navbar() {
    const [userLogged, setUserLogged] = useState(false)
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.get('jwt')) {
                setUserLogged(false)
            } else {
                setUserLogged(true)
            }
        };
        verifyUser();
    }, [cookies]);

    const logOut = () => {
        cookies.remove('jwt', { path: '/' })
        navigate("/login");
    };
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Controle de Filas</h1>
                </Link>
                { userLogged && 
                    <Button onClick={logOut}>Log out</Button>
                }
            </div>
        </header>
    )
}

export default Navbar