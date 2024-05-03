import React from "react";
import Select from "react-select";

interface SelectValueNumberProps {
    id: string;
    options: { value: number; label: string }[];
    value: { value: number; label: string } | null;
    onChange: (selectedOption: { value: number; label: string } | null) => void; // Исправлено на тип number
    placeholder: string;
    className?: string;
}

const SelectValueNumber: React.FC<SelectValueNumberProps> = ({
                                                                 id,
                                                                 options,
                                                                 value,
                                                                 onChange,
                                                                 placeholder,
                                                                 className
                                                             }) => {
    return (
        <div className={`mb-4 mr-4`}>
            <label htmlFor={id} className="mr-2">Тип памяти:</label>
            <Select
                id={id}
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={className}
            />
        </div>
    );
}

export default SelectValueNumber;
