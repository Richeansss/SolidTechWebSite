import React, { useState, useMemo } from "react";
import Select from "react-select";
import { useCreatePCMutation, useUploadImageMutation } from "../../store/api/apiPC";
import { useSearchBrandsByNameQuery } from "../../store/api/apiBrand";
import { useGetCoolersQuery } from "../../store/api/apiCooler";
import { useGetCasesQuery } from "../../store/api/apiCase";
import {useGetPowerSuppliesQuery } from "../../store/api/apiPowerSupply";
import { useGetVideocardsQuery } from "../../store/api/apiVideoCard";
import "../case/CreateCase.css";
import {useGetProcessorsQuery} from "../../store/api/apiProcessor";
import {useGetRamsQuery} from "../../store/api/apiRam";
import {useGetMotherBoardsQuery} from "../../store/api/apiMotherBoard";
import {useGetStorageDevicesQuery} from "../../store/api/apiStorageDevice";

export enum TypeStore {
    Avito = "Avito",
    Ozon = "Ozon",
    DNS = "DNS",
    OnlineTrade = "OnlineTrade",
    Aliexpress = "Aliexpress",
    Citilink = "Citilink"
}

const AddPCComponent: React.FC = () => {
    const [newPC, setNewPC] = useState({
        motherBoard: { id: 0 },
        motherBoardStore: "",
        motherBoardWarranty: 0,
        processor: { id: 0 },
        processorStore: "",
        processorWarranty: 0,
        ram: { id: 0 },
        ramStore: "",
        ramWarranty: 0,
        cooler: { id: 0 },
        coolerStore: "",
        coolerWarranty: 0,
        case_pc: { id: 0 },
        caseStore: "",
        caseWarranty: 0,
        videocard: { id: 0 },
        videocardStore: "",
        videocardWarranty: 0,
        storageDevice: { id: 0 },
        storageDeviceStore: "",
        storageDeviceWarranty: 0,
        powerSupply: { id: 0 },
        powerSupplyStore: "",
        powerSupplyWarranty: 0,
        price: 0,
    });

    const [createPC, { isLoading, isSuccess, isError }] = useCreatePCMutation();
    const [image, setImage] = useState<File | null>(null);
    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation(); // Мутация для загрузки изображения

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
        }
    };

    // Загрузка данных для выбора
    const { data: existingBrands } = useSearchBrandsByNameQuery("");
    const { data: coolerTypes } = useGetCoolersQuery();
    const { data: caseTypes } = useGetCasesQuery();
    const { data: powerSupplies } = useGetPowerSuppliesQuery();
    const { data: videocardTypes } = useGetVideocardsQuery();
    const { data: processors } = useGetProcessorsQuery();
    const { data: ramTypes } = useGetRamsQuery();
    const { data: motherBoardTypes} = useGetMotherBoardsQuery();
    const { data: storageDeviceTypes} = useGetStorageDevicesQuery()

    // Опции для Select
    const brandOptions = useMemo(() => existingBrands?.map((brand) => ({ value: brand.id, label: brand.name })), [existingBrands]);
    const coolerOptions = useMemo(() => coolerTypes?.map((cooler) => ({ value: cooler.id, label: cooler.name })), [coolerTypes]);
    const caseOptions = useMemo(() => caseTypes?.map((caseItem) => ({ value: caseItem.id, label: caseItem.name })), [caseTypes]);
    const powerSupplyOptions = useMemo(() => powerSupplies?.map((psu) => ({ value: psu.id, label: psu.name })), [powerSupplies]);
    const videocardOptions = useMemo(() => videocardTypes?.map((videocard) => ({ value: videocard.id, label: videocard.name })), [videocardTypes]);
    const processorOptions = useMemo(() => processors?.map((processor) => ({
        value: processor.id,
        label: processor.name,
    })), [processors]);
    const ramOptions = useMemo(() => ramTypes?.map((ram) => ({
        value: ram.id,
        label: ram.name,
    })), [ramTypes]);
    const motherBoardOptions = useMemo(() => motherBoardTypes?.map((motherBoard) => ({
        value: motherBoard.id,
        label: motherBoard.name,
    })), [motherBoardTypes]);
    const storageDeviceOptions = useMemo(() => storageDeviceTypes?.map((storageDevice) => ({
        value: storageDevice.id,
        label: storageDevice.name,
    })), [storageDeviceTypes]);

    const storeOptions = useMemo(() => Object.values(TypeStore).map(store => ({ value: store, label: store })), []);

    const handleSelectChange = (name: string, selectedOption: { value: number | undefined; label: string } | null) => {
        if (selectedOption) {
            const value = selectedOption.value ?? 0;
            setNewPC((prev) => ({
                ...prev,
                [name]: { id: value },
            }));
        }
    };

    const handleStoreSelectChange = (name: string, selectedOption: { value: string; label: string } | null) => {
        if (selectedOption) {
            setNewPC((prev) => ({
                ...prev,
                [name]: selectedOption.value,
            }));
        }
    };

    const handleInputChange = (name: string, value: number | string) => {
        setNewPC((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверяем, что все обязательные поля заполнены
        if (
            !newPC.motherBoard.id || !newPC.motherBoardStore || newPC.motherBoardWarranty === 0 ||
            !newPC.processor.id || !newPC.processorStore || newPC.processorWarranty === 0 ||
            !newPC.ram.id || !newPC.ramStore || newPC.ramWarranty === 0 ||
            !newPC.cooler.id || !newPC.coolerStore || newPC.coolerWarranty === 0 ||
            !newPC.case_pc.id || !newPC.caseStore || newPC.caseWarranty === 0 ||
            !newPC.videocard.id || !newPC.videocardStore || newPC.videocardWarranty === 0 ||
            !newPC.storageDevice.id || !newPC.storageDeviceStore || newPC.storageDeviceWarranty === 0 ||
            !newPC.powerSupply.id || !newPC.powerSupplyStore || newPC.powerSupplyWarranty === 0 ||
            !newPC.price || newPC.price <= 0
        ) {
            alert("Все поля обязательны для заполнения!");
            return;
        }

        try {
            // @ts-ignore
            const createdPC = await createPC(newPC).unwrap();

            if (image) {
                // @ts-ignore
                await uploadImage({ id: createdPC.id, file: image }).unwrap();
            }

            alert("ПК успешно добавлен!");
            setNewPC({
                motherBoard: { id: 0 },
                motherBoardStore: "",
                motherBoardWarranty: 0,
                processor: { id: 0 },
                processorStore: "",
                processorWarranty: 0,
                ram: { id: 0 },
                ramStore: "",
                ramWarranty: 0,
                cooler: { id: 0 },
                coolerStore: "",
                coolerWarranty: 0,
                case_pc: { id: 0 },
                caseStore: "",
                caseWarranty: 0,
                videocard: { id: 0 },
                videocardStore: "",
                videocardWarranty: 0,
                storageDevice: { id: 0 },
                storageDeviceStore: "",
                storageDeviceWarranty: 0,
                powerSupply: { id: 0 },
                powerSupplyStore: "",
                powerSupplyWarranty: 0,
                price: 0,
            });
        } catch (error) {
            console.error("Ошибка добавления ПК:", error);
            alert("Произошла ошибка при добавлении ПК.");
        }
    };


    return (
        <div>
            <h2>Добавить ПК</h2>
            <form onSubmit={handleSubmit}>
                {/* Материнская плата */}
                <div className="form-group">
                    <label><strong>Материнская плата</strong></label>
                    <Select
                        options={motherBoardOptions}
                        onChange={(option) => handleSelectChange("motherBoard", option)}
                        placeholder="Выберите материнскую плату"
                    />
                    <label>Гарантия</label>
                    <input
                        type="number"
                        placeholder="Гарантия материнской платы"
                        value={newPC.motherBoardWarranty}
                        onChange={(e) => handleInputChange("motherBoardWarranty", e.target.value)}
                    />
                    <label>Магазин</label>
                    <Select
                        options={storeOptions}
                        onChange={(option) => handleStoreSelectChange("motherBoardStore", option)}
                        placeholder="Выберите магазин"
                    />
                </div>

                {/* Процессор */}
                <div className="form-group">
                    <label><strong>Процессор</strong></label>
                    <Select
                        options={processorOptions}
                        onChange={(option) => handleSelectChange("processor", option)}
                        placeholder="Выберите процессор"
                    />
                    <label>Гарантия</label>
                    <input
                        type="number"
                        placeholder="Гарантия процессора"
                        value={newPC.processorWarranty}
                        onChange={(e) => handleInputChange("processorWarranty", e.target.value)}
                    />
                    <label>Магазин</label>
                    <Select
                        options={storeOptions}
                        onChange={(option) => handleStoreSelectChange("processorStore", option)}
                        placeholder="Выберите магазин"
                    />
                </div>

                {/* Оперативная память */}
                <div className="form-group">
                    <label><strong>Оперативная память</strong></label>
                    <Select
                        options={ramOptions}
                        onChange={(option) => handleSelectChange("ram", option)}
                        placeholder="Выберите оперативную память"
                    />
                    <label>Гарантия</label>
                    <input
                        type="number"
                        placeholder="Гарантия оперативной памяти"
                        value={newPC.ramWarranty}
                        onChange={(e) => handleInputChange("ramWarranty", e.target.value)}
                    />
                    <label>Магазин</label>
                    <Select
                        options={storeOptions}
                        onChange={(option) => handleStoreSelectChange("ramStore", option)}
                        placeholder="Выберите магазин"
                    />
                </div>

                {/* Охлаждение */}
                <div className="form-group">
                    <label><strong>Охлаждение</strong></label>
                    <Select
                        options={coolerOptions}
                        onChange={(option) => handleSelectChange("cooler", option)}
                        placeholder="Выберите кулер"
                    />
                    <label>Гарантия</label>
                    <input
                        type="number"
                        placeholder="Гарантия кулера"
                        value={newPC.coolerWarranty}
                        onChange={(e) => handleInputChange("coolerWarranty", e.target.value)}
                    />
                    <label>Магазин</label>
                    <Select
                        options={storeOptions}
                        onChange={(option) => handleStoreSelectChange("coolerStore", option)}
                        placeholder="Выберите магазин"
                    />
                </div>

                {/* Корпус */}
                <div className="form-group">
                    <label><strong>Корпус</strong></label>
                    <Select
                        options={caseOptions}
                        onChange={(option) => handleSelectChange("case_pc", option)}
                        placeholder="Выберите корпус"
                    />
                    <label>Гарантия</label>
                    <input
                        type="number"
                        placeholder="Гарантия корпуса"
                        value={newPC.caseWarranty}
                        onChange={(e) => handleInputChange("caseWarranty", e.target.value)}
                    />
                    <label>Магазин</label>
                    <Select
                        options={storeOptions}
                        onChange={(option) => handleStoreSelectChange("caseStore", option)}
                        placeholder="Выберите магазин"
                    />
                </div>

                {/* Видеокарта */}
                <div className="form-group">
                    <label><strong>Видеокарта</strong></label>
                    <Select
                        options={videocardOptions}
                        onChange={(option) => handleSelectChange("videocard", option)}
                        placeholder="Выберите видеокарту"
                    />
                    <label>Гарантия</label>
                    <input
                        type="number"
                        placeholder="Гарантия видеокарты"
                        value={newPC.videocardWarranty}
                        onChange={(e) => handleInputChange("videocardWarranty", e.target.value)}
                    />
                    <label>Магазин</label>
                    <Select
                        options={storeOptions}
                        onChange={(option) => handleStoreSelectChange("videocardStore", option)}
                        placeholder="Выберите магазин"
                    />
                </div>

                {/* Накопительное устройство */}
                <div className="form-group">
                    <label><strong>Накопительное устройство</strong></label>
                    <Select
                        options={storageDeviceOptions}
                        onChange={(option) => handleSelectChange("storageDevice", option)}
                        placeholder="Выберите накопительное устройство"
                    />
                    <label>Гарантия</label>
                    <input
                        type="number"
                        placeholder="Гарантия накопительного устройства"
                        value={newPC.storageDeviceWarranty}
                        onChange={(e) => handleInputChange("storageDeviceWarranty", e.target.value)}
                    />
                    <label>Магазин</label>
                    <Select
                        options={storeOptions}
                        onChange={(option) => handleStoreSelectChange("storageDeviceStore", option)}
                        placeholder="Выберите магазин"
                    />
                </div>

                {/* Источник питания */}
                <div className="form-group">
                    <label><strong>Источник питания</strong></label>
                    <Select
                        options={powerSupplyOptions}
                        onChange={(option) => handleSelectChange("powerSupply", option)}
                        placeholder="Выберите блок питания"
                    />
                    <label>Гарантия</label>
                    <input
                        type="number"
                        placeholder="Гарантия источника питания"
                        value={newPC.powerSupplyWarranty}
                        onChange={(e) => handleInputChange("powerSupplyWarranty", e.target.value)}
                    />
                    <label>Магазин</label>
                    <Select
                        options={storeOptions}
                        onChange={(option) => handleStoreSelectChange("powerSupplyStore", option)}
                        placeholder="Выберите магазин"
                    />
                </div>

                {/* Цена */}
                <div>
                    <label><strong>Цена</strong></label>
                    <input
                        type="number"
                        placeholder="Введите цену ПК"
                        value={newPC.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                </div>
                <div>
                    <label>Изображение</label>
                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                </div>

                <button className="button-primary" type="submit" disabled={isLoading || isUploading}>
                    {isLoading ? "Добавление..." : "Добавить ПК"}
                </button>

                {isSuccess && <p>ПК успешно добавлен!</p>}
                {isError && <p>Произошла ошибка при добавлении ПК!</p>}
            </form>
        </div>
    );
};

export default AddPCComponent;
