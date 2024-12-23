import React, { useState, useEffect } from 'react';
import { useCreateLightTypeMutation, useSearchLightTypeByNameQuery } from '../../store/api/apiLighttype';
import { LightType } from '../../types/LightType';
import '../case/CreateCase.css';

const AddLightTypeComponent: React.FC = () => {
    const [newLightType, setNewLightType] = useState<Partial<LightType>>({
        name: '',
    });

    const [createLightType, { isLoading, isSuccess, isError, error }] = useCreateLightTypeMutation();
    const [message, setMessage] = useState<string | null>(null);

    const { data: existingLightTypes, isLoading: isSearching, isError: isSearchError } = useSearchLightTypeByNameQuery(newLightType.name || '', {
        skip: !newLightType.name,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewLightType((prevLightType) => ({
            ...prevLightType,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createLightType(newLightType).unwrap();
            setNewLightType({ name: '' });
            setMessage('Тип освещения успешно добавлен!');
        } catch (err) {
            handleError(err);
        }
    };

    const handleError = (error: any) => {
        console.log(error);
        if (error?.data?.response?.code) {
            const { response } = error.data;
            const errorCode = response.code;
            const errorDescription = response.description;
            setMessage(
                `Произошла ошибка при создании типа освещения. Код ошибки: ${errorCode || 'Неизвестный код'}, Описание: ${errorDescription || 'Неизвестное описание ошибки'}`
            );
        } else {
            setMessage('Произошла ошибка при создании типа освещения. Попробуйте еще раз.');
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setMessage('Тип освещения успешно добавлен!');
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

    const renderSuggestions = () => {
        if (isSearching) {
            return <p>Поиск типов освещения...</p>;
        }

        if (isSearchError) {
            console.error('Ошибка при поиске типов освещения:', existingLightTypes);
            return;
        }

        const filteredLightTypes = existingLightTypes?.filter((lightType) =>
            lightType.name.toLowerCase().includes(newLightType.name?.toLowerCase() || '')
        );

        if (filteredLightTypes && filteredLightTypes.length > 0) {
            return (
                <datalist id="lighttype-suggestions">
                    {filteredLightTypes.map((lightType) => (
                        <option key={lightType.id} value={lightType.name} />
                    ))}
                </datalist>
            );
        }
        return null;
    };

    return (
        <div>
            <h2>Добавить тип освещения</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Название</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={newLightType.name || ''}
                        onChange={handleInputChange}
                        required
                        list="lighttype-suggestions"
                    />
                    {newLightType.name && renderSuggestions()}
                </div>
                <button className="button-primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Загружается...' : 'Добавить тип освещения'}
                </button>
            </form>

            {renderMessage()}
        </div>
    );
};

export default AddLightTypeComponent;
