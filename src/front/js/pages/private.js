import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import nasa from "./astro1.jpg"


export const Private = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const navigate = useNavigate()


	useEffect(() => {
		if (store?.access_token === null && store.logged === false) navigate('/login')
	}, [store?.access_token])

	

	return (
		<div className="jumbotron">
			<img src={nasa} className=" w-100" alt="..." />
		</div>
	);
};

Private.propTypes = {
	match: PropTypes.object
};
