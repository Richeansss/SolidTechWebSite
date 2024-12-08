import React, { useState } from 'react';
import { useCreateCaseMutation } from '../../store/api/apiCase';

const CreateCase: React.FC = () => {
    const [createCase] = useCreateCaseMutation();
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            await createCase({ name });
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Добавить корпус</h2>
            <input
                type="text"
                placeholder="Название корпуса"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Добавить</button>
        </form>
    );
};

export default CreateCase;
