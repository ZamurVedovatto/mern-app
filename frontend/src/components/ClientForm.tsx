import { useState } from 'react'
import { useClientContext } from './../hooks/useClientContext'

function ClientForm() {
    const { dispatch } = useClientContext()

    const [name, setName] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const client = { email, whatsapp, name }

        const resp = await fetch('http://localhost:3000/api/client', {
            method: 'POST',
            body: JSON.stringify(client),
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
            setName('')
            setWhatsapp('')
            setEmail('')
            setError(null)
            setEmptyFields([])
            console.log('new client added', json)
            dispatch({
                type: 'CREATE_CLIENT',
                payload: json
            })
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Adicionar novo cliente à fila</h3>
            <label>Nome do Cliente</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Nome/identificação"
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Whatsapp</label>
            <input 
                type="text"
                onChange={(e) => setWhatsapp(e.target.value)}
                value={whatsapp}
                placeholder="5531988776655"
                className={emptyFields.includes('whatsapp') ? 'error' : ''}
            />

            <label>Email</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="email@email.com.br"
                className={emptyFields.includes('email') ? 'error' : ''}
            />
            <button type="submit">Adicionar</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ClientForm