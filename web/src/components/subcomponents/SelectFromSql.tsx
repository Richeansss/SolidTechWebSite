import React from "react";
import Select from "react-select";

interface OptionType {
    value: string | number;
    label: string;
}

interface SelectFormSqlProps {
    id: string;
    options: OptionType[];
    value: OptionType | null;
    onChange: (value: OptionType | null) => void;
    placeholder: string;
    isOpen?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
}

const SelectFormSql: React.FC<SelectFormSqlProps> = ({ id, options, value, onChange, placeholder, isOpen, onMenuOpen, onMenuClose }) => {
    return (
        <div className="mb-4 mr-4">
            <label htmlFor={id} className="mr-2">{placeholder}:</label>
            <Select
                id={id}
                options={options}
                value={value}
                onChange={onChange}
                menuIsOpen={isOpen}
                onMenuOpen={onMenuOpen}
                onMenuClose={onMenuClose}
                placeholder={`Выберите или введите ${placeholder}`}
                className="w-full"
            />
        </div>
    );
};


export default SelectFormSql;
