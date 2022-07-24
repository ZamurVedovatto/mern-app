import { useEffect } from 'react'
import ClientDetails from './../components/ClientDetails'
import ClientForm from './../components/ClientForm'
import { useClientContext } from './../hooks/useClientContext'
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
import Cookies from 'universal-cookie';

function Home() {
    const {clients, dispatch} = useClientContext()
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.get('jwt')) {
                navigate("/login");
            } else {
            const { data } = await axios.post(
                "http://localhost:3000/api/auth/",
                {},
                {
                withCredentials: true,
                }
            );
            if (!data.status) {
                cookies.remove('jwt', { path: '/' })
                navigate("/login");
            } else
                // toast(`Hi ${data.user} 🦄`, {
                //     theme: "dark",
                // });
                console.log(data.user)
            }
        };
        verifyUser();
    }, [cookies, navigate ]);

    const logOut = () => {
        cookies.remove('jwt', { path: '/' })
        navigate("/login");
    };

    useEffect(() => {
        const fetchClients = async () => {
            const resp = await fetch('http://localhost:3000/api/client')
            const json = await resp.json()
            if(resp.ok) {
                dispatch({
                    type: 'SET_CLIENTS',
                    payload: json
                })
            }
        }
        fetchClients()
    }, [dispatch])
    
    return (
        <>
            <button onClick={logOut}>Log out</button>
            <div className="home">
                <div className="clients">
                    {clients && clients.map((client, index) => (
                        <ClientDetails key={client._id} client={client} />
                        ))}
                    {!clients?.length && <p>Nenhum cliente.</p>}
                </div>
                <ClientForm />
            </div>
            {/* <ToastContainer /> */}
        </>
    )
}

export default Home