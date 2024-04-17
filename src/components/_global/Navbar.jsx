import { Link } from "react-router-dom";
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

export default function Navbar() {

    const [smallMenuOpen, setSmallMenuOpen] = useState('');
    const [crossBurger, setCrossBurger] = useState("");
    const smallMenuRef = useRef(null);
    const xButtonRef = useRef(null);

    function handleLogoClick() {
        console.log('firing');
    }

    function handleBurgerClick() {
        console.log('handling burger click');
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
                    onClick={handleLogoClick}
                    style={{cursor:'pointer'}}
                >
                    <Stack 
                        direction={"row"}
                        alignItems={'center'}
                        
                    >
                        <div className="nav-logo-wrapper">
                            <img src="/FaithAndForumLogo.jpeg" alt="Logo" className="logo" />
                        </div>
                        <p className="text nav-title">Faith and Works Forum</p>
                    </Stack>
                </div>
                <div className="nav-links">
                    <div className="link">
                        <Link style={linkStyles} to={'/'}>
                            <p className="link-text">
                                Next Gathering
                            </p>
                        </Link>
                    </div>
                    <div className="link">
                        <Link style={linkStyles} to={'/'}>
                            <p className="link-text">
                                About
                            </p>
                        </Link>
                    </div>
                    <div className="link">
                        <Link style={linkStyles} to={'/'}>
                            <p className="link-text">
                                Resources
                            </p>
                        </Link>
                    </div>
                    <div className="link">
                        <Link style={linkStyles} to={'/'}>
                            <p className="link-text">
                                Get Connected
                            </p>
                        </Link>
                    </div>
                    <div className="link">
                        <Link style={linkStyles} to={'/'}>
                            <p className="link-text">
                                Insta
                            </p>
                        </Link>
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
                            onClick={handleLogoClick}
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
                        <Link style={linkStyles} to={'/'}>
                            <Stack 
                                direction={'row'} 
                                alignItems={'center'}
                                gap={1}
                            >
                                <i style={iconStyle} className="fa-brands fa-instagram"></i>
                                <p className="text nav-item-text">
                                    Our Insta
                                </p>
                            </Stack>
                        </Link>
                    </div>
                    <div className="nav-menu-item">
                        <Link style={linkStyles} to={'/'}>
                            <Stack 
                                direction={'row'} 
                                alignItems={'center'}
                                gap={1}
                            >
                                <i style={iconStyle} className="fa-brands fa-instagram"></i>
                                <p className="text nav-item-text">
                                    Our Insta
                                </p>
                            </Stack>
                        </Link>
                    </div>
                    <div className="nav-menu-item">
                        <Link style={linkStyles} to={'/'}>
                            <Stack 
                                direction={'row'} 
                                alignItems={'center'}
                                gap={1}
                            >
                                <i style={iconStyle} className="fa-brands fa-instagram"></i>
                                <p className="text nav-item-text">
                                    Our Insta
                                </p>
                            </Stack>
                        </Link>
                    </div>
                    <div className="nav-menu-item">
                        <Link style={linkStyles} to={'/'}>
                            <Stack 
                                direction={'row'} 
                                alignItems={'center'}
                                gap={1}
                            >
                                <i style={iconStyle} className="fa-brands fa-instagram"></i>
                                <p className="text nav-item-text">
                                    Get Connected
                                </p>
                            </Stack>
                        </Link>
                    </div>
                    <div className="nav-menu-item">
                        <Link style={linkStyles} to={'/'}>
                            <Stack 
                                direction={'row'} 
                                alignItems={'center'}
                                gap={1}
                            >
                                <i style={iconStyle} className="fa-brands fa-instagram"></i>
                                <p className="text nav-item-text">
                                    Our Insta
                                </p>
                            </Stack>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}