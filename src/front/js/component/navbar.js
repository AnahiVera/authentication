import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	if (store.logged) {
		return (
			<nav className="navbar navbar-dark bg-dark">
				<div className="container">
					<div className="ml-auto">
						<Link to="/Signup">
							<button className="btn btn-info">Sign up here!</button>
						</Link>
					</div>
					<div>
						<button className="btn btn-warning" onClick={actions.logout}>Logout</button>
					</div>
					<div className="">
						<Link to="/">
							<button className="btn btn-primary">Home</button>
						</Link>
					</div>

				</div>
			</nav>
		);
	} else {
		return (
			<nav className="navbar navbar-dark bg-dark">
				<div className="container">
					<div className="ml-auto">
						<Link to="/Signup">
							<button className="btn btn-info">Sign up here!</button>
						</Link>
					</div>
					<div className="ml-auto">
						<Link to="/">
							<button className="btn btn-primary">Home</button>
						</Link>
					</div>
				</div>
			</nav>
		);
	}

};
