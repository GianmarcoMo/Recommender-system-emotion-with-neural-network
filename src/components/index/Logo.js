import React from 'react';

import {Link} from 'react-router-dom';

const Logo = () =>{
    return (
        <Link to="/">
            <h1 className="logoHome"><i class="fas fa-video icona-titolo"></i> MovRecommend</h1>
        </Link>
    )
}

export default Logo;