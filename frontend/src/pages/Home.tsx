import { useEffect } from 'react'
import WorkoutsDetails from './../components/WorkoutsDetails'
import WorkoutForm from './../components/WorkoutForm'
import { useWorkoutsContext } from './../hooks/useWorkoutsContext'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Cookies from 'universal-cookie';

function Home() {
    const {workouts, dispatch} = useWorkoutsContext()
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        const verifyUser = async () => {
            console.log('enrtou aqui 1')
            if (!cookies.get('jwt')) {
            console.log('enrtou aqui 2')
            navigate("/login");
            } else {
            console.log('enrtou aqui 3')
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
                toast(`Hi ${data.user} 🦄`, {
                theme: "dark",
                });
            }
        };
        verifyUser();
    }, [cookies, navigate ]);

    const logOut = () => {
        cookies.remove('jwt', { path: '/' })
        navigate("/login");
    };

    useEffect(() => {
        const fetchWorkouts = async () => {
            const resp = await fetch('http://localhost:3000/api/workouts')
            const json = await resp.json()
            if(resp.ok) {
                dispatch({
                    type: 'SET_WORKOUTS',
                    payload: json
                })
            }
        }
        fetchWorkouts()
    }, [dispatch])
    
    return (
        <>
            <button onClick={logOut}>Log out</button>
            <div className="home">
                <div className="workouts">
                    {workouts && workouts.map((workout, index) => (
                        <WorkoutsDetails key={workout._id} workout={workout} />
                        ))}
                    {!workouts?.length && <p>nothing here</p>}
                </div>
                <WorkoutForm />
            </div>
            <ToastContainer />
        </>
    )
}

export default Home