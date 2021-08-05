import React from 'react';

import DescHomepage from './DescHomepage';
import Logo from './Logo';

const ContainerHomepage = ()=>{
    return (
        <div class="hero-image">
            <Logo/>
            <div class="hero-text">
                <DescHomepage/>
            </div>
        </div> 
    )
}

export default ContainerHomepage