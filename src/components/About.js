import React from 'react'
import { Link } from 'react-router-dom'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();
    const handleSignout = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch(err => { alert(err.message); })
    }

    return (
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header class="mb-auto">
                <div>
                    <h3 class="float-md-start mb-0 ">To-Do</h3>
                    <nav class="nav nav-masthead justify-content-center float-md-end ">

                        <button class="nav-link fw-bold py-1 px-0">
                            <Link class="nav-link fw-bold py-1 px-0 active" aria-current="page" to="/home">Home</Link>
                        </button>
                        <button class="nav-link fw-bold py-1 px-0" onClick={handleSignout}>Logout</button>
                    </nav>
                </div>
            </header>

            <main class="px-3" style={{ height: '640px' }}>

            <div class="accordion my-5" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    About
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                •	Built a Minimalistic To-do list web app with create and delete task features and Login for the user.
                                <br/>•	Firebase was used for Authentication and real-time Database. 
                                
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                   Contact
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    itskanishks@gmail.com
                                </div>
                            </div>
                        </div>
                    </div>
            </main>
            <footer className="mt-auto text-white-50">
                <p >@Kanishk Srivastava</p>
            </footer>
        </div>
    )
}
