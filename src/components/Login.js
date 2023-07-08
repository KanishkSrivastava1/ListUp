import React from 'react'
import { useState, useEffect } from 'react';
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import logo from '../Assets/to.png'


export default function () {
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/home')
            }
        });
    }, [])
    const handleSubmit = async () => {
        console.log(credentials.email)
        signInWithEmailAndPassword(auth, credentials.email, credentials.password).then(() => {
            navigate('/home')
        })
            .catch((err) => alert(err.message));
    }


    const handleOnChange = (e) => {
        setc({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
       if (registerInformation.password !== registerInformation.confirmPassword) {
            alert("Please confirm that password are the same");
            return;
        }
        createUserWithEmailAndPassword(
            auth,
            registerInformation.email,
            registerInformation.password
        )
            .then(() => {
                navigate("/home");
            })
            .catch((err) => alert(err.message));
    };

    const [credentials, setc] = useState({ email: "", password: "" });
    const [registering, setreg] = useState(false)
    const [registerInformation, setRegisterInformation] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });


    return (
        <div>
            <main className=" my-5 form-signin w-100 m-auto" style={{height:'640px'}}>
                <img className="mb-4 my-5" src={logo}  width="72" height="57" />
                {!registering ? (
                    <>
                    <h1 className="h3 mb-3 fw-normal">Please Login</h1>
                        <div className="form-floating">
                            <input className="form-control" onChange={handleOnChange} name="email" value={credentials.email} id="email" placeholder="email" />
                            <label htmlFor="floatingInput">email</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" onChange={handleOnChange} name="password" value={credentials.password} id="Password" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="btn btn-outline-secondary w-100 py-2 my-1" onClick={handleSubmit} type="submit">Login</button>
                        <button className="btn btn-outline-secondary w-100 py-2 my-1" onClick={() => { setreg(true) }} type="submit">Register</button>
                    </>
                ) : (
                    <>
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                        <div className="form-floating">
                            <input className="form-control" onChange={(e) =>
                                setRegisterInformation({
                                    ...registerInformation,
                                    email: e.target.value
                                })} name="email" value={registerInformation.email} id="email" placeholder="email" />
                            <label htmlFor="floatingInput">email</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" onChange={(e) =>
                                setRegisterInformation({
                                    ...registerInformation,
                                    password: e.target.value
                                })} name="password" value={registerInformation.password} id="Password" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" onChange={(e) =>
                                setRegisterInformation({
                                    ...registerInformation,
                                    confirmPassword: e.target.value
                                })} name="password" value={registerInformation.confirmPassword} id="ConfirmPassword" placeholder="Confirm Password" />
                            <label htmlFor="floatingPassword">Confirm Password</label>
                        </div>
                        <button className="btn btn-outline-secondary w-100 py-2 my-1" onClick={handleRegister}>Register</button>
                        <button className="btn btn-outline-secondary btn-sm w-100 py-2 my-1" onClick={() => setreg(false)}>Go Back</button>
                    </>
                )

                }
            </main>
        </div>
    )
}
