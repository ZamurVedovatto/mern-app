import { useEffect } from 'react'
import WorkoutsDetails from './../components/WorkoutsDetails'
import WorkoutForm from './../components/WorkoutForm'
import { useWorkoutsContext } from './../hooks/useWorkoutsContext'

function Home() {
    const {workouts, dispatch} = useWorkoutsContext()

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
    }, [])
    
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout, index) => (
                    <WorkoutsDetails key={workout._id} workout={workout} />
                ))}
                {!workouts.length && <p>nothing here</p>}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home