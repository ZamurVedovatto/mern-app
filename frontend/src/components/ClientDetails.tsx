import { useState } from 'react';
import { useClientContext } from './../hooks/useClientContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { pt } from 'date-fns/locale'
import QRCode from "react-qr-code";
import styled from 'styled-components'
import { ListGroup, Button, Modal } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; 

const API_URL = import.meta.env.VITE_API_URL;

const DetailsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;

    .details-info {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        .details-top {
            display: flex;
            flex-wrap: wrap;
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
                    font-size: 1rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    max-width: 310px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #444443;
                }
            }
        }
        .details-middle {
            display: flex;
            flex-wrap: wrap;
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
            flex-wrap: wrap;
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

interface ClientDetailsProps {
    client: any;
    position: number;
}

function ClientDetails({client, position}: ClientDetailsProps) {
    const { dispatch } = useClientContext()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const handleShow = () => setShow(true);

    const onConfirmRemove = () => {
        confirmAlert({
            title: 'Remover cliente da fila?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => onRemoveClient()
                },
                {
                    label: 'Não',
                    onClick: () => console.log('cancelled')
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: false,
            overlayClassName: "overlay-custom-dialog"
        });
    }

    const onConfirmAttend = () => {
        confirmAlert({
            title: 'Cliente entrou no estabelecimento?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => onRemoveClient()
                },
                {
                    label: 'Não',
                    onClick: () => console.log('cancelled')
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: false,
            overlayClassName: "overlay-custom-dialog"
        });
    }

    const onRemoveClient = async () => {
        const resp = await fetch(`${API_URL}/client/` + client._id, {
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
            <ListGroup.Item as="li" className={position === 1 ? 'first-client': ''}>
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
                            <span>{formatDistanceToNow(new Date(client.createdAt), { addSuffix: true, locale: pt, includeSeconds: true })}</span>
                        </div>
                    </div>
                    <div className="details-actions">
                        <span className="material-symbols-outlined" onClick={handleShow}>qr_code</span>
                        <span className="material-symbols-outlined" onClick={onConfirmRemove}>delete</span>
                        <span className="material-symbols-outlined" onClick={onConfirmAttend}>thumb_up</span>
                    </div>

                </DetailsContainer>
            </ListGroup.Item>

            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{client.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center align-items-center p-4">
                    <QRCode value={`http://127.0.0.1:5173/client/${client._id}`} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ClientDetails