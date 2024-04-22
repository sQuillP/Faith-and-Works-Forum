import { useContext, useState } from "react";
import "./styles/AdminLogin.css";
import { CircularProgress, Stack, Snackbar, Alert } from "@mui/material";
import { AuthContext } from "../Admin/Admin";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

    const context = useContext(AuthContext);


    const navigate = useNavigate();
    const [showLoginError, setShowLoginError] = useState(false);

    const [loginData, setLoginData] = useState({
        username:'',
        password:''
    });

    const [loggingIn, setLoggingIn] = useState(false);

    async function login() {
        
        // Run asynchronous code to login
        context.login();
    }



    return (
        <div className="admin-main">
            <Snackbar
                open={showLoginError}
                onClose={()=> setShowLoginError(false)}
                autoHideDuration={4000}
                anchorOrigin={{horizontal:'center', vertical:'bottom'}}
            >
                <Alert
                    severity='error'
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Unable to login. Please check your internet or contact IT.
                </Alert>
            </Snackbar>
                <p className="text login-header">Admin Portal</p>
            <div className="am-login-container">
                <Stack
                    direction={'column'}
                    gap={2}
                    alignItems={'center'}
                >
                    <div className="am-login-img-wrapper">
                        <img src="/FaithAndForumLogo.jpeg" alt="logo" className="login-img" />
                    </div>
                    <p className="text login-title">Sign in</p>
                </Stack>
                <hr className="fancy-hr"  />
                <div className="am-login-form">
                    <div className="al-login-field">
                        <label htmlFor="" className="al-login-label">User Name</label>
                        <input 
                            type="text" 
                            onChange={(e)=>setLoginData({...loginData,username:e.target.value})}
                            className="am-input"
                        />
                    </div>
                    <div className="al-login-field">
                        <label htmlFor="" className="al-login-label">Password</label>
                        <input 
                            type="password" 
                            onChange={(e)=> setLoginData({...loginData,password:e.target.value})} 
                            className="am-input"    
                        />
                    </div>
                    <Stack>
                        <button 
                            onClick={login}
                            className="al-login-button">
                            {
                                loggingIn ? (
                                    <CircularProgress
                                        size={20}
                                        sx={{color:'white'}}

                                    />
                                ):(
                                    <>
                                        Login
                                    </>
                                )
                            }
                        </button>
                    </Stack>
                </div>
            </div>
        </div>
    );
}