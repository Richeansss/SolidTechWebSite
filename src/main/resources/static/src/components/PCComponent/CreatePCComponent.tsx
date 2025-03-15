import React, { useState, useMemo } from "react";
import Select, { SingleValue } from "react-select";
import { ComponentType, TypeStore, PCComponent } from "../../types/PCComponent";
import { useCreatePCComponentMutation } from "../../store/api/apiPCComponent";
import { useGetBrandsQuery } from "../../store/api/apiBrand";
import { useGetProcessorsQuery } from "../../store/api/apiProcessor";
import { useGetRamsQuery } from "../../store/api/apiRam";
import { useGetMotherBoardsQuery } from "../../store/api/apiMotherBoard";
import { useGetStorageDevicesQuery } from "../../store/api/apiStorageDevice";
import "../case/CreateCase.css";

const AddPCComponent: React.FC = () => {
    const [newComponent, setNewComponent] = useState<PCComponent>({
        id: 0,
        componentType: undefined,
        componentId: 0,
        warrantyMonths: 12,
        store: TypeStore.AVITO,
        pc: null,
    });

    const [createPCComponent, { isLoading }] = useCreatePCComponentMutation();
    const { data: existingBrands } = useGetBrandsQuery();

    // Вызываем все запросы на верхнем уровне
    const { data: processors } = useGetProcessorsQuery();
    const { data: rams } = useGetRamsQuery();
    const { data: motherboards } = useGetMotherBoardsQuery();
    const { data: storageDevices } = useGetStorageDevicesQuery();

    // Определяем, какие данные использовать в зависимости от выбранного типа компонента
    const componentData = useMemo(() => {
        switch (newComponent.componentType) {
            case ComponentType.PROCESSOR:
                return processors;
            case ComponentType.RAM:
                return rams;
            case ComponentType.MOTHERBOARD:
                return motherboards;
            case ComponentType.STORAGE:
                return storageDevices;
            default:
                return [];
        }
    }, [newComponent.componentType, processors, rams, motherboards, storageDevices]);

    // Формируем опции для выпадающего списка компонентов
    const componentOptions = useMemo(
        () =>
            componentData?.map(comp => ({
                value: comp.id,
                label: `${comp.brand.name} ${comp.name}`,
            })) || [],
        [componentData]
    );

    // Опции для выбора типа компонента
    const componentTypeOptions = Object.values(ComponentType).map(type => ({
        value: type,
        label: type,
    }));

    // Опции для выбора магазина
    const storeOptions = Object.values(TypeStore).map(store => ({
        value: store,
        label: store,
    }));

    // Обработчик выбора типа компонента
    const handleComponentTypeChange = (selectedOption: { value: ComponentType; label: string } | null) => {
        if (selectedOption) {
            setNewComponent(prev => ({
                ...prev,
                componentType: selectedOption.value,
                componentId: 0, // Сбрасываем ID компонента при смене типа
            }));
        }
    };

    // Обработчик выбора компонента
    const handleComponentChange = (selectedOption: SingleValue<{ value: number | undefined; label: string }>) => {
        setNewComponent(prev => ({
            ...prev,
            componentId: selectedOption?.value ?? 0,
        }));
    };

    // Обработчик выбора магазина
    const handleStoreChange = (selectedOption: { value: TypeStore; label: string } | null) => {
        if (selectedOption) {
            setNewComponent(prev => ({
                ...prev,
                store: selectedOption.value,
            }));
        }
    };

    // Обработчик изменения гарантии
    const handleWarrantyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComponent(prev => ({
            ...prev,
            warrantyMonths: Number(e.target.value),
        }));
    };

    // Отправка данных
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComponent.componentId) {
            alert("Выберите компонент!");
            return;
        }

        try {
            await createPCComponent(newComponent).unwrap();
            alert("Компонент успешно добавлен!");
            setNewComponent({
                id: 0,
                componentType: undefined,
                componentId: 0,
                warrantyMonths: 12,
                store: TypeStore.AVITO,
                pc: null,
            });
        } catch (error) {
            console.error("Ошибка добавления компонента:", error);
            alert("Произошла ошибка при добавлении компонента.");
        }
    };

    return (
        <div>
            <h2>Добавить компонент</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Тип компонента</label>
                    <Select
                        options={componentTypeOptions}
                        value={componentTypeOptions.find(option => option.value === newComponent.componentType) || null}
                        onChange={handleComponentTypeChange}
                        placeholder="Выберите тип"
                    />
                </div>
                <div>
                    <label>Компонент</label>
                    <Select
                        options={componentOptions}
                        value={componentOptions.find(option => option.value === newComponent.componentId) || null}
                        onChange={handleComponentChange}
                        placeholder="Выберите компонент"
                        isDisabled={!componentOptions.length}
                        isClearable
                    />
                </div>
                <div>
                    <label>Гарантия (в месяцах)</label>
                    <input
                        type="number"
                        name="warrantyMonths"
                        value={newComponent.warrantyMonths}
                        onChange={handleWarrantyChange}
                        required
                    />
                </div>
                <div>
                    <label>Магазин</label>
                    <Select
                        options={storeOptions}
                        value={storeOptions.find(option => option.value === newComponent.store) || null}
                        onChange={handleStoreChange}
                        placeholder="Выберите магазин"
                    />
                </div>
                <button className="button-primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Добавление..." : "Добавить компонент"}
                </button>
            </form>
        </div>
    );
};

export default AddPCComponent;
