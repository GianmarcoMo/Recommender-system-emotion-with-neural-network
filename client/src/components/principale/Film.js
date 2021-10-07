import axios from 'axios';
import {useState} from 'react';
import React from 'react';
import {Card, Button, Col, Row, Popover, OverlayTrigger, Badge, Modal} from 'react-bootstrap';

const Film = ({films}) => {
    const [time, setTime] = useState(0);
    const [leggendoTrama, setLeggendoTrama] = useState(false);

    function saveFilm(titolo, genere, tipo){        
        const inviaFilm = async () =>{
            await axios.post('http://localhost:3001/filmPreferito', {film: titolo, genere: genere, tipo: tipo});
        }
        inviaFilm();
    }
    
    function prendiTempo(titoloElemento){
        let interval = null;

        const memorizzaFilm = async (minuto,secondi) =>{
            await axios.post('http://localhost:3001/tempoLettura/00:'+minuto+':'+secondi+'/'+titoloElemento);
        }
        
        if(leggendoTrama){
            setLeggendoTrama(current => !current);
            memorizzaFilm(("0" + Math.floor((time / 60000) % 60)).slice(-2), ("0" + Math.floor((time / 2000) % 60)).slice(-2));
        }else{
            setLeggendoTrama(current => !current);
            setTime(0*0);
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        }
    }

    const Trailer = ({film}) => {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        return (
          <>
            <Button variant="danger" className="btn-trailer" onClick={handleShow}>
            <i className="fas fa-play"></i>
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{film.titolo} - Trailer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <iframe width="460" height="315" src={film.trailer}>
                </iframe>
              </Modal.Body>
            </Modal>
          </>
        );
    }

    return(
        <div>
            <Row>
            {films.map((film) => (   
                <Col className="filmItem" xs lg="2" key={film.titolo}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={film.locandina} />
                        <Card.Body>
                            <Card.Title>{film.titolo} </Card.Title>
                            
                            <>
                            {['top'].map((placement) => (
                                <OverlayTrigger
                                trigger="click"
                                key={placement}
                                placement={placement}
                                overlay={
                                    <Popover id={`popover-positioned-${placement}`}>
                                    <Popover.Header as="h3">Trama</Popover.Header>
                                    <Popover.Body>
                                        {film.trama}
                                    </Popover.Body>
                                    </Popover>
                                }
                                >
                                <Button variant="outline-warning" onClick={() => prendiTempo(film.titolo)}>Info</Button>
                                </OverlayTrigger>
                            ))}
                            
                            </>
                            <Trailer film={film} />
                            <Button variant="outline-danger" className='btn-like' value={film.titolo} onClick={() => saveFilm(film.titolo, film.genere[0], film.tipo[0])}>
                                <i className="far fa-heart"></i>
                            </Button>{' '}
                            <br></br><br></br>
                            <Badge pill bg="warning" text="dark">
                                {film.genere}
                            </Badge>{' '}
                            <Badge bg="secondary">{film.tipo}</Badge>{' '}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </div>   
    )
};

export default Film;
