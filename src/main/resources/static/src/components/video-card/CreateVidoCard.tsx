import React, { useState, useMemo } from "react";
import Select from "react-select";
import { Videocard } from "../../types/VideoCard"; // Импортируем интерфейсы
import { useCreateVideocardMutation } from "../../store/api/apiVideoCard";
import { useSearchBrandsByNameQuery } from "../../store/api/apiBrand";
import { useGetLightTypesQuery } from "../../store/api/apiLighttype";
import { LightType } from "../../types/LightType";

const AddVideocardComponent: React.FC = () => {
    const [newVideocard, setNewVideocard] = useState<Partial<Videocard>>({
        brand: { id: 0, name: "" },
        name: "",
        vram: 0,
        typeOfVram: 0,
        memoryBus: 0,
        pci: 0,
        color: 0,
        lightType: undefined,
    });

    const [createVideocard, { isLoading, isSuccess, isError }] = useCreateVideocardMutation();
    const { data: existingBrands, isLoading: isSearching } = useSearchBrandsByNameQuery(newVideocard.brand?.name || "", {
        skip: false,
    });
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

        setNewVideocard((prevVideocard) => ({
            ...prevVideocard,
            [name]: value,
        }));
    };

    const handleBrandChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewVideocard((prevVideocard) => ({
                ...prevVideocard,
                brand: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const handleLightTypeChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewVideocard((prevVideocard) => ({
                ...prevVideocard,
                lightType: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !newVideocard.name ||
            !newVideocard.brand ||
            !newVideocard.vram ||
            !newVideocard.typeOfVram ||
            !newVideocard.memoryBus ||
            !newVideocard.pci ||
            !newVideocard.color ||
            !newVideocard.lightType
        ) {
            alert("Все поля обязательны для заполнения!");
            return;
        }

        try {
            await createVideocard(newVideocard).unwrap();
            alert("Видеокарта успешно добавлена!");
            setNewVideocard({
                brand: { id: 0, name: "" },
                name: "",
                vram: 0,
                typeOfVram: 0,
                memoryBus: 0,
                pci: 0,
                color: 0,
                lightType: undefined,
            });
        } catch (error) {
            console.error("Ошибка добавления видеокарты:", error);
            alert("Произошла ошибка при добавлении видеокарты.");
        }
    };

    return (
        <div>
            <h2>Добавить видеокарту</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название</label>
                    <input
                        type="text"
                        name="name"
                        value={newVideocard.name || ""}
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
                    <label>Тип VRAM</label>
                    <input
                        type="number"
                        name="typeOfVram"
                        value={newVideocard.typeOfVram || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>VRAM (ГБ)</label>
                    <input
                        type="number"
                        name="vram"
                        value={newVideocard.vram || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Ширина шины памяти (бит)</label>
                    <input
                        type="number"
                        name="memoryBus"
                        value={newVideocard.memoryBus || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Версия PCI</label>
                    <input
                        type="number"
                        name="pci"
                        value={newVideocard.pci || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Цвет</label>
                    <input
                        type="number"
                        name="color"
                        value={newVideocard.color || ""}
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
                    {isLoading ? "Добавление..." : "Добавить видеокарту"}
                </button>
            </form>
        </div>
    );
};

export default AddVideocardComponent;
