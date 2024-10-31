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
        <div className="container w-50 mt-3">
            <h1 className="text-center">Register</h1>

            {store.signupStatus && <p>{store.signupStatus}</p>}
            <form className="my-1" onSubmit={handleSubmit}>
                <label htmlFor="input" className="form-label ">Email</label>
                <input
                    className="form-control  my-1"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="input" className="form-label  my-1">Password</label>
                <input
                    className="form-control my-1"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                 <label htmlFor="input" className="form-label  my-1">Confirm Password</label>
                <input
                    className="form-control my-1"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div>
                    <Link to="/Login">
                        <small>Go to Login</small>
                    </Link>
                </div>
                <button className="btn btn-primary my-4 w-100" type="submit">Register</button>
            </form>

        </div>
    );
};