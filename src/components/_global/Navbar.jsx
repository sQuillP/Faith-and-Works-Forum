import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import {Stack} from '@mui/material';
import { useEffect, useRef, useState } from "react";


const linkStyles = {
    textDecoration:'none'
};

const iconStyle = {
    fontSize:'1.5rem', 
    color:'var(--dark)'
}

const IG_URL = "https://www.instagram.com/indyfwf/";

export default function Navbar() {

    const [smallMenuOpen, setSmallMenuOpen] = useState('');
    const [crossBurger, setCrossBurger] = useState("");
    const smallMenuRef = useRef(null);
    const xButtonRef = useRef(null);
    const navigation = useNavigate();


    function handleBurgerClick() {
        if (smallMenuOpen === '') {
            setSmallMenuOpen('nav-slider-open');
            setCrossBurger("active-x");
        } else {
            setSmallMenuOpen('');
            setCrossBurger('');
        }
    }


    //Listen for clicking away from small menu
    function catchMenuClickAway(e) {
        if(xButtonRef.current.contains(e.target) === false && smallMenuRef.current.contains(e.target) === false) {
            setSmallMenuOpen('');
            setCrossBurger('');
        }
    }

    useEffect(()=> {
       document.addEventListener('click',catchMenuClickAway)
        return ()=> {
            document.removeEventListener('click', catchMenuClickAway)
        }
    },[]);

    return (
        <div className="navbar-container">
            <div className="navbar-container-large">
                <div
                    onClick={()=> navigation('/')}
                    style={{cursor:'pointer'}}
                >
                    <Stack 
                        direction={"row"}
                        alignItems={'center'}
                        
                    >
                        <div className="nav-logo-wrapper">
                            <img src="/FaithAndForumLogo.jpeg" alt="Logo" className="logo" />
                        </div>
                        <p className="text nav-title">Faith and Work Forum</p>
                    </Stack>
                </div>
                <div className="nav-links">
                    <div className="link">
                        <Link style={linkStyles} to={'/gathering'}>
                            <p className="link-text">
                                Next Gathering
                            </p>
                        </Link>
                    </div>
                    <div className="link">
                        <Link style={linkStyles} to={'/about'}>
                            <p className="link-text">
                                About
                            </p>
                        </Link>
                    </div>
                    <div className="link">
                        <Link style={linkStyles} to={'/links'}>
                            <p className="link-text">
                                Resources
                            </p>
                        </Link>
                    </div>
                    <div className="link">
                        <Link style={linkStyles} to={'/resources'}>
                            <p className="link-text">
                                Get Connected
                            </p>
                        </Link>
                    </div>
                    <div onClick={()=> window.open(IG_URL)} className="link">
                        <p className="link-text">
                            Insta
                        </p>
                    </div>
                </div>  
            </div>

            <div className="navbar-container-small">
                    <Stack 
                        direction={"row"}
                        alignItems={'center'}
                        gap={1}
                    >
                        <div 
                            className={`nav-hamburger ${crossBurger}`}
                            onClick={handleBurgerClick}
                            ref={xButtonRef}
                        >
                            <div></div>
                        </div>
                        <div
                            onClick={()=>navigation('/')}
                            style={{cursor:'pointer', display:'flex', alignItems:'center'}}
                        >
                            <div className="nav-logo-wrapper">
                                <img src="/FaithAndForumLogo.jpeg" alt="Logo" className="logo" />
                            </div>
                            <p className="text nav-title">Faith and Work Forum</p>
                        </div>
                    </Stack>
                <div 
                    className={`nav-menu-slider ${smallMenuOpen}`}
                    ref={smallMenuRef}
                >
                    <div className="nav-menu-item">
                        <Link style={linkStyles} to={'/gathering'}>
                            <Stack 
                                direction={'row'} 
                                alignItems={'center'}
                                gap={1}
                            >
                                <i style={iconStyle} className="fa-solid fa-people-group"></i>
                                <p className="text nav-item-text">
                                    Next Gathering
                                </p>
                            </Stack>
                        </Link>
                    </div>
                    <div className="nav-menu-item">
                        <Link style={linkStyles} to={'/about'}>
                            <Stack 
                                direction={'row'} 
                                alignItems={'center'}
                                gap={1}
                            >
                                <i style={iconStyle} className="fa-solid fa-circle-info"></i>
                                <p className="text nav-item-text">
                                    About
                                </p>
                            </Stack>
                        </Link>
                    </div>
                    <div className="nav-menu-item">
                        <Link style={linkStyles} to={'/links'}>
                            <Stack 
                                direction={'row'} 
                                alignItems={'center'}
                                gap={1}
                            >
                                <i style={iconStyle} className="fa-solid fa-cookie-bite"></i>
                                <p className="text nav-item-text">
                                   Resources
                                </p>
                            </Stack>
                        </Link>
                    </div>
                    <div className="nav-menu-item">
                        <Link style={linkStyles} to={'/resources'}>
                            <Stack 
                                direction={'row'} 
                                alignItems={'center'}
                                gap={1}
                            >
                                <i style={iconStyle} className="fa-solid fa-plug"></i>
                                <p className="text nav-item-text">
                                    Getting Connected
                                </p>
                            </Stack>
                        </Link>
                    </div>
                    <div onClick={()=> window.open(IG_URL)} className="nav-menu-item">
                        <Stack 
                            direction={'row'} 
                            alignItems={'center'}
                            gap={1}
                        >
                            <i style={iconStyle} className="fa-brands fa-instagram"></i>
                            <p className="text nav-item-text">
                                Our Instagram
                            </p>
                        </Stack>
                    </div>
                    <div className="nav-menu-item">
                        <Link style={linkStyles} to={'/'}>
                            <Stack 
                                direction={'row'} 
                                alignItems={'center'}
                                gap={1}
                            >
                                <i style={iconStyle} className="fa-solid fa-home"></i>
                                <p className="text nav-item-text">
                                    Home
                                </p>
                            </Stack>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>

    );
}