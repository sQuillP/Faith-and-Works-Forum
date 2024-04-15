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

    const [smallMenuOpen, setSmallMenuOpen] = useState('nav-slider-open');
    const smallMenuRef = useRef();

    function handleLogoClick() {
        console.log('firing');
    }

    function handleBurgerClick() {
        if (smallMenuOpen === '') {
            setSmallMenuOpen('nav-slider-open')
        } else {
            setSmallMenuOpen('')
        }
    }

    //Listen for clicking away from small menu
    function catchMenuClickAway(e) {
        if( e.target.contains(smallMenuRef.current) === true) {
            setSmallMenuOpen('');
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
                        <img src="/FaithAndForumLogo.jpeg" alt="Logo" className="logo" />
                        <p className="text nav-title">Faith and Forum</p>
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
                        
                    >
                        <div 
                            className="nav-hamburger"
                            onClick={handleBurgerClick}
                        >
                            <div></div>
                        </div>
                        <div
                            onClick={handleLogoClick}
                            style={{cursor:'pointer', display:'flex', alignItems:'center'}}
                        >
                            <img src="/FaithAndForumLogo.jpeg" alt="Logo" className="logo" />
                            <p className="text nav-title">Faith and Forum</p>
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