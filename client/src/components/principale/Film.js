import {React} from 'react';

import {Card, Button, Col, Row, Popover, OverlayTrigger, Badge} from 'react-bootstrap';

const Film = ({films}) => {
    
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
                                <Button variant="outline-warning">Info</Button>
                                </OverlayTrigger>
                            ))}
                            
                            </>
                            <Button variant="outline-danger" className='btn-like'><i class="far fa-heart"></i></Button>{' '}
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
