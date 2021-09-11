import {React, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import DescHomepage from './DescHomepage';

const ContainerIndex = ()=>{
    let history = useHistory();
    useEffect(() => {
        const controllaLogin = async () => {
            //  Richiesta per vedere se l'utente ha effettuato il LOGIN
            const rispostaLogin = await axios ('http://localhost:3001/isLoggedIn');

            if(rispostaLogin.data.loggedIn == true){
                history.push('/dashboard');
            }
        }

        controllaLogin();        
    }, []);

    return (
        <div className="hero-image">
            <div className="hero-text">
                <DescHomepage/>
            </div>
        </div> 
    )
}

export default ContainerIndex