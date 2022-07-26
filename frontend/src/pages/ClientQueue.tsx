import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, Button, Image } from 'react-bootstrap';
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        .card-header {            
            text-align: center;
            background-color: #010101b8;
            color: #f1f1f1;
            font-size: 1.25rem;
            font-weight: 300;
            padding: 2rem 1rem;
        }
        .card-body {
            text-align: center;
            background-color:#01010163;
            color: #f1f1f1;
            line-height: 1.1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 1rem 2rem;
            .card-title {
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size: 1.25rem;
                font-weight: 300;
                span {
                    font-size: 7.5rem;
                    padding: .25rem;
                    line-height: 1;
                    font-weight: 600;
                }
            }
            .card-text {
                margin-top: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size: 1.25rem;
                line-height: 1.2;
                font-weight: 300;
            }
        }
        .card-footer {
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
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
                            <Card.Title>Você está na posição: <span>{position}</span></Card.Title>
                            {
                                (position > 2) ? (
                                    <Card.Text>
                                        <span>Espera estimada:</span>
                                        <span>{(position * 4.2).toFixed(0)} minutos</span>
                                    </Card.Text>
                                ) :
                                <Card.Text>
                                    <span>Gentileza, se direcione à </span>
                                    <span>entrada do estabelecimento.</span>
                                </Card.Text>
                            }

                        </Card.Body>
                        <Card.Footer>
                            <Image src={"/logo.png"} />
                        </Card.Footer>
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