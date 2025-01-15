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
        vram: 0,
        typeOfVram: 0,
        memoryBus: 0,
        pci: 0,
        color: 0,
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
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
                        onChange={handleBrandChange}
                        placeholder="Выберите бренд"
                        required
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
