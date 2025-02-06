import React, { useState, useMemo } from "react";
import Select from "react-select";
import { Ram, RamType } from "../../types/Ram"; // Импортируем интерфейсы
import {useCreateRamMutation, useUploadImageMutation} from "../../store/api/apiRam";
import { useGetBrandsQuery } from "../../store/api/apiBrand";
import { useGetLightTypesQuery } from "../../store/api/apiLighttype";
import "../case/CreateCase.css";
import { LightType } from "../../types/LightType";


const AddRamComponent: React.FC = () => {
    const [newRam, setNewRam] = useState<Partial<Ram>>({
        brand: { id: 0, name: "" },
        name: "",
        amountRam: 0,
        moduleCapacity: 0,
        typeRam: RamType.DDR4, // Например, по умолчанию DDR4
        jdek: 0,
        timing: 0,
        lightType: undefined, // Пока нет выбора подсветки
    });

    const [image, setImage] = useState<File | null>(null);

    const [createRam, { isLoading, isSuccess, isError }] = useCreateRamMutation();
    const { data: existingBrands } = useGetBrandsQuery();
    const { data: lightTypes } = useGetLightTypesQuery();
    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation(); // Мутация для загрузки изображения


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

    const ramTypeOptions = [
        { value: RamType.DDR3, label: RamType.DDR3 },
        { value: RamType.DDR4, label: RamType.DDR4 },
        { value: RamType.DDR5, label: RamType.DDR5 }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setNewRam((prevRam) => ({
            ...prevRam,
            [name]: value,
        }));
    };

    const handleBrandChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewRam((prevRam) => ({
                ...prevRam,
                brand: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const handleLightTypeChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewRam((prevRam) => ({
                ...prevRam,
                lightType: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const handleRamTypeChange = (selectedOption: { value: RamType; label: string } | null) => {
        if (selectedOption) {
            setNewRam((prevRam) => ({
                ...prevRam,
                typeRam: selectedOption.value,
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

        if (!newRam.name || !newRam.brand || !newRam.amountRam || !newRam.typeRam || !newRam.jdek || !newRam.timing || !newRam.lightType) {
            alert("Все поля обязательны для заполнения!");
            return;
        }

        try {
            const createdRam = await createRam(newRam).unwrap();

            if (image) {
                // @ts-ignore
                await uploadImage({ id: createdRam.id, file: image }).unwrap();
            }

            alert("Оперативная память успешно добавлена!");
            setNewRam((prevState) => ({
                ...prevState,
                name: "",
            }));
        } catch (error) {
            console.error("Ошибка добавления оперативной памяти:", error);
            alert("Произошла ошибка при добавлении оперативной памяти.");
        }
    };

    return (
        <div>
            <h2>Добавить оперативную память</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название</label>
                    <input
                        type="text"
                        name="name"
                        value={newRam.name || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Бренд</label>
                    <Select
                        options={brandOptions}
                        value={newRam.brand ? {
                            value: newRam.brand.id,
                            label: newRam.brand.name
                        } : null}
                        onChange={handleBrandChange}
                        placeholder="Выберите бренд"
                        isClearable
                    />
                </div>
                <div>
                    <label>Тип RAM</label>
                    <Select
                        name="typeRam"
                        options={ramTypeOptions}
                        value={ramTypeOptions.find(option => option.value === newRam.typeRam) || null}
                        onChange={handleRamTypeChange}
                        placeholder="Выберите тип RAM"
                        required
                    />
                </div>
                <div>
                    <label>Кол-во модулей</label>
                    <input
                        type="number"
                        name="amountRam"
                        value={newRam.amountRam || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Объем одного модуля (ГБ)</label>
                    <input
                        type="number"
                        name="amountRam"
                        value={newRam.moduleCapacity || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Частота (MHz)</label>
                    <input
                        type="number"
                        name="jdek"
                        value={newRam.jdek || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Тайминги</label>
                    <input
                        type="number"
                        name="timing"
                        value={newRam.timing || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Тип подсветки</label>
                    <Select
                        options={lightTypeOptions}
                        value={
                            newRam.lightType
                                ? {value: newRam.lightType.id, label: newRam.lightType.name}
                                : null
                        } // Связываем значение с состоянием
                        onChange={handleLightTypeChange}
                        placeholder="Выберите тип подсветки"
                        isClearable
                        required
                    />
                </div>
                <div>
                    <label>Изображение</label>
                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                </div>
                <div>
                    <button className="button-primary" type="submit" disabled={isLoading || isUploading}>
                        {isLoading ? "Добавление..." : "Добавить оперативную память"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRamComponent;
