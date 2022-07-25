import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { Container, Navbar as NavbarBs, Button } from 'react-bootstrap'

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
        <NavbarBs bg="dark" variant="dark">
            <Container>
            <NavbarBs.Brand href="#home">
                <img
                alt=""
                src="/logo.png"
                width="auto"
                height="30"
                className="d-inline-block align-top"
                />
            </NavbarBs.Brand>
            { userLogged && 
                <Button onClick={logOut}>Log out</Button>
            }
            </Container>
        </NavbarBs>
        // <header>
        //     <div className="container">
        //         <Link to="/">
        //             <h1>Controle de Filas</h1>
        //         </Link>
        //         { userLogged && 
        //             <Button onClick={logOut}>Log out</Button>
        //         }
        //     </div>
        // </header>
    )
}

export default Navbar