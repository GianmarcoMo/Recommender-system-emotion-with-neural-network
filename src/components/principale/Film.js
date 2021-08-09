import React from 'react';

import {Card, Button, Col, Row, Container} from 'react-bootstrap';

const FilmShow = () =>{
    return(
        <Container>
            <h1>Ti consigliamo...</h1><br></br>
            <Container>
                <Row className="justify-content-md-center">
                    <Col className="filmItem" xs lg="2">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/e/e1/Bo_Burnham_-_Inside.jpg" />
                            <Card.Body>
                                <Card.Title>Bo Burnham: Inside </Card.Title>
                                <Button variant="primary">Info</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="filmItem" xs lg="2">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://static.wikia.nocookie.net/netflix/images/5/5a/HTSDO_Season_3_Poster.jpg" />
                            <Card.Body>
                                <Card.Title>How to Sell Drugs Online (Fast) </Card.Title>
                                <Button variant="primary">Info</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="filmItem" xs lg="2">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://static.wikia.nocookie.net/netflix/images/3/30/Lupin_S1_Poster.jpg" />
                            <Card.Body>
                                <Card.Title>Lupin </Card.Title>
                                <Button variant="primary">Info</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col className="filmItem" xs lg="2">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://static.wikia.nocookie.net/netflix/images/c/c5/Ginny_%26_Georgia_S1_Poster.jpg" />
                            <Card.Body>
                                <Card.Title>Ginny & Georgia  </Card.Title>
                                <Button variant="primary">Info</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="filmItem" xs lg="2">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://static.wikia.nocookie.net/netflix/images/3/3c/The_Mitchells_vs._The_Machines.jpg" />
                            <Card.Body>
                                <Card.Title>The Mitchells vs. The Machines </Card.Title>
                                <Button variant="primary">Info</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="filmItem" xs lg="2">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://static.wikia.nocookie.net/netflix/images/3/35/Ozark_S3_Poster_01.jpg" />
                            <Card.Body>
                                <Card.Title>Ozark </Card.Title>
                                <Button variant="primary">Info</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default FilmShow;