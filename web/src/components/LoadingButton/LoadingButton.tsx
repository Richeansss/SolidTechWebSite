import React from 'react';
import styles from './LoadingButton.module.css';

interface LoadingButtonProps {
    isLoading: boolean;
    text: string;
    className?: string;
    disabled?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
                                                         isLoading,
                                                         text,
                                                         className = '',
                                                         disabled = false,
                                                     }) => {
    return (
        <button
            type="submit"
            disabled={isLoading || disabled}
            className={`${styles.buttonPrimary} ${className}`}
        >
            {isLoading ? 'Загружается...' : text}
        </button>
    );
};

export default LoadingButton;
