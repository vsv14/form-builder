import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';



function NavBar() {
    const navigate = useNavigate();
    const locate = useLocation();


    const moveToConstructor = ()=>{
        navigate('/builder')
    }

    return (
        <div className='navbar'>
            <div className='navbar-content'>
                <div>
                    <h3>FormBuilder</h3>
                </div>

                <div className='links'>
                    <ul>
                        {(locate.pathname!=='/builder')&&<li onClick={()=>moveToConstructor()}>constructor</li>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar
