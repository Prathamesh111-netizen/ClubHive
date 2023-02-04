import React, { useCallback, useEffect } from 'react'
import styles from './AdminLayout.module.scss';
import AdminSidebar from '@components/AdminSidebar/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@actions/index';
import Login from 'pages/login';

const AdminLayout = ({ children }) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const onTryAutoSignup = useCallback(
        () => dispatch(actions.authCheckState()),
        [dispatch]
    );

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);

    return (
        <div className={styles.Admin_layout}>
            {
                user ?
                    <>
                        <AdminSidebar />
                        <div className={styles.outlet_wrapper}>
                            {children}
                        </div>
                    </> : <>
                        <Login />
                    </>
            }

        </div>
    )
}

export default AdminLayout