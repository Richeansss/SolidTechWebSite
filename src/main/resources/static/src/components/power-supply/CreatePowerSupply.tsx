import React, { useState, useMemo } from "react";
import Select from "react-select";
import { PowerSupply } from "../../types/PowerSupply"; // Тип PowerSupply
import { useCreatePowerSupplyMutation } from "../../store/api/apiPowerSupply";
import { useGetBrandsQuery } from "../../store/api/apiBrand";
import "../case/CreateCase.css"; // Подключение CSS

const AddPowerSupplyComponent: React.FC = () => {
    const [newPowerSupply, setNewPowerSupply] = useState<Partial<PowerSupply>>({
        brand: { id: 0, name: "" },
        certificate: undefined,
        power: undefined,
        modular: undefined,
        name: "",
    });

    const [createPowerSupply, { isLoading, isSuccess, isError }] = useCreatePowerSupplyMutation();
    const { data: existingBrands } = useGetBrandsQuery();

    // Мемоизация списка брендов
    const brandOptions = useMemo(() =>
        existingBrands?.map((brand) => ({
            value: brand.id,
            label: brand.name,
        })), [existingBrands]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setNewPowerSupply((prevPowerSupply) => ({
            ...prevPowerSupply,
            [name]: value,
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

        if (!newPowerSupply.name || !newPowerSupply.brand || !newPowerSupply.certificate || !newPowerSupply.power || newPowerSupply.modular === undefined) {
            alert("Все поля обязательны для заполнения!");
            return;
        }

        try {
            await createPowerSupply(newPowerSupply).unwrap();
            alert("Блок питания успешно добавлен!");
            setNewPowerSupply({
                brand: { id: 1, name: "Corsair" },
                certificate: 80,
                power: 850,
                modular: true,
                name: "",
            });
        } catch (error) {
            console.error("Ошибка добавления блока питания:", error);
            alert("Произошла ошибка при добавлении блока питания.");
        }
    };

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
                        onChange={handleBrandChange}
                        placeholder="Выберите бренд"
                        required
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
                    <select
                        name="modular"
                        value={newPowerSupply.modular ? "true" : "false"}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="true">Да</option>
                        <option value="false">Нет</option>
                    </select>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Добавление..." : "Добавить блок питания"}
                </button>
            </form>
        </div>
    );
};

export default AddPowerSupplyComponent;
