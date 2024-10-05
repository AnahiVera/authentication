import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Private = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const navigate = useNavigate()



	useEffect(() => {
        actions?.private(store?.access_token)
    }, [store?.access_token])

    useEffect(() => {
		if (store?.access_token === null) navigate('/login')
	}, [store])

	return (
		<div className="jumbotron">
			<h1 className="display-4">Private page once login</h1>
			

	
		</div>
	);
};

Private.propTypes = {
	match: PropTypes.object
};
