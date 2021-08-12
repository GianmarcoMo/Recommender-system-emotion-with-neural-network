import React from 'react';

import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';


const DescHomepage = () =>{
    return (
        <div className="homepage">
            <Form className='formHome'>
                <Link to="/login"><Button variant="outline-light btnIndex" size="lg">Login</Button> </Link>
                <Link to="/registrati"><Button variant="light btnIndex" size="lg">Registrati</Button></Link>
            </Form>
        </div>
    )
}

export default DescHomepage;