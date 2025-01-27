import React, {useMemo, useState} from 'react';
import { useCreateCaseMutation, useUploadImageMutation } from '../../store/api/apiCase';
import { useGetBrandsQuery } from '../../store/api/apiBrand';
import { useGetLightTypesQuery } from '../../store/api/apiLighttype';
import { Case } from '../../types/Case';
import './CreateCase.css';
import Select from "react-select";
import {LightType} from "../../types/LightType";

const AddCaseComponent: React.FC = () => {
    const [newCase, setNewCase] = useState<Partial<Case>>({
        brand: { id: 0, name: '' },
        formFactor: 0,
        amountFun: 0,
        name: '',
        lightType: { id: 0, name: '' }, // This should be an object, not just a number
        funConnector: 0,
        color: 0,
        glassType: 0,
    });
    const [image, setImage] = useState<File | null>(null);
    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation(); // Мутация для загрузки изображения

    const [createCase, { isLoading, isSuccess, isError, error }] = useCreateCaseMutation();

    const [message, setMessage] = useState<string | null>(null);

    // Поиск брендов по имени
    const { data: existingBrands } = useGetBrandsQuery();
    const { data: lightTypes, isLoading: isLoadingLightTypes } = useGetLightTypesQuery();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'brand') {
            setNewCase((prevCase) => ({
                ...prevCase,
                brand: {
                    ...prevCase.brand,
                    name: value,
                    id: existingBrands?.find((brand) => brand.name === value)?.id || prevCase.brand?.id,
                },
            }));
        } else if (name === 'lightType') {
            // Теперь сохраняем только ID
            setNewCase((prevCase) => ({
                ...prevCase,
                lightType: { id: Number(value) }, // передаем объект с id
            }));
        } else {
            setNewCase((prevCase) => ({
                ...prevCase,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка на существование lightType перед отправкой
        if (!newCase.lightType?.id) {
            setMessage('Не выбран тип подсветки.');
            return;
        }

        try {
            const createdCase = await createCase({
                ...newCase,
                lightType: { id: newCase.lightType.id, name: newCase.lightType.name }, // передаем объект с id
                }).unwrap();

            if (image) {
                // @ts-ignore
                await uploadImage({ id: createdCase.id, file: image }).unwrap();
            }

            // Сбрасываем форму после успешного создания корпуса
            setNewCase((prevState) => ({
                ...prevState,
                name: "",
            }));

            setMessage('Корпус успешно добавлен!');
        } catch (err) {
            console.error('Error creating case:', err);
            setMessage('Произошла ошибка при создании корпуса.');
        }
    };

    const brandOptions = useMemo(() =>
        existingBrands?.map((brand) => ({
            value: brand.id,
            label: brand.name,
        })), [existingBrands]
    );

    const handleBrandChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewCase((prevCase) => ({
                ...prevCase,
                brand: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const lightTypeOptions = useMemo(() =>
        lightTypes?.map((lightType: LightType) => ({
            value: lightType.id,
            label: lightType.name,
        })), [lightTypes]
    );

    const handleLightTypeChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewCase((prevCase) => ({
                ...prevCase,
                lightType: { id: selectedOption.value, name: selectedOption.label },
            }));
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
                    <label>Бренд</label>
                    <Select
                        options={brandOptions}
                        value={newCase.brand ? {
                            value: newCase.brand.id,
                            label: newCase.brand.name
                        } : null}
                        onChange={handleBrandChange}
                        placeholder="Выберите бренд"
                        isClearable
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
                    <Select
                        options={lightTypeOptions}
                        value={
                            newCase.lightType
                                ? { value: newCase.lightType.id, label: newCase.lightType.name }
                                : null
                        } // Связываем значение с состоянием
                        onChange={handleLightTypeChange}
                        placeholder="Выберите тип подсветки"
                        isClearable
                        required
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
                <div>
                    <label>Изображение</label>
                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                </div>
                <button className="button-primary" type="submit" disabled={isLoading || isUploading}>
                    {isLoading ? 'Загружается...' : 'Добавить корпус'}
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default AddCaseComponent;