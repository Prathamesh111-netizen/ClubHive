import React from 'react'
import styles from './AdminLayout.module.scss';
import AdminSidebar from '@components/AdminSidebar/AdminSidebar';
import { useSelector } from 'react-redux';
import Login from 'pages/login';

const AdminLayout = ({ children }) => {
    const user = useSelector(state => state.auth.user);

    return (
        <div className={styles.Admin_layout}>
            {
                !user ?
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