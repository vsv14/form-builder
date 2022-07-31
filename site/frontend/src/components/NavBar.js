import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';



function NavBar() {
    const navigate = useNavigate();
    const locate = useLocation();


    const moveToConstructor = ()=>{
        navigate('/search')
    }

    return (
        <div className='navbar'>
            <div className='navbar-content'>
                <div>
                    <h3>Forms</h3>
                </div>

                <div>
                    <ul>
                        {(locate.pathname !== '/search') && (<li onClick={()=>moveToConstructor()}>search</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar
