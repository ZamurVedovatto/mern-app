import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';
import { useClientContext } from './../hooks/useClientContext'
import { useLayoutContext } from './../hooks/useLayoutContext'

function ClientQueue() {
    const {client, dispatch} = useClientContext()
    const {dispatchLayout} = useLayoutContext()
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const onGetParams = async () => {
            let paramId = searchParams.get("id")
            console.log(paramId)
            const resp = await fetch(`http://localhost:3000/api/client/${paramId}`)
            const json = await resp.json()
            if(resp.ok) {
                dispatch({
                    type: 'SET_CLIENT',
                    payload: json
                })
            }
        }
        onGetParams()
    }, [searchParams, dispatch])

    useEffect(() => {
        dispatchLayout({
            type: 'SET_NAVBAR',
            payload: false
        })
    }, [dispatchLayout])
    
    // useEffect(() => {
    //     const fetchClient = async () => {
    //         const resp = await fetch('http://localhost:3000/api/client/id:', searchParams.get("id"))
    //         const json = await resp.json()
    //         if(resp.ok) {
    //             dispatch({
    //                 type: 'SET_CLIENT',
    //                 payload: json
    //             })
    //         }
    //     }
    //     fetchClient()
    // }, [searchParams, dispatch])

    return (
        <>
            <div>
                {
                    client ? 
                        <Card>
                            <Card.Header as="h5">{client.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>Você está na 20a posição</Card.Title>
                                <Card.Text>
                                Tempo estimado para entrar no estabelecimento: 25 minutos
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    : 
                        <Card>
                            <Card.Header as="h5">Cliente não encontrado.</Card.Header>
                        </Card>
                }
            </div>

        </>
    )
}

export default ClientQueue