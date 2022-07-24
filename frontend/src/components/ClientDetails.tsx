import { useClientContext } from './../hooks/useClientContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function ClientDetails({ client }) {
    const { dispatch } = useClientContext()
    const handleClick = async () => {
        const resp = await fetch('http://localhost:3000/api/client/' + client._id, {
            method: 'DELETE'
        })
        const json = await resp.json()
        if (resp.ok) {
            dispatch({
                type: 'DELETE_CLIENT',
                payload: json
            })
        }

    }

    return (
        <div className="client-details">
            <h4>{client.name}</h4>
            <p><strong>Whatsapp: </strong>{client.whatsapp}</p>
            <p><strong>Email: </strong>{client.email}</p>
            <p>{formatDistanceToNow(new Date(client.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default ClientDetails