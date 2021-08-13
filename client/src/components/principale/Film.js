import {React, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

import Axios from 'axios';

import {Card, Button, Col, Row, Container} from 'react-bootstrap';

/*<Container className='scelteFilm'>
                <Scelte />
            </Container>*/

const FilmShow = () =>{
    Axios.defaults.withCredentials = true;

    let history = useHistory();
    useEffect(() => {
        Axios.get("http://localhost:3001/isLoggedIn").then((response)=>{
            console.log(response.data);
            if(response.data === true || response.data.loggedIn === true)
                history.push('/dashboard');
            else 
                history.push('/');
        });
    }, []);

    return(
        <div>
            <Container className='elencoFilm'>
                <h1>Primi suggerimenti...</h1><br></br>
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
            
            <Container className='elencoFilm'>
                <h1>Secondi suggerimenti...</h1><br></br>
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
        </div>
    )
}

export default FilmShow;