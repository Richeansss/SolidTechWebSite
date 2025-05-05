import React from 'react';

interface ErrorMessageProps {
    error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = (ErrorMessageProps)=> {
    return (
        <p className="text-red-600 mb-2">{ErrorMessageProps.error}</p>
    );
}

export default ErrorMessage;
