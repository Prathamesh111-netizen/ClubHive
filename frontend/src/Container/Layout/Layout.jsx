import React from 'react'
import styles from './Layout.module.scss'

import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '@actions/index';
import Navbar from '@components/Navbar/Navbar';


const Layout = ({ children }) => {
	const dispatch = useDispatch();

	const onTryAutoSignup = useCallback(
		() => dispatch(actions.authCheckState()),
		[dispatch]
	);

	useEffect(() => {
		onTryAutoSignup();
	}, [onTryAutoSignup]);

	return (
		<div className={styles.Layout}>
			<Navbar />
			<main>{children}</main>
		</div>
	)
}

export default Layout