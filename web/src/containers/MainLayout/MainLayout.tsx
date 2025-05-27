import { FC, ReactNode } from 'react';
import styles from './MainLayout.module.css';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserRole } from '../../store/slice/authSlice';
import { Header } from '../../components';

interface IMainLayoutProps {
    children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
    const isAuth = useSelector(selectIsAuthenticated);
    const userRole = useSelector(selectUserRole) || '';

    return (
        <div className={styles.wrapper}>
            <Header isAuth={isAuth} userRole={userRole} />
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export { MainLayout };
