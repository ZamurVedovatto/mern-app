import { useWorkoutsContext } from './../hooks/useWorkoutsContext'

function WorkoutsDetails({ workout }) {
    const { dispatch } = useWorkoutsContext()
    const handleClick = async () => {
        const resp = await fetch('http://localhost:3000/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await resp.json()
        if (resp.ok) {
            dispatch({
                type: 'DELETE_WORKOUT',
                payload: json
            })
        }

    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutsDetails