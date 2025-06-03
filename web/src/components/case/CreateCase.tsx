import React, {useMemo, useState} from 'react';
import {useCreateCaseMutation, useUploadImageMutation} from '../../store/api/apiCase';
import {useGetBrandsQuery} from '../../store/api/apiBrand';
import {useGetLightTypesQuery} from '../../store/api/apiLighttype';
import {Case} from '../../types/Case';
import styles from './CreateCase.module.css';
import Select from "react-select";
import {LightType} from "../../types/LightType";
import LoadingButton from "../LoadingButton/LoadingButton.tsx";

const AddCaseComponent: React.FC = () => {
    const [newCase, setNewCase] = useState<Partial<Case>>({
        brand: {id: 0, name: ''},
        formFactor: undefined,
        amountFun: 0,
        name: '',
        lightType: {id: 0, name: ''},
        funConnector: 0,
        color: undefined,
        glassType: undefined,
        hasHub: false,
    });
    const [image, setImage] = useState<File | null>(null);
    const [uploadImage, {isLoading: isUploading}] = useUploadImageMutation();

    const [createCase, {isLoading,}] = useCreateCaseMutation();

    const [message, setMessage] = useState<string | null>(null);

    const {data: existingBrands} = useGetBrandsQuery();
    const {data: lightTypes} = useGetLightTypesQuery();

    const colorOptions = [
        {value: "BLACK", label: "Черный"},
        {value: "WHITE", label: "Белый"},
        {value: "RED", label: "Красный"},
        {value: "BLUE", label: "Синий"},
        {value: "GREEN", label: "Зеленый"},
        {value: "YELLOW", label: "Желтый"},
        {value: "ORANGE", label: "Оранжевый"},
        {value: "PURPLE", label: "Фиолетовый"},
        {value: "PINK", label: "Розовый"},
        {value: "GRAY", label: "Серый"},
        {value: "SILVER", label: "Серебристый"},
        {value: "GOLD", label: "Золотой"}
    ];

    const glassTypeOptions = [
        {value: "TEMPERED", label: "Закаленное"},
        {value: "ACRYLIC", label: "Акриловое"},
        {value: "NONE", label: "Отсутствует"}
    ];

    const formFactorOptions = [
        {value: "ATX", label: "ATX"},
        {value: "MICRO_ATX", label: "MICRO ATX"},
        {value: "MINI_ITX", label: "MINI ITX"},
        {value: "E_ATX", label: "E ATX"},
        {value: "XL_ATX", label: "XL ATX"},
        {value: "FLEX_ATX", label: "FLEX ATX"},
        {value: "MINI_STX", label: "MINI STX"},
        {value: "NANO_ITX", label: "NANO ITX"},
        {value: "PICO_ITX", label: "PICO ITX"},
        {value: "SSI_CEB", label: "SSI CEB"},
        {value: "SSI_EEB", label: "SSI EEB"},
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
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
            setNewCase((prevCase) => ({
                ...prevCase,
                lightType: {id: Number(value)},
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

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleBrandChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewCase((prevCase) => ({
                ...prevCase,
                brand: {id: selectedOption.value, name: selectedOption.label},
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newCase.lightType?.id) {
            setMessage('Не выбран тип подсветки.');
            return;
        }

        try {
            const createdCase = await createCase({
                ...newCase,
                lightType: {id: newCase.lightType.id, name: newCase.lightType.name},
            }).unwrap();

            if (image) {
                await uploadImage({id: createdCase.id, file: image}).unwrap();
            }

            setNewCase((prevState) => ({...prevState, name: ""}));
            setMessage('Корпус успешно добавлен!');
        } catch (err) {
            console.error('Error creating case:', err);
            setMessage('Произошла ошибка при создании корпуса.');
        }
    };

    const handleLightTypeChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewCase((prevCase) => ({
                ...prevCase,
                lightType: {id: selectedOption.value, name: selectedOption.label},
            }));
        }
    };

    const brandOptions = useMemo(() =>
        existingBrands?.map((brand) => ({
            value: brand.id,
            label: brand.name,
        })), [existingBrands]
    );

    const lightTypeOptions = useMemo(() =>
        lightTypes?.map((lightType: LightType) => ({
            value: lightType.id,
            label: lightType.name,
        })), [lightTypes]
    );

    const handleChange = (field: keyof Case, value: any) => {
        setNewCase(prev => ({...prev, [field]: value}));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Добавить корпус</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="name">Название</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={newCase.name || ''}
                    onChange={handleInputChange}
                    required
                />
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
                <label>Форм фактор</label>
                <Select options={formFactorOptions}
                        value={formFactorOptions.find(opt => opt.value === newCase.formFactor) || null}
                        onChange={opt => handleChange("formFactor", opt?.value)}
                        placeholder="Выберите форм фактор"/>
                <label htmlFor="amountFun">Количество вентиляторов</label>
                <input
                    id="amountFun"
                    type="number"
                    name="amountFun"
                    value={newCase.amountFun || ''}
                    onChange={handleInputChange}
                />
                <label htmlFor="lightType">Тип подсветки</label>
                <Select
                    options={lightTypeOptions}
                    value={
                        newCase.lightType
                            ? {value: newCase.lightType.id, label: newCase.lightType.name}
                            : null
                    }
                    onChange={handleLightTypeChange}
                    placeholder="Выберите тип подсветки"
                    isClearable
                    required
                />
                <label>Цвет</label>
                <Select options={colorOptions}
                        value={colorOptions.find(opt => opt.value === newCase.color) || null}
                        onChange={opt => handleChange("color", opt?.value)} placeholder="Выберите цвет"/>
                <label htmlFor="funConnector">Коннектор для вентиляторов</label>
                <input
                    id="funConnector"
                    type="number"
                    name="funConnector"
                    value={newCase.funConnector || ''}
                    onChange={handleInputChange}
                />
                <label>Тип стекла</label>
                <Select options={glassTypeOptions}
                        value={glassTypeOptions.find(opt => opt.value === newCase.glassType) || null}
                        onChange={opt => handleChange("glassType", opt?.value)}
                        placeholder="Выберите тип стекла"/>
                <div>
                    <label>Подсветка ARGB</label>
                    <input
                        type="checkbox"
                        name="has_argb"
                        checked={newCase.hasHub || false}
                        onChange={(e) => {
                            setNewCase((prev) => ({
                                ...prev,
                                hasHub: e.target.checked,
                            }));
                        }}
                        className={styles.checkboxStyled}
                    />
                </div>
                <label>Изображение</label>
                <div
                    className={styles.imageDropzone}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById('file-input')?.click()}
                >
                    <p>{image ? 'Изображение выбрано' : 'Перетащите изображение сюда или выберите файл'}</p>
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className={styles.imagePreview}
                        />
                    )}
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{display: 'none'}}
                    />
                </div>
                <LoadingButton
                    isLoading={isLoading || isUploading}
                    text="Добавить корпус"
                />
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddCaseComponent;
