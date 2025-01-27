import React, { useState, useMemo } from "react";
import Select from "react-select";
import { PowerSupply } from "../../types/PowerSupply"; // Тип PowerSupply
import { useCreatePowerSupplyMutation } from "../../store/api/apiPowerSupply";
import { useGetBrandsQuery } from "../../store/api/apiBrand";
import "../case/CreateCase.css";
import {useUploadImageMutation} from "../../store/api/apiPowerSupply"; // Подключение CSS

const AddPowerSupplyComponent: React.FC = () => {
    const [newPowerSupply, setNewPowerSupply] = useState<Partial<PowerSupply>>({
        brand: { id: 0, name: "" },
        certificate: undefined,
        power: undefined,
        modular: undefined,
        name: "",
    });
    const [image, setImage] = useState<File | null>(null);

    const [createPowerSupply, { isLoading, isSuccess, isError }] = useCreatePowerSupplyMutation();
    const { data: existingBrands } = useGetBrandsQuery();
    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation(); // Мутация для загрузки изображения

    // Мемоизация списка брендов
    const brandOptions = useMemo(() =>
        existingBrands?.map((brand) => ({
            value: brand.id,
            label: brand.name,
        })), [existingBrands]
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setNewPowerSupply((prevPowerSupply) => ({
            ...prevPowerSupply,
            [name]: name === "modular" ? value === "true" : value,
        }));
    };

    const handleBrandChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewPowerSupply((prevPowerSupply) => ({
                ...prevPowerSupply,
                brand: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newPowerSupply.name || !newPowerSupply.brand || !newPowerSupply.certificate || !newPowerSupply.power || newPowerSupply.modular === undefined ) {
            alert("Все поля обязательны для заполнения!");
            return;
        }

        try {
            const createdPowerSupply = await createPowerSupply(newPowerSupply).unwrap();

            if (image) {
                // @ts-ignore
                await uploadImage({ id: createdPowerSupply.id, file: image }).unwrap();
            }

            alert("Блок питания успешно добавлен!");
            setNewPowerSupply((prevState) => ({
                ...prevState,
                name: "",
            }));
        } catch (error) {
            console.error("Ошибка добавления блока питания:", error);
            alert("Произошла ошибка при добавлении блока питания.");
        }
    };

    const modularOptions = [
        { value: true, label: "Да" },
        { value: false, label: "Нет" },
    ];

    return (
        <div>
            <h2>Добавить блок питания</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название</label>
                    <input
                        type="text"
                        name="name"
                        value={newPowerSupply.name || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Бренд</label>
                    <Select
                        options={brandOptions}
                        value={newPowerSupply.brand ? {
                            value: newPowerSupply.brand.id,
                            label: newPowerSupply.brand.name
                        } : null}
                        onChange={handleBrandChange}
                        placeholder="Выберите бренд"
                        isClearable
                    />
                </div>
                <div>
                    <label>Сертификат</label>
                    <input
                        type="number"
                        name="certificate"
                        value={newPowerSupply.certificate || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Мощность (Вт)</label>
                    <input
                        type="number"
                        name="power"
                        value={newPowerSupply.power || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Модульный</label>
                    <Select
                        options={modularOptions} // Массив опций
                        value={modularOptions.find((option) => option.value === newPowerSupply.modular) || null} // Текущее значение
                        onChange={(selectedOption) =>
                            setNewPowerSupply((prev) => ({
                                ...prev,
                                modular: selectedOption ? selectedOption.value : undefined, // Обновление значения
                            }))
                        }
                        placeholder="Выберите модульность" // Плейсхолдер
                        isClearable // Возможность очистки выбора
                    />
                </div>
                <div>
                    <label>Изображение</label>
                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                </div>
                <button className="button-primary" type="submit" disabled={isLoading || isUploading}>
                    {isLoading ? "Добавление..." : "Добавить блок питания"}
                </button>
            </form>
        </div>
    );
};

export default AddPowerSupplyComponent;
