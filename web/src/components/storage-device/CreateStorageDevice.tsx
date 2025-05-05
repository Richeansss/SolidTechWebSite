import React, { useState, useMemo } from "react";
import Select from "react-select";
import {FormFactor, InterfaceType, StorageDevice, StorageType} from "../../types/StorageDevice"; // Тип StorageDevice
import {useCreateStorageDeviceMutation, useUploadImageMutation} from "../../store/api/apiStorageDevice";
import { useGetBrandsQuery } from "../../store/api/apiBrand";
import "../case/CreateCase.css"; // Подключение CSS

const AddStorageDeviceComponent: React.FC = () => {
    const [newStorageDevice, setNewStorageDevice] = useState<Partial<StorageDevice>>({
        brand: { id: 0, name: "" },
        name: "",
        type: StorageType.SSD,
        capacityGb: 0,
        formFactor: FormFactor.M_2,
        interfaceType: InterfaceType.PCIE_3_0,
        readSpeedMbps: 0,
        writeSpeedMbps: 0,
    });

    const [image, setImage] = useState<File | null>(null);


    const storageTypeOptions = useMemo(
        () => [
            { value: StorageType.HDD, label: "HDD" },
            { value: StorageType.SSD, label: "SSD" },
        ],
        []
    );

    const interfaceTypeOptions = useMemo(
        () => [
            { value: InterfaceType.SATA, label: "SATA" },
            { value: InterfaceType.USB, label: "USB" },
            { value: InterfaceType.SATA_III, label: "SATA III" },
            { value: InterfaceType.PCIE_4_0, label: "PCIe 4.0" },
            { value: InterfaceType.PCIE_3_0, label: "PCIe 3.0" },
        ],
        []
    );

    const handleInterfaceTypeChange = (selectedOption: { value: InterfaceType; label: string } | null) => {
        setNewStorageDevice((prevDevice) => ({
            ...prevDevice,
            interfaceType: selectedOption ? selectedOption.value : InterfaceType.SATA_III, // Значение по умолчанию
        }));
    };

    const handleTypeChange = (selectedOption: { value: StorageType; label: string } | null) => {
        setNewStorageDevice((prevDevice) => ({
            ...prevDevice,
            type: selectedOption ? selectedOption.value : StorageType.SSD, // Значение по умолчанию
        }));
    };

    const formFactorOptions = useMemo(
        () => [
            { value: FormFactor.PCIE_CARD, label: "PCIe Card" },
            { value: FormFactor.FORM_2_5, label: "2.5\" Form" },
            { value: FormFactor.FORM_3_5, label: "3.5\" Form" },
            { value: FormFactor.M_2, label: "M.2" },
        ],
        []
    );

    const handleFormFactorChange = (selectedOption: { value: FormFactor; label: string } | null) => {
        setNewStorageDevice((prevDevice) => ({
            ...prevDevice,
            formFactor: selectedOption ? selectedOption.value : FormFactor.PCIE_CARD, // Значение по умолчанию
        }));
    };

    const [createStorageDevice, { isLoading, isSuccess, isError }] = useCreateStorageDeviceMutation();
    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation(); // Мутация для загрузки изображения
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

        setNewStorageDevice((prevStorageDevice) => ({
            ...prevStorageDevice,
            [name]: value,
        }));
    };


    const handleBrandChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewStorageDevice((prevStorageDevice) => ({
                ...prevStorageDevice,
                brand: { id: selectedOption.value, name: selectedOption.label },
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

        if (!newStorageDevice.name || !newStorageDevice.brand || !newStorageDevice.type || !newStorageDevice.capacityGb || !newStorageDevice.formFactor || !newStorageDevice.interfaceType || !newStorageDevice.readSpeedMbps || !newStorageDevice.writeSpeedMbps) {
            alert("Все поля обязательны для заполнения!");
            return;
        }

        try {
            const createdStorageDevice = await createStorageDevice(newStorageDevice).unwrap();

            // Если изображение выбрано, загружаем его
            if (image) {
                // @ts-ignore
                await uploadImage({ id: createdStorageDevice.id, file: image }).unwrap();
            }

            alert("Накопитель успешно добавлен!");
            setNewStorageDevice((prevState) => ({
                ...prevState,
                name: "",
            }));
        } catch (error) {
            console.error("Ошибка добавления накопителя:", error);
            alert("Произошла ошибка при добавлении накопителя.");
        }
    };

    return (
        <div>
            <h2>Добавить накопитель</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название</label>
                    <input
                        type="text"
                        name="name"
                        value={newStorageDevice.name || ""}
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
                    <label>Тип</label>
                    <Select
                        options={storageTypeOptions}
                        value={storageTypeOptions.find((option) => option.value === newStorageDevice.type)}
                        onChange={handleTypeChange}
                        placeholder="Выберите тип"
                        isClearable={false} // Запрещаем очищать выбор
                    />
                </div>
                <div>
                    <label>Емкость (ГБ)</label>
                    <input
                        type="number"
                        name="capacityGb"
                        value={newStorageDevice.capacityGb || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Форм-фактор</label>
                    <Select
                        options={formFactorOptions}
                        value={formFactorOptions.find((option) => option.value === newStorageDevice.formFactor)}
                        onChange={handleFormFactorChange}
                        placeholder="Выберите форм-фактор"
                        isClearable={false} // Запрещаем очищать выбор
                    />
                </div>
                <div>
                    <label>Тип интерфейса</label>
                    <Select
                        options={interfaceTypeOptions}
                        value={interfaceTypeOptions.find((option) => option.value === newStorageDevice.interfaceType)}
                        onChange={handleInterfaceTypeChange}
                        placeholder="Выберите тип интерфейса"
                        isClearable={false} // Запрещаем очищать выбор
                    />
                </div>
                <div>
                    <label>Скорость чтения (МБ/с)</label>
                    <input
                        type="number"
                        name="readSpeedMbps"
                        value={newStorageDevice.readSpeedMbps || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Скорость записи (МБ/с)</label>
                    <input
                        type="number"
                        name="writeSpeedMbps"
                        value={newStorageDevice.writeSpeedMbps || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Изображение</label>
                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                </div>
                <div>
                    <button className="button-primary" type="submit" disabled={isLoading || isUploading}>
                        {isLoading || isUploading ? "Добавление..." : "Добавить накопитель"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStorageDeviceComponent;
