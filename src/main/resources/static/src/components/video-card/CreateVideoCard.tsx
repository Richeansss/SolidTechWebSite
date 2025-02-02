import React, { useState, useMemo } from "react";
import Select from "react-select";
import { Videocard } from "../../types/VideoCard"; // Импортируем интерфейсы
import { useCreateVideocardMutation } from "../../store/api/apiVideoCard";
import { useUploadImageMutation } from "../../store/api/apiVideoCard"; // Импортируем мутацию загрузки изображения
import { useGetBrandsQuery } from "../../store/api/apiBrand";
import { useGetLightTypesQuery } from "../../store/api/apiLighttype";
import { LightType } from "../../types/LightType";

const AddVideocardComponent: React.FC = () => {
    const [newVideocard, setNewVideocard] = useState<Partial<Videocard>>({
        brand: { id: 0, name: "" },
        name: "",
        graphicsClock: 0,
        boostClock: 0,
        vram: 0,
        typeOfVram: "",
        memoryBus: 0,
        pci: 0,
        color: undefined,
        lightType: undefined,
    });

    // Стейт для загрузки изображения
    const [image, setImage] = useState<File | null>(null);

    const [createVideocard, { isLoading, isSuccess, isError }] = useCreateVideocardMutation();
    const { data: existingBrands } = useGetBrandsQuery();
    const { data: lightTypes } = useGetLightTypesQuery();
    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation(); // Мутация для загрузки изображения

    const brandOptions = useMemo(() =>
        existingBrands?.map((brand) => ({
            value: brand.id,
            label: brand.name,
        })), [existingBrands]
    );

    const typeOfVramOptions = useMemo(() => [
        { value: "GDDR1", label: "GDDR1" },
        { value: "GDDR2", label: "GDDR2" },
        { value: "GDDR3", label: "GDDR3" },
        { value: "GDDR4", label: "GDDR4" },
        { value: "GDDR5", label: "GDDR5" },
        { value: "GDDR5X", label: "GDDR5X" },
        { value: "GDDR6", label: "GDDR6" },
        { value: "GDDR6X", label: "GDDR6X" },
        { value: "GDDR7", label: "GDDR7" },
        { value: "GDDR7X", label: "GDDR7X" },
        { value: "LPDDR4", label: "LPDDR4" },
        { value: "LPDDR5", label: "LPDDR5" },
        { value: "LPDDR5X", label: "LPDDR5X" }
    ], []);

    const handleTypeOfVramChange = (selectedOption: { value: string; label: string } | null) => {
        if (selectedOption) {
            setNewVideocard((prevVideocard) => ({
                ...prevVideocard,
                typeOfVram: selectedOption.value as Videocard["typeOfVram"],
            }));
        }
    };

    const lightTypeOptions = useMemo(() =>
        lightTypes?.map((lightType: LightType) => ({
            value: lightType.id,
            label: lightType.name,
        })), [lightTypes]
    );

    const pciOptions = [
        { value: 3.0, label: "PCIe 3.0" },
        { value: 4.0, label: "PCIe 4.0" },
        { value: 5.0, label: "PCIe 5.0" },
        { value: 2.0, label: "PCIe 2.0" },
        { value: 1.0, label: "PCIe 1.0" }
    ];

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
        }
    };

    const handleChange = (field: keyof Videocard, value: any) => {
        setNewVideocard(prev => ({ ...prev, [field]: value }));
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
            // Создаем видеокарту
            const createdVideocard = await createVideocard(newVideocard).unwrap();

            // Если изображение выбрано, загружаем его
            if (image) {
                // @ts-ignore
                await uploadImage({ id: createdVideocard.id, file: image }).unwrap();
            }

            // Общее уведомление
            alert("Видеокарта успешно добавлена и изображение загружено!");

            // Сброс формы
            setNewVideocard((prevState) => ({
                ...prevState,
                name: "",
            }));

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
                        value={newVideocard.brand ? {
                            value: newVideocard.brand.id,
                            label: newVideocard.brand.name
                        } : null}
                        onChange={handleBrandChange}
                        placeholder="Выберите бренд"
                        isClearable
                    />
                </div>
                <div>
                    <label>Частота графического процессора (МГц)</label>
                    <input
                        type="number"
                        name="graphicsClock"
                        value={newVideocard.graphicsClock || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Тактовая частота с ускорением(MHz)</label>
                    <input
                        type="number"
                        name="boostClock"
                        value={newVideocard.boostClock || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Тип VRAM</label>
                    <Select
                        options={typeOfVramOptions}
                        value={typeOfVramOptions.find(option => option.value === newVideocard.typeOfVram) || null}
                        onChange={handleTypeOfVramChange}
                        placeholder="Выберите тип VRAM"
                        isClearable
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
                    <Select options={pciOptions} value={pciOptions.find(opt => opt.value === newVideocard.pci) || null}
                            onChange={opt => handleChange("pci", opt?.value)} placeholder="Выберите версию PCI"/>
                </div>
                <div>
                    <div>
                        <label>Цвет</label>
                        <Select options={colorOptions}
                                value={colorOptions.find(opt => opt.value === newVideocard.color) || null}
                                onChange={opt => handleChange("color", opt?.value)} placeholder="Выберите цвет"/>
                    </div>
                </div>
                <div>
                    <label>Тип подсветки</label>
                    <Select
                        options={lightTypeOptions}
                        value={
                            newVideocard.lightType
                                ? {value: newVideocard.lightType.id, label: newVideocard.lightType.name}
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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button className="button-primary" type="submit" disabled={isLoading}>
                    {isLoading || isUploading ? "Добавление..." : "Добавить видеокарту"}
                </button>
            </form>
        </div>
    );
};

export default AddVideocardComponent;
