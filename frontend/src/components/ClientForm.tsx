import { useState } from 'react'
import { useClientContext } from './../hooks/useClientContext'
import { Form, Button, Card } from 'react-bootstrap'
import styled from 'styled-components'

const ClientFormContainer = styled.div`
    margin-top: 2.5rem;
`

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
            fetchClients()
        }

    }

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

    return (
        <ClientFormContainer>
            <Card>
                <Card.Header>Adicionar à fila</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="Nome/identificação"
                                className={emptyFields?.includes('name') ? 'error' : ''}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicWhatsapp">
                            <Form.Label>Whatsapp</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => setWhatsapp(e.target.value)}
                                value={whatsapp}
                                placeholder="5531988776655"
                                className={emptyFields?.includes('whatsapp') ? 'error' : ''}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="email@email.com"
                                className={emptyFields?.includes('email') ? 'error' : ''}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Adicionar</Button>
                        {error && <div className="error">{error}</div>}
                    </Form>
                </Card.Body>
            </Card>

            {/* <form className="create" onSubmit={handleSubmit}>
                <h3>Adicionar novo cliente à fila</h3>

                <label>Whatsapp</label>
                <input 
                    type="text"
                    onChange={(e) => setWhatsapp(e.target.value)}
                    value={whatsapp}
                    placeholder="5531988776655"
                    className={emptyFields?.includes('whatsapp') ? 'error' : ''}
                />

                <label>Email</label>
                <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="email@email.com.br"
                    className={emptyFields?.includes('email') ? 'error' : ''}
                />
                <button type="submit">Adicionar</button>
                
            </form> */}
        </ClientFormContainer>
    )
}

export default ClientForm