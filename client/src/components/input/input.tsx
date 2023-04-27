import React from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    ref?: React.ForwardedRef<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, ...rest }, ref) => (
        <div className={classNames(styles.root, className)}>
            <input className={styles.input} ref={ref} {...rest} />
        </div>
    )
);
