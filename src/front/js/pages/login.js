import React, { useState, useEffect, useContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

// Reducer para manejar las credenciales
const reducer = (state, action) => {
	switch (action.type) {
		case 'email':
			return { ...state, email: action.value };
		case 'password':
			return { ...state, password: action.value };
		default:
			return state;
	}
};

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	useEffect(() => {
		if (store?.access_token) navigate('/')
	}, [store.access_token, navigate])

	// Estado inicial de las credenciales usando useReducer
	const [credentials, dispatch] = useReducer(reducer, {
		email: '',
		password: ''
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		const resp = await actions.login(credentials)
		

	}


	return (
		<div className="container">
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					name="email"
					id="email"
					placeholder='email'
					onChange={(e) => dispatch({ type: 'email', value: e.target.value })}
					value={credentials.email} />

				<input
					type="password"
					name="password"
					id="password"
					placeholder='password'
					onChange={(e) => dispatch({ type: 'password', value: e.target.value })}
					value={credentials.password} />


				<button type="submit">Login</button>
			</form>
		</div>
	);
};
