import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container">
				<div className="ml-auto">
					<Link to="/Signup">
						<button className="btn btn-primary">Sign up here!</button>
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
};
