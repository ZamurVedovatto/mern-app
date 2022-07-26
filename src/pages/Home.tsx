import { useEffect } from 'react'
import ClientDetails from './../components/ClientDetails'
import ClientForm from './../components/ClientForm'
import { useClientContext } from './../hooks/useClientContext'
import { useLayoutContext } from './../hooks/useLayoutContext'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from 'universal-cookie'
import styled from 'styled-components'
import { Container, Row, Col, ListGroup, Tabs, Tab } from 'react-bootstrap'

const API_URL = import.meta.env.VITE_API_URL;

const HomeContainer = styled.section `
    background-color: #f1f1f1;
    background-image: url('home.jpeg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    padding: 1rem;
    min-height: calc(100vh - 56px);
    .tabs-lists {
        border-bottom: none;
        .nav-link {
            color: #f1f1f18c;
            &.active {
                color: #010101;
            }
        }
    }
    .tab-content {
        height: calc(100vh - 200px);
        max-height: calc(100vh - 200px);
        overflow-y: auto;
        .empty-list {
            padding: 1rem;
            background-color: #FFFFFF;
        }
    }
    .first-client {
        background-color: lightgoldenrodyellow;
    }
`

function Home() {
    const {dispatchLayout} = useLayoutContext()
    const {state, dispatch} = useClientContext()
    const { clients } = state;
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
                    `${API_URL}/auth/`,
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
            const resp = await fetch(`${API_URL}/client/`)
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
                        <Tabs
                            defaultActiveKey="fila"
                            className="tabs-lists"
                            >
                            <Tab eventKey="fila" title="Fila de Espera">
                                <ListGroup>
                                    {clients && clients.map((client:any, index:number) => (
                                        <ClientDetails key={client._id} client={client} position={index+1} />
                                        ))}
                                    {!clients?.length && (
                                        <div className="empty-list">
                                            <span>Nenhum cliente.</span>
                                        </div>
                                    )}
                                </ListGroup>
                            </Tab>
                            <Tab eventKey="atendidos" title="Atendidos" disabled>
                                <span>atendidos</span>
                            </Tab>
                        </Tabs>
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