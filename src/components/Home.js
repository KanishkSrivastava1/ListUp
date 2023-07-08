import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { Link } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    // check if user loggedin
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // read
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((todo) => {
                            setTodos((oldArray) => [...oldArray, todo]);
                        });
                    }
                });
            } else if (!user) {
                navigate('/')
            }
        });
    }, [])

    // signout 
    const handleSignout = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch(err => { alert(err.message); })
    }

    // add
    const writeToDatabase = () => {
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd
        });
        setTodo("");
    };

    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };

    return (
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header class="mb-auto">
                <div>
                    <h3 class="float-md-start mb-0 ">To-Do</h3>
                    <nav class="nav nav-masthead justify-content-center float-md-end ">
                        
                        <button class="nav-link fw-bold py-1 px-0">
                            <Link class="nav-link fw-bold py-1 px-0 active" aria-current="page" to="/about">About</Link>
                        </button>
                        <button class="nav-link fw-bold py-1 px-0" onClick={handleSignout}>Logout</button>
                    </nav>
                </div>
            </header>
            <main class="px-3" style={{height:'640px'}}>
            <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
            <div className="list-group">
                        <h2 className="my-4">Your Minimalistic To-Do List</h2>

                        <div class="input-group mb-3 my-3 ">
                            <input type="text" class="form-control" placeholder="Add todo..." value={todo} onChange={(e) => setTodo(e.target.value)} aria-label="What on Your Mind" aria-describedby="button-addon2" />
                            <button class="btn btn-outline-secondary" onClick={writeToDatabase} type="button" id="button-addon2">Add</button>
                        </div>

                        {todos.map((todo) => (
                            <div>
                            <label className="list-group-item d-flex gap-2">
                            <input className="form-check-input flex-shrink-0 " type="checkbox" onClick={() => handleDelete(todo.uidd)} value="" />
                            <span>
                                {todo.todo}
                            </span>
                            </label>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="mt-auto text-white-50">
                <p >@Kanishk Srivastava</p>
            </footer>
        </div>
    )
}
