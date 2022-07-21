import { useState, useEffect } from 'react'
import WorkoutsDetails from './../components/WorkoutsDetais'

function Home() {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const resp = await fetch('http://localhost:3000/api/workouts')
            const json = await resp.json()
            if(resp.ok) setWorkouts(json)
        }
        fetchWorkouts()
    }, [])
    
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout, index) => (
                    <WorkoutsDetails key={workout._id} workout={workout} />
                ))}
                {!workouts && <p>nothing here</p>}
            </div>
        </div>
    )
}

export default Home