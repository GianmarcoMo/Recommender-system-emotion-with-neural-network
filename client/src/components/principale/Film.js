import {React} from 'react';

import {Card, Button, Col, Row, Popover, OverlayTrigger} from 'react-bootstrap';

const Film = ({films}) => {
    
    return(
        <div>
            <Row>
            {films.map((film) => (                
                <Col className="filmItem" xs lg="2">
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
                                <Button variant="primary">Info</Button>
                                </OverlayTrigger>
                            ))}
                            </>

                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
        </div>   
    )
};

export default Film;
