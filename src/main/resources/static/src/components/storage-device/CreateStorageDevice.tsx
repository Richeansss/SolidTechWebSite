import React, { useState, useMemo } from "react";
import Select from "react-select";
import {FormFactor, InterfaceType, StorageDevice, StorageType} from "../../types/StorageDevice"; // Тип StorageDevice
import { useCreateStorageDeviceMutation } from "../../store/api/apiStorageDevice";
import { useSearchBrandsByNameQuery } from "../../store/api/apiBrand";
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

    const [createStorageDevice, { isLoading, isSuccess, isError }] = useCreateStorageDeviceMutation();
    const { data: existingBrands, isLoading: isSearching, isError: isSearchError } = useSearchBrandsByNameQuery(newStorageDevice.brand?.name || '', {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newStorageDevice.name || !newStorageDevice.brand || !newStorageDevice.type || !newStorageDevice.capacityGb || !newStorageDevice.formFactor || !newStorageDevice.interfaceType || !newStorageDevice.readSpeedMbps || !newStorageDevice.writeSpeedMbps) {
            alert("Все поля обязательны для заполнения!");
            return;
        }

        try {
            await createStorageDevice(newStorageDevice).unwrap();
            alert("Накопитель успешно добавлен!");
            setNewStorageDevice({
                brand: { id: 0, name: "" },
                name: "",
                type: StorageType.SSD,
                capacityGb: 0,
                formFactor: FormFactor.M_2,
                interfaceType: InterfaceType.PCIE_3_0,
                readSpeedMbps: 0,
                writeSpeedMbps: 0,
            });
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
                        isLoading={isSearching}
                        onChange={handleBrandChange}
                        placeholder="Выберите бренд"
                    />
                </div>
                <div>
                    <label>Тип</label>
                    <select
                        name="type"
                        value={newStorageDevice.type || StorageType.SSD}
                        onChange={handleInputChange}
                        required
                    >
                        <option value={StorageType.HDD}>HDD</option>
                        <option value={StorageType.SSD}>SSD</option>
                    </select>
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
                    <select
                        name="formFactor"
                        value={newStorageDevice.formFactor || FormFactor.PCIE_CARD} // Значение по умолчанию
                        onChange={handleInputChange}
                        required
                    >
                        <option value={FormFactor.PCIE_CARD}>PCIe Card</option>
                        <option value={FormFactor.FORM_2_5}>2.5" Form</option>
                        <option value={FormFactor.FORM_3_5}>3.5" Form</option>
                        <option value={FormFactor.M_2}>M.2</option>
                    </select>
                </div>
                <div>
                    <label>Тип интерфейса</label>
                    <select
                        name="interfaceType"
                        value={newStorageDevice.interfaceType || InterfaceType.SATA_III} // Значение по умолчанию
                        onChange={handleInputChange}
                        required
                    >
                    <option value={InterfaceType.SATA}>SATA</option>
                        <option value={InterfaceType.USB}>USB</option>
                        <option value={InterfaceType.SATA_III}>SATA III</option>
                        <option value={InterfaceType.PCIE_4_0}>PCIe 4.0</option>
                        <option value={InterfaceType.PCIE_3_0}>PCIe 3.0</option>
                    </select>
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
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Добавление..." : "Добавить накопитель"}
                </button>
            </form>
        </div>
    );
};

export default AddStorageDeviceComponent;
