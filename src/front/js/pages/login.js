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
		<div className="container w-50 mt-3">
			<h1 className="text-center">Login</h1>
			<form className="my-1" onSubmit={handleSubmit}>
				<label htmlFor="input" className="form-label ">Email</label>
				<input
					className="form-control  my-1"
					type="email"
					name="email"
					id="email"
					placeholder='email@example.com'
					onChange={(e) => dispatch({ type: 'email', value: e.target.value })}
					value={credentials.email} />

				<label htmlFor="input" className="form-label  my-1">Password</label>
				<input
					className="form-control my-1"
					type="password"
					name="password"
					id="password"
					placeholder='******'
					onChange={(e) => dispatch({ type: 'password', value: e.target.value })}
					value={credentials.password} />


				<button className="btn btn-primary my-4 w-100" type="submit">Login</button>
			</form>
		</div>
	);
};
