import React, { useState } from 'react';
import { useCreateCaseMutation } from '../../store/api/apiCase';
import { Case } from '../../types/Case';
import './CreateCase.css'; // Подключение CSS

const AddCaseComponent: React.FC = () => {
    const [newCase, setNewCase] = useState<Partial<Case>>({
        brand: { id: 1, name: 'Cooler Master' },
        formFactor: 2,
        amountFun: 3,
        name: '',
        lightType: 1,
        funConnector: 4,
        color: 5,
        glassType: 2,
    });

    const [createCase, { isLoading, isSuccess, isError, error }] = useCreateCaseMutation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCase((prevCase) => ({
            ...prevCase,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createCase(newCase).unwrap();
            setNewCase({
                brand: { id: 1, name: 'Cooler Master' },
                formFactor: 2,
                amountFun: 3,
                name: '',
                lightType: 1,
                funConnector: 4,
                color: 5,
                glassType: 2,
            });
        } catch (err) {
            console.error('Error creating case:', err);
        }
    };

    return (
        <div>
            <h2>Добавить корпус</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Название</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={newCase.name || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="formFactor">Форм-фактор</label>
                    <input
                        id="formFactor"
                        type="number"
                        name="formFactor"
                        value={newCase.formFactor || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="amountFun">Количество вентиляторов</label>
                    <input
                        id="amountFun"
                        type="number"
                        name="amountFun"
                        value={newCase.amountFun || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="lightType">Тип подсветки</label>
                    <input
                        id="lightType"
                        type="number"
                        name="lightType"
                        value={newCase.lightType || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="funConnector">Коннектор для вентиляторов</label>
                    <input
                        id="funConnector"
                        type="number"
                        name="funConnector"
                        value={newCase.funConnector || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="color">Цвет</label>
                    <input
                        id="color"
                        type="number"
                        name="color"
                        value={newCase.color || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="glassType">Тип стекла</label>
                    <input
                        id="glassType"
                        type="number"
                        name="glassType"
                        value={newCase.glassType || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="button-primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Загружается...' : 'Добавить корпус'}
                </button>
            </form>

            {isSuccess && <p>Корпус успешно добавлен!</p>}
            {isError && <p className="error">Ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}</p>}
        </div>
    );
};

export default AddCaseComponent;
