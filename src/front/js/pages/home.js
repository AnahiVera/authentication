import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import wallpaper from "./astro.png"

export const Home = () => {
	const { store, actions } = useContext(Context);

	const navigate = useNavigate()

	useEffect(() => {
		if (store?.access_token === null) navigate('/login')
	}, [store?.access_token])

	return (
		<div className="text-center">
			<div className="">
			<img src={wallpaper} />
				<div className="carousel-caption d-none d-md-block">
					<Link to="/Private">
						<button className="btn btn-dark">GO TO SPACE HERE!</button>
					</Link>
				</div>
			</div>




		</div>



	);
};
