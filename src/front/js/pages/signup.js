import React, { useState, useEffect, useContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";



export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email, password };


        const success = await actions.signup(credentials);

        if (success) {
            navigate('/login');
        }
    };




    return (
        <div className="container">
            <h1>Register</h1>

            {store.signupStatus && <p>{store.signupStatus}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <div>
                <Link to="/Login">
                    <small>Go to Login</small>
                </Link>
            </div>
        </div>
    );
};