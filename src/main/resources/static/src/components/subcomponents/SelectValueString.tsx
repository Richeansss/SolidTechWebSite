import React from "react";
import Select from "react-select";


interface SelectSValueStringProps {
    id: string;
    options: { value: string; label: string }[];
    value: { value: string; label: string } | null;
    onChange: (selectedOption: { value: string; label: string } | null) => void;
    placeholder: string;
    className?: string;
}

const SelectValueString: React.FC<SelectSValueStringProps> = ({
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
                className= {className}
            />
        </div>
    );
}


export default SelectValueString;
