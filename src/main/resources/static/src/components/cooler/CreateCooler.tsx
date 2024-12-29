import React, { useState, useMemo } from "react";
import Select from "react-select";
import { Cooler } from "../../types/Cooler";
import { useCreateCoolerMutation } from "../../store/api/apiCooler";
import { useSearchBrandsByNameQuery } from "../../store/api/apiBrand";
import { useGetLightTypesQuery } from "../../store/api/apiLighttype";
import "../case/CreateCase.css"; // Подключение CSS

const AddCoolerComponent: React.FC = () => {
    const [newCooler, setNewCooler] = useState<Partial<Cooler>>({
        brand: { id: 0, name: "" },
        tdp: undefined,
        funConnector: undefined,
        name: "",
    });

    const [createCooler, { isLoading, isSuccess, isError }] = useCreateCoolerMutation();
    const { data: lightTypes, isLoading: isLoadingLightTypes } = useGetLightTypesQuery();
    const { data: existingBrands, isLoading: isSearching, isError: isSearchError } = useSearchBrandsByNameQuery(newCooler.brand?.name || '', {
        skip: false, // Запрос всегда выполняется
    });

    // Мемоизация списка брендов
    const brandOptions = useMemo(() =>
        existingBrands?.map((brand) => ({
            value: brand.id,
            label: brand.name,
        })), [existingBrands]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "lightType") {
            const selectedLightType = lightTypes?.find((type) => type.id === Number(value));
            setNewCooler((prevCooler) => ({
                ...prevCooler,
                lightType: selectedLightType
                    ? { id: selectedLightType.id, name: selectedLightType.name }
                    : undefined,
            }));
        } else {
            setNewCooler((prevCooler) => ({
                ...prevCooler,
                [name]: value,
            }));
        }
    };

    const handleBrandChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewCooler((prevCooler) => ({
                ...prevCooler,
                brand: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newCooler.name || !newCooler.lightType) {
            alert("Название и тип подсветки обязательны!");
            return;
        }

        try {
            await createCooler(newCooler).unwrap();
            alert("Кулер успешно добавлен!");
            setNewCooler({
                brand: { id: 1, name: "Noctua" },
                tdp: 65,
                funConnector: 4,
                name: "",
            });
        } catch (error) {
            console.error("Ошибка добавления кулера:", error);
            alert("Произошла ошибка при добавлении кулера.");
        }
    };

    return (
        <div>
            <h2>Добавить кулер</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название</label>
                    <input
                        type="text"
                        name="name"
                        value={newCooler.name || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Бренд</label>
                    <Select
                        options={brandOptions}
                        isLoading={isSearching}
                        onChange={handleBrandChange}
                        placeholder="Выберите бренд"
                    />
                </div>
                <div>
                    <label>TDP</label>
                    <input
                        type="number"
                        name="tdp"
                        value={newCooler.tdp || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Разъемы вентиляторов</label>
                    <input
                        type="number"
                        name="funConnector"
                        value={newCooler.funConnector || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Тип подсветки</label>
                    <select
                        name="lightType"
                        value={newCooler.lightType?.id || ""}
                        onChange={handleInputChange}
                        disabled={isLoadingLightTypes}
                    >
                        <option value="" disabled>Выберите тип подсветки</option>
                        {/* Это по умолчанию будет выбранным элементом */}
                        {isLoadingLightTypes ? (
                            <option>Загрузка...</option>
                        ) : (
                            lightTypes?.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))
                        )}
                    </select>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Добавление..." : "Добавить кулер"}
                </button>
            </form>
        </div>
    );
};

export default AddCoolerComponent;
