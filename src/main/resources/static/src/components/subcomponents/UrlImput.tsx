import React from 'react';

interface UrlInputProps {
    value: string;
    onChange: (value: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ value, onChange }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="mb-4">
            <label htmlFor="url" className="mr-2">URL:</label>
            <input
                id="url"
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder="Введите URL"
                className="border rounded px-2 py-1"
            />
        </div>
    );
}

export default UrlInput;