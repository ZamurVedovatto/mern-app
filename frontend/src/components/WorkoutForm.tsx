import { useState } from 'react'

function WorkoutForm() {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState(0)
    const [reps, setReps] = useState(0)
    const [error, setError] = useState(null)

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
        }
        if(resp.ok) {
            setTitle('')
            setLoad(0)
            setReps(0)
            setError(null)
            console.log('new workout added', json)
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
            />

            <label>Load (in kg)</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            <button type="submit">Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm