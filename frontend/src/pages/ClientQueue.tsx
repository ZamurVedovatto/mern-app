import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';
import { useClientContext } from './../hooks/useClientContext'
import { useLayoutContext } from './../hooks/useLayoutContext'
import styled from 'styled-components'

const API_URL = import.meta.env.VITE_API_URL;

const ClientQueueContainer = styled.div`
    height: 100vh;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    width: 100%;
    .card {
        height: 100%;
        background-image: url('./../../public/home.jpeg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        .card-header {
            text-align: center;
            background-color: #010101b8;
            color: #EFA70F;
            padding: 2rem 1rem;
        }
        .card-body {
            text-align: center;
            background-color:#01010163;
            color: #f1f1f1;
            line-height: 1.1;
        }
    }
`

function ClientQueue() {
    const {client, clients, dispatch} = useClientContext()
    const {dispatchLayout} = useLayoutContext()
    const [searchParams, setSearchParams] = useSearchParams();
    const [position, setPosition] = useState(1)

    useEffect(() => {
        const onGetParams = async () => {
            let paramId = searchParams.get("id")

            const resp = await fetch(`${API_URL}/client/${paramId}`)
            const json = await resp.json()
            if(resp.ok) {
                dispatch({
                    type: 'SET_CLIENT',
                    payload: json
                })
            }

        }
        onGetParams()
    }, [searchParams, dispatch, clients, setPosition])

    useEffect(() => {
        const fetchClients = async () => {
            let paramId = searchParams.get("id")

            const resp = await fetch(`${API_URL}/client/`)
            const json = await resp.json()

            let position = json.findIndex(client => client._id === paramId) + 1;
            console.log(position)
            setPosition(position)
        }

        fetchClients()
        setInterval(() => {
            fetchClients()
        }, 15 * 1000);
    }, [searchParams, setPosition])

    useEffect(() => {
        dispatchLayout({
            type: 'SET_NAVBAR',
            payload: false
        })
    }, [dispatchLayout])

    return (
        <ClientQueueContainer>
            {
                client ? 
                    <Card>
                        {JSON.stringify(clients)}
                        <Card.Header as="h5">{client.name}</Card.Header>
                        <Card.Body>
                            <Card.Title>Você está na posição: {position}</Card.Title>
                            <Card.Text>
                            Tempo estimado para entrar no estabelecimento: {(position * 4.2).toFixed(0)} minutos
                            </Card.Text>
                        </Card.Body>
                    </Card>
                : 
                    <Card>
                        <Card.Header as="h5">Cliente não encontrado.</Card.Header>
                    </Card>
            }
        </ClientQueueContainer>
    )
}

export default ClientQueue