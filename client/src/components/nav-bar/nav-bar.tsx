import classNames from 'classnames';
import styles from './nav-bar.module.scss';

export interface NavBarProps {
    className?: string;
    // children?: JSX.Element | Array<JSX.Element | string> | string;
}

export const NavBar = ({ className }: NavBarProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.navbar}></div>
        </div>
    );
};
