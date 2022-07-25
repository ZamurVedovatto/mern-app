import { useEffect } from 'react'
import ClientDetails from './../components/ClientDetails'
import ClientForm from './../components/ClientForm'
import { useClientContext } from './../hooks/useClientContext'
import { useLayoutContext } from './../hooks/useLayoutContext'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from 'universal-cookie'
import styled from 'styled-components'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'

const HomeContainer = styled.section `
    background-color: #f1f1f1;
    padding: 1rem;
    min-height: calc(100vh - 56px);
`

function Home() {
    const {dispatchLayout} = useLayoutContext()
    const {clients, dispatch} = useClientContext()
    const navigate = useNavigate()
    const cookies = new Cookies()

    useEffect(() => {
        dispatchLayout({
            type: 'SET_NAVBAR',
            payload: true
        })
    }, [dispatchLayout])

    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.get('jwt')) {
                navigate("/login")
            } else {
            const { data } = await axios.post(
                    "http://localhost:3000/api/auth/",
                    {},
                    {
                        withCredentials: true,
                    }
                )
            }
        }
        verifyUser()
    }, [])

    useEffect(() => {
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
        fetchClients()
        setInterval(() => {
            console.log('fetchClients')
            fetchClients()
        }, 1000 * 60)
    }, [dispatch])
    
    return (
        <HomeContainer>
            <Container>
                <Row>
                    <Col sm={12} md={8}>
                        <ListGroup>
                            {clients && clients.map((client, index) => (
                                <ClientDetails key={client._id} client={client} position={index+1} />
                                ))}
                            {!clients?.length && <p>Nenhum cliente.</p>}
                        </ListGroup>
                    </Col>
                    <Col sm={12} md={4}>
                        <ClientForm />
                    </Col>
                </Row>
            </Container>
        </HomeContainer>
    )
}

export default Home