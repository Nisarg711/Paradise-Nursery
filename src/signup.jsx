import React, { useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { auth } from './backend/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from './backend/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';
import Footer from './footer'
import Nav from './nav'
const signup = () => {
    const [begin, setbegin] = useState(false);
    const [register, setregister] = useState({ name: "", email: "", password: "" })
    const handlechange = (e) => {
        setregister({ ...register, [e.target.name]: e.target.value });
        console.log("USer is: ", register);
    }
    async function delay(d) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res();
            }, d * 1000);
        })
    }
    async function handleregister() {
        setbegin(true);
        console.log("begin changed: ", begin);
        createUserWithEmailAndPassword(auth, register.email, register.password).then(async () => {
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "userdetails", user.uid), {
                    name: register.name,
                    email: register.email,
                    password: register.password
                });
                toast('User registered Successfully!!!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                await delay(1.5);
                console.log("User registered: ", register,begin);
        console.log("CHECKING BEGIN: ",begin);
        window.location.href='/shop'
            }
        }).catch((err) => {
            alert(err.message);
        })
     
    }
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={'light'}
            />
            <Nav />

            <div className="logincard">
                <div className="heading" style={{ textAlign: 'center', position: 'relative' }}><h3>Sign up</h3></div>
                <div className='form'>
                    <div className="username">
                        <p>Username</p>
                        <div className="inp">
                            <input type="text" name='name' onChange={handlechange} placeholder='Enter Username' />
                        </div>
                    </div>
                    <div className="email">
                        <p style={{ marginBottom: '0rem' }}>Email</p>
                        <div className="inp">
                            <input type="text" name='email' onChange={handlechange} placeholder='Enter Email Address' />
                        </div>
                    </div>
                    <div className="password">
                        <p style={{ marginBottom: '0rem' }}>Password</p>
                        <div className="inp">
                            <input type="password" onChange={handlechange} placeholder='Enter Your Password' name="password" id="" />
                        </div>
                    </div>
                    <div className="options2">
                        <div className="signin">
                            <button className='btn2' value="Sign Up" onClick={handleregister}>
                                {begin ? <DotLottieReact src="https://lottie.host/a537d24a-b75f-49d2-b989-9663fc8d8c67/ElKzzvk4iJ.lottie" loop style={{ height: "32px", width: "32px" }}
                                    autoplay /> : <></>}
                                Sign up</button>

                        </div>
                        <div className="create2">
                            <a href="/login"   style={{color:'gray'}} target='_blank'>Already have an account? Click here</a>
                        </div>
                    </div>
                </div>

            </div>
            <Footer  style={{top:'10vh'}}/>
        </div>
    )
}

export default signup
