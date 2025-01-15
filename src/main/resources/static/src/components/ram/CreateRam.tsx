import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import { Ram, RamType } from "../../types/Ram"; // Импортируем интерфейсы
import { useCreateRamMutation } from "../../store/api/apiRam";
import { useGetBrandsQuery } from "../../store/api/apiBrand";
import { useGetLightTypesQuery } from "../../store/api/apiLighttype";
import "../case/CreateCase.css";
import {LightType} from "../../types/LightType";

const AddRamComponent: React.FC = () => {
    const [newRam, setNewRam] = useState<Partial<Ram>>({
        brand: { id: 0, name: "" },
        name: "",
        amountRam: 0,
        typeRam: RamType.DDR4, // Например, по умолчанию DDR4
        jdek: 0,
        timing: 0,
        lightType: undefined, // Пока нет выбора подсветки
    });

    const [createRam, { isLoading, isSuccess, isError }] = useCreateRamMutation();
    const { data: existingBrands } = useGetBrandsQuery();


    // Запрашиваем доступные типы подсветки
    const { data: lightTypes } = useGetLightTypesQuery();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newRam.name || !newRam.brand || !newRam.amountRam || !newRam.typeRam || !newRam.jdek || !newRam.timing || !newRam.lightType) {
            alert("Все поля обязательны для заполнения!");
            return;
        }

        try {
            await createRam(newRam).unwrap();
            alert("Оперативная память успешно добавлена!");
            setNewRam({
                brand: { id: 0, name: "" },
                name: "",
                amountRam: 0,
                typeRam: RamType.DDR4,
                jdek: 0,
                timing: 0,
                lightType: undefined,
            });
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
                        onChange={handleBrandChange}
                        placeholder="Выберите бренд"
                        required
                    />
                </div>
                <div>
                    <label>Тип RAM</label>
                    <select
                        name="typeRam"
                        value={newRam.typeRam || RamType.DDR4}
                        onChange={handleInputChange}
                        required
                    >
                        <option value={RamType.DDR3}>{RamType.DDR3}</option>
                        <option value={RamType.DDR4}>{RamType.DDR4}</option>
                        <option value={RamType.DDR5}>{RamType.DDR5}</option>
                    </select>
                </div>
                <div>
                    <label>Объем RAM (ГБ)</label>
                    <input
                        type="number"
                        name="amountRam"
                        value={newRam.amountRam || ""}
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
                        onChange={handleLightTypeChange}
                        placeholder="Выберите тип подсветки"
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Добавление..." : "Добавить оперативную память"}
                </button>
            </form>
        </div>
    );
};

export default AddRamComponent;
