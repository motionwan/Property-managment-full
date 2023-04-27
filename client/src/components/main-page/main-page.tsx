import classNames from 'classnames';
import styles from './main-page.module.scss';
import { SideBar } from '../side-bar/side-bar';
import { NavBar } from '../nav-bar/nav-bar';

export interface MainPageProps {
    className?: string;
    children?: JSX.Element | Array<JSX.Element | string> | string;
}

export const MainPage = ({ className, children }: MainPageProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <NavBar />
            <SideBar />
            <div className={styles.main}>{children}</div>
        </div>
    );
};
