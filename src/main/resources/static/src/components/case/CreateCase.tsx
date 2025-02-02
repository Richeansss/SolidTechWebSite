import React, {useMemo, useState} from 'react';
import { useCreateCaseMutation, useUploadImageMutation } from '../../store/api/apiCase';
import { useGetBrandsQuery } from '../../store/api/apiBrand';
import { useGetLightTypesQuery } from '../../store/api/apiLighttype';
import { Case } from '../../types/Case';
import './CreateCase.css';
import Select from "react-select";
import {LightType} from "../../types/LightType";
import {Videocard} from "../../types/VideoCard";

const AddCaseComponent: React.FC = () => {
    const [newCase, setNewCase] = useState<Partial<Case>>({
        brand: { id: 0, name: '' },
        formFactor: undefined,
        amountFun: 0,
        name: '',
        lightType: { id: 0, name: '' }, // This should be an object, not just a number
        funConnector: 0,
        color: undefined,
        glassType: undefined,
    });
    const [image, setImage] = useState<File | null>(null);
    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation(); // Мутация для загрузки изображения

    const [createCase, { isLoading, isSuccess, isError, error }] = useCreateCaseMutation();

    const [message, setMessage] = useState<string | null>(null);

    // Поиск брендов по имени
    const { data: existingBrands } = useGetBrandsQuery();
    const { data: lightTypes, isLoading: isLoadingLightTypes } = useGetLightTypesQuery();


    const colorOptions = [
        { value: "BLACK", label: "Черный" },
        { value: "WHITE", label: "Белый" },
        { value: "RED", label: "Красный" },
        { value: "BLUE", label: "Синий" },
        { value: "GREEN", label: "Зеленый" },
        { value: "YELLOW", label: "Желтый" },
        { value: "ORANGE", label: "Оранжевый" },
        { value: "PURPLE", label: "Фиолетовый" },
        { value: "PINK", label: "Розовый" },
        { value: "GRAY", label: "Серый" },
        { value: "SILVER", label: "Серебристый" },
        { value: "GOLD", label: "Золотой" }
    ];

    const glassTypeOptions = [
        { value: "TEMPERED", label: "Закаленное" },
        { value: "ACRYLIC", label: "Акриловое" },
        { value: "NONE", label: "Отсутствует" }
    ];


    const formFactorOptions = [
        { value: "ATX", label: "ATX" },
        { value: "MICRO_ATX", label: "MICRO ATX" },
        { value: "MINI_ITX", label: "MINI ITX" },
        { value: "E_ATX", label: "E ATX" },
        { value: "XL_ATX", label: "XL ATX" },
        { value: "FLEX_ATX", label: "FLEX ATX" },
        { value: "MINI_STX", label: "MINI STX" },
        { value: "NANO_ITX", label: "NANO ITX" },
        { value: "PICO_ITX", label: "PICO ITX" },
        { value: "SSI_CEB", label: "SSI CEB" },
        { value: "SSI_EEB", label: "SSI EEB" },
    ];

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

    const handleChange = (field: keyof Case, value: any) => {
        setNewCase(prev => ({ ...prev, [field]: value }));
    };

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
                    <div>
                        <label>Форм фактор</label>
                        <Select options={formFactorOptions}
                                value={formFactorOptions.find(opt => opt.value === newCase.formFactor) || null}
                                onChange={opt => handleChange("formFactor", opt?.value)} placeholder="Выберите форм фактор"/>
                    </div>
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
                    <div>
                        <div>
                            <label>Цвет</label>
                            <Select options={colorOptions}
                                    value={colorOptions.find(opt => opt.value === newCase.color) || null}
                                    onChange={opt => handleChange("color", opt?.value)} placeholder="Выберите цвет"/>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Тип стекла</label>
                        <Select options={glassTypeOptions}
                                value={glassTypeOptions.find(opt => opt.value === newCase.glassType) || null}
                                onChange={opt => handleChange("glassType", opt?.value)} placeholder="Выберите цвет"/>
                    </div>
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