import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const navigate = useNavigate()

	useEffect(() => {
		if (store?.access_token === null) navigate('/login')
	}, [store?.access_token])

	return (
		<div className="text-center mt-5">
			<h1>Home Page</h1>

			
			<Link to="/Private">
				<button className="btn btn-primary">Go to private page</button>
			</Link>
			<button onClick={actions.logout}>Logout</button>
		</div>	
		
			
	
	);
};
