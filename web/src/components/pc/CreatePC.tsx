import React, { useState } from "react";
import Select from "react-select";
import { useCreatePCMutation, useUploadImagesMutation } from "../../store/api/apiPC";
import { useGetPCComponentsByTypeQuery } from "../../store/api/apiPCComponent";
import { PCComponent } from "../../types/PCComponent";

const AddPCComponent: React.FC = () => {
    const [newPC, setNewPC] = useState({
        motherBoard: { id: 0 },
        processor: { id: 0 },
        ram: { id: 0 },
        cooler: { id: 0 },
        case_pc: { id: 0 },
        videocard: { id: 0 },
        storageDevice: { id: 0 },
        powerSupply: { id: 0 },
        price: 0,
        isForSale: false
    });

    const [images, setImages] = useState<File[]>([]);
    const [createPC, { isLoading, isSuccess, isError }] = useCreatePCMutation();
    const [uploadImages, { isLoading: isUploading }] = useUploadImagesMutation();

    const processors = useGetPCComponentsByTypeQuery("PROCESSOR");
    const videocards = useGetPCComponentsByTypeQuery("VIDEOCARD");
    const motherboards = useGetPCComponentsByTypeQuery("MOTHERBOARD");
    const rams = useGetPCComponentsByTypeQuery("RAM");
    const storages = useGetPCComponentsByTypeQuery("STORAGE_DEVICE");
    const coolers = useGetPCComponentsByTypeQuery("COOLER");
    const powerSupplies = useGetPCComponentsByTypeQuery("POWER_SUPPLY");
    const cases = useGetPCComponentsByTypeQuery("CASE");

    const handleSelectChange = (name: string, selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewPC((prev) => ({ ...prev, [name]: { id: selectedOption.value } }));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setNewPC((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : Number(value)
        }));
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImages((prev) => [...prev, ...newFiles]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const createdPC = await createPC(newPC).unwrap();

            for (const file of images) {
                await uploadImages({ id: createdPC.id, files: [file] }).unwrap();
            }

            alert("ПК успешно добавлен!");
            setNewPC({
                motherBoard: { id: 0 },
                processor: { id: 0 },
                ram: { id: 0 },
                cooler: { id: 0 },
                case_pc: { id: 0 },
                videocard: { id: 0 },
                storageDevice: { id: 0 },
                powerSupply: { id: 0 },
                price: 0,
                isForSale: false
            });
            setImages([]);
        } catch (error) {
            console.error("Ошибка при создании ПК:", error);
            alert("Ошибка при добавлении ПК");
        }
    };

    const renderSelect = (query: ReturnType<typeof useGetPCComponentsByTypeQuery>, field: string, label: string) => {
        const { data = [], isFetching } = query;
        const options = data.map((item: PCComponent) => ({
            value: item.id,
            label: item.details?.name || `ID: ${item.componentId}`
        }));
        return (
            <div className="form-group mb-4">
                <label><strong>{label}</strong></label>
                <Select
                    options={options}
                    isDisabled={isFetching}
                    placeholder={isFetching ? "Загрузка..." : `Выберите ${label.toLowerCase()}`}
                    onChange={(selected) => handleSelectChange(field, selected)}
                    isClearable
                />
            </div>
        );
    };

    return (
        <div>
            <h2>Добавить ПК</h2>
            <form onSubmit={handleSubmit}>
                {renderSelect(motherboards, "motherBoard", "Материнская плата")}
                {renderSelect(processors, "processor", "Процессор")}
                {renderSelect(rams, "ram", "Оперативная память")}
                {renderSelect(coolers, "cooler", "Кулер")}
                {renderSelect(videocards, "videocard", "Видеокарта")}
                {renderSelect(storages, "storageDevice", "Накопитель")}
                {renderSelect(powerSupplies, "powerSupply", "Блок питания")}
                {renderSelect(cases, "case_pc", "Корпус")}

                <div className="form-group">
                    <label><strong>Цена</strong></label>
                    <input
                        type="number"
                        name="price"
                        value={newPC.price}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="isForSale"
                            checked={newPC.isForSale}
                            onChange={handleInputChange}
                        />
                        Доступен для продажи
                    </label>
                </div>

                <div className="form-group">
                    <label><strong>Изображения</strong></label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImagesChange}
                    />
                </div>

                <button type="submit" disabled={isLoading || isUploading} className="button-primary">
                    {isLoading ? "Добавление..." : "Добавить ПК"}
                </button>

                {isSuccess && <p>ПК успешно добавлен!</p>}
                {isError && <p>Ошибка при добавлении ПК!</p>}
            </form>
        </div>
    );
};

export default AddPCComponent;