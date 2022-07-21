import { useState } from 'react'
import { useWorkoutsContext } from './../hooks/useWorkoutsContext'

function WorkoutForm() {
    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState(0)
    const [reps, setReps] = useState(0)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = { title, load, reps }

        const resp = await fetch('http://localhost:3000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await resp.json()
        if (!resp.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(resp.ok) {
            setTitle('')
            setLoad(0)
            setReps(0)
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: json
            })
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>
            <label>Exercise title</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="name of the exercise"
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg)</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <button type="submit">Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm