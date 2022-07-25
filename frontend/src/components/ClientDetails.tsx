import { useState } from 'react';
import { useClientContext } from './../hooks/useClientContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { pt } from 'date-fns/locale'
import QRCode from "react-qr-code";
import styled from 'styled-components'
import { ListGroup, Button, Modal } from 'react-bootstrap'

const DetailsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

    .details-info {
        display: flex;
        flex-direction: column;
        width: 100%;
        .details-top {
            display: flex;
            align-items: baseline;
            width: 100%;
            span {
                font-weight: 500;
                &.client-position {
                    font-size: .9rem;
                    margin-right: .5rem;
                    opacity: .75;
                }
                &.client-name {
                    font-size: 1.1rem;
                    text-transform: uppercase;
                }
            }
        }
        .details-middle {
            display: flex;
            width: 100%;
            color: #929292;
            span {
                font-size: .9rem;
                &.client-whatsapp {
                    margin-right: .5rem;
                }
                &.client-email {}
            }
        }
        .details-bottom {
            display: flex;
            width: 100%;
            span {

            }
        }
    }
    .details-actions {
        display: flex;
        align-items: center;
        span {
            cursor: pointer;
            padding: 1rem;
            transition: background-color .5s ease-in-out;
            font-size: 2rem;
            background-color: #eaeaea;
            margin-right: .5rem;
            &:hover {
                background-color: #ffeb3b;
            }
        }
    }
`


function ClientDetails({ client, position }) {
    const { dispatch } = useClientContext()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const handleShow = () => setShow(true);

    const onRemoveClient = async () => {
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
        <>
            <ListGroup.Item as="li">
                <DetailsContainer>
                    
                    <div className="details-info">
                        <div className="details-top">
                            <span className="client-position">{position}</span>
                            <span className="client-name">{client.name}</span>
                        </div>
                        <div className="details-middle">
                            <span className="client-whatsapp">{client.whatsapp}</span>
                            <span className="client-email">{client.email}</span>
                        </div>
                        <div className="details-bottom">
                            <span>{formatDistanceToNow(new Date(client.createdAt), { addSuffix: true, locale: pt })}</span>
                        </div>
                    </div>
                    <div className="details-actions">
                        <span className="material-symbols-outlined" onClick={handleShow}>qr_code</span>
                        <span className="material-symbols-outlined" onClick={onRemoveClient}>delete</span>
                        <span className="material-symbols-outlined" onClick={onRemoveClient}>thumb_up</span>
                    </div>

                </DetailsContainer>
            </ListGroup.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <QRCode value={`http://127.0.0.1:5173/client/${client._id}`} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ClientDetails