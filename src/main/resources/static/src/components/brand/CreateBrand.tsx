import React, { useState, useEffect } from 'react';
import { useCreateBrandMutation, useSearchBrandsByNameQuery } from '../../store/api/apiBrand';
import { Brand } from '../../types/Brand';
import '../case/CreateCase.css';

const AddBrandComponent: React.FC = () => {
    const [newBrand, setNewBrand] = useState<Partial<Brand>>({
        name: '',
    });

    const [createBrand, { isLoading, isSuccess, isError, error }] = useCreateBrandMutation();
    const [message, setMessage] = useState<string | null>(null);

    // Используем правильную типизацию для данных, возвращаемых запросом
    const { data: existingBrands, isLoading: isSearching, isError: isSearchError } = useSearchBrandsByNameQuery(newBrand.name || '', {
        skip: !newBrand.name, // Не выполняем запрос, если имя пустое
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBrand((prevBrand) => ({
            ...prevBrand,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createBrand(newBrand).unwrap();
            setNewBrand({ name: '' });
            setMessage('Бренд успешно добавлен!');
        } catch (err) {
            handleError(err);
        }
    };

    const handleError = (error: any) => {
        console.log(error); // Проверяем содержимое ошибки
        if (error?.data?.response?.code) {
            // Извлекаем ошибку из вложенной структуры
            const { response } = error.data;
            const errorCode = response.code;
            const errorDescription = response.description;
            setMessage(
                `Произошла ошибка при создании бренда. Код ошибки: ${errorCode || 'Неизвестный код'}, Описание: ${errorDescription || 'Неизвестное описание ошибки'}`
            );
        } else {
            // Общая ошибка, если структура не соответствует ожиданиям
            setMessage('Произошла ошибка при создании бренда. Попробуйте еще раз.');
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setMessage('Бренд успешно добавлен!');
        } else if (isError && error) {
            handleError(error);
        }
    }, [isSuccess, isError, error]);

    const renderMessage = () => {
        if (message) {
            return <p className="message">{message}</p>;
        }
        return null;
    };

    // Фильтрация брендов, чтобы отобразить только те, что содержат введенный текст
    const renderSuggestions = () => {
        if (isSearching) {
            return <p>Поиск брендов...</p>;
        }

        if (isSearchError) {
            console.error('Ошибка при поиске брендов:', existingBrands);
            return;
        }

        // Фильтруем бренды по введенному имени
        const filteredBrands = existingBrands?.filter((brand) =>
            brand.name.toLowerCase().includes(newBrand.name?.toLowerCase() || '')
        );

        if (filteredBrands && filteredBrands.length > 0) {
            return (
                <datalist id="brand-suggestions">
                    {filteredBrands.map((brand) => (
                        <option key={brand.id} value={brand.name} />
                    ))}
                </datalist>
            );
        }
        return null;
    };

    return (
        <div>
            <h2>Добавить бренд</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Название</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={newBrand.name || ''}
                        onChange={handleInputChange}
                        required
                        list="brand-suggestions" // связываем input с datalist
                    />
                    {newBrand.name && renderSuggestions()}
                </div>
                <button className="button-primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Загружается...' : 'Добавить бренд'}
                </button>
            </form>

            {renderMessage()}
        </div>
    );
};

export default AddBrandComponent;
