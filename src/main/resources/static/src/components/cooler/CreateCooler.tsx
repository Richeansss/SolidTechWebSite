import React, { useState } from "react";
import { Cooler } from "../../types/Cooler";
import { useCreateCoolerMutation } from "../../store/api/apiCooler";
import { useSearchBrandsByNameQuery } from "../../store/api/apiBrand";
import { useGetLightTypesQuery } from "../../store/api/apiLighttype";
import '../case/CreateCase.css'; // Подключение CSS


const AddCoolerComponent: React.FC = () => {
    const [newCooler, setNewCooler] = useState<Partial<Cooler>>({
        brand: { id: 1, name: "Noctua" },
        tdp: 65,
        funConnector: 4,
        name: "",
    });

    const [createCooler, { isLoading, isSuccess, isError }] = useCreateCoolerMutation();
    const { data: lightTypes, isLoading: isLoadingLightTypes } = useGetLightTypesQuery();
    const { data: existingBrands, isLoading: isSearching, isError: isSearchError } = useSearchBrandsByNameQuery(newCooler.brand?.name || '', {
        skip: !newCooler.brand?.name, // Не выполняем запрос, если имя бренда пустое
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'brand') {
            setNewCooler((prevCooler) => ({
                ...prevCooler,
                brand: {
                    ...prevCooler.brand,
                    name: value,
                    id: existingBrands?.find((brand) => brand.name === value)?.id ?? prevCooler.brand?.id ?? 0,
                },
            }));
        } else if (name === 'lightType') {
            const selectedLightType = lightTypes?.find((type) => type.id === Number(value));
            setNewCooler((prevCooler) => ({
                ...prevCooler,
                lightType: selectedLightType ? { id: selectedLightType.id, name: selectedLightType.name } : undefined,
            }));
        } else {
            setNewCooler((prevCooler) => ({
                ...prevCooler,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newCooler.name || !newCooler.lightType) {
            alert("Название и тип подсветки обязательны!");
            return;
        }

        await createCooler(newCooler).unwrap();
        alert("Кулер успешно добавлен!");
        setNewCooler({
            brand: { id: 1, name: "Noctua" },
            tdp: 65,
            funConnector: 4,
            name: "",
        });
    };

    const renderBrandSuggestions = () => {
        if (existingBrands) {
            return (
                <datalist id="brand-suggestions">
                    {existingBrands.map((brand) => (
                        <option key={brand.id} value={brand.name} />
                    ))}
                </datalist>
            );
        }
        return null;
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
                    <input
                        type="text"
                        name="brand"
                        value={newCooler.brand?.name || ""}
                        onChange={handleInputChange}
                        list="brand-suggestions"
                    />
                    {renderBrandSuggestions()}
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
