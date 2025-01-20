import React, { useState, useMemo } from "react";
import Select from "react-select";
import { Cooler } from "../../types/Cooler";
import { useCreateCoolerMutation } from "../../store/api/apiCooler";
import { useGetBrandsQuery } from "../../store/api/apiBrand";
import { useGetLightTypesQuery } from "../../store/api/apiLighttype";
import "../case/CreateCase.css";
import {LightType} from "../../types/LightType";
import {useUploadImageMutation} from "../../store/api/apiCase"; // Подключение CSS

const AddCoolerComponent: React.FC = () => {
    const [newCooler, setNewCooler] = useState<Partial<Cooler>>({
        brand: { id: 0, name: "" },
        tdp: undefined,
        funConnector: undefined,
        name: "",
    });
    const [image, setImage] = useState<File | null>(null);
    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation(); // Мутация для загрузки изображения

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
        }
    };

    const [createCooler, { isLoading, isSuccess, isError }] = useCreateCoolerMutation();
    const { data: lightTypes, isLoading: isLoadingLightTypes } = useGetLightTypesQuery();
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

    const lightTypeOptions = useMemo(() =>
        lightTypes?.map((lightType: LightType) => ({
            value: lightType.id,
            label: lightType.name,
        })), [lightTypes]
    );

    const handleLightTypeChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewCooler((prevCooler) => ({
                ...prevCooler,
                lightType: { id: selectedOption.value, name: selectedOption.label },
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
            const createdCooler = await createCooler(newCooler).unwrap();

            if (image) {
                // @ts-ignore
                await uploadImage({ id: createdCooler.id, file: image }).unwrap();
            }

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
                        onChange={handleBrandChange}
                        placeholder="Выберите бренд"
                        required
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
                    <label htmlFor="lightType">Тип подсветки</label>
                    <Select
                        options={lightTypeOptions}
                        onChange={handleLightTypeChange}
                        placeholder="Выберите тип подсветки"
                        required
                    />
                </div>
                <div>
                    <label>Изображение</label>
                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                </div>
                <button className="button-primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Добавление..." : "Добавить кулер"}
                </button>
            </form>
        </div>
    );
};

export default AddCoolerComponent;
