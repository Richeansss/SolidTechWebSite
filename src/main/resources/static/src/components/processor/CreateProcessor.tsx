import React, { useState, useMemo } from "react";
import Select from "react-select";
import { Processor } from "../../types/Processor"; // Импортируем интерфейс Processor и RamType
import { useCreateProcessorMutation } from "../../store/api/apiProcessor";
import { useGetBrandsQuery } from "../../store/api/apiBrand";
import { useGetSocketsQuery } from "../../store/api/apiSocket";
import "../case/CreateCase.css";
import {RamType} from "../../types/Ram";

const AddProcessorComponent: React.FC = () => {
    const [newProcessor, setNewProcessor] = useState<Partial<Processor>>({
        brand: { id: 0, name: "" },
        name: "",
        socket: { id: 0, name: "" },
        typeRam: RamType.DDR4, // Set default RAM type
        core: 0,
        threads: 0,
        turbo_bust: 0,
    });

    const [createProcessor, { isLoading, isSuccess, isError }] = useCreateProcessorMutation();
    const { data: existingBrands } = useGetBrandsQuery();
    const { data: socketTypes, isLoading: isSearchingSockets } = useGetSocketsQuery();

    const brandOptions = useMemo(() =>
        existingBrands?.map((brand) => ({
            value: brand.id,
            label: brand.name,
        })), [existingBrands]
    );

    const socketOptions = useMemo(() =>
        socketTypes?.map((socket) => ({
            value: socket.id,
            label: socket.name,
        })), [socketTypes]
    );

    const ramOptions = useMemo(() =>
            Object.values(RamType).map((ramType) => ({
                value: ramType,
                label: ramType,
            })),
        []
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProcessor((prevProcessor) => ({
            ...prevProcessor,
            [name]: value,
        }));
    };

    const handleBrandChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewProcessor((prevProcessor) => ({
                ...prevProcessor,
                brand: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const handleSocketChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewProcessor((prevProcessor) => ({
                ...prevProcessor,
                socket: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const handleRamTypeChange = (selectedOption: { value: RamType; label: string } | null) => {
        if (selectedOption) {
            setNewProcessor((prevProcessor) => ({
                ...prevProcessor,
                typeRam: selectedOption.value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newProcessor.name || !newProcessor.brand || !newProcessor.socket || !newProcessor.core || !newProcessor.threads || !newProcessor.turbo_bust) {
            alert("Все поля обязательны для заполнения!");
            return;
        }

        try {
            await createProcessor(newProcessor).unwrap();
            alert("Процессор успешно добавлен!");
            setNewProcessor({
                brand: { id: 0, name: "" },
                name: "",
                socket: { id: 0, name: "" },
                typeRam: RamType.DDR4, // Reset to default value
                core: 0,
                threads: 0,
                turbo_bust: 0,
            });
        } catch (error) {
            console.error("Ошибка добавления процессора:", error);
            alert("Произошла ошибка при добавлении процессора.");
        }
    };

    return (
        <div>
            <h2>Добавить процессор</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название</label>
                    <input
                        type="text"
                        name="name"
                        value={newProcessor.name || ""}
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
                    <label>Сокет</label>
                    <Select
                        options={socketOptions}
                        isLoading={isSearchingSockets}
                        onChange={handleSocketChange}
                        placeholder="Выберите сокет"
                        required
                    />
                </div>
                <div>
                    <label>Тип оперативной памяти</label>
                    <Select
                        options={ramOptions}
                        value={ramOptions.find(option => option.value === newProcessor.typeRam)}
                        onChange={handleRamTypeChange}
                        placeholder="Выберите тип RAM"
                        required
                    />
                </div>
                <div>
                    <label>Количество ядер</label>
                    <input
                        type="number"
                        name="core"
                        value={newProcessor.core || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Количество потоков</label>
                    <input
                        type="number"
                        name="threads"
                        value={newProcessor.threads || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Turbo Boost (MHz)</label>
                    <input
                        type="number"
                        name="turbo_bust"
                        value={newProcessor.turbo_bust || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Добавление..." : "Добавить процессор"}
                </button>
            </form>
        </div>
    );
};

export default AddProcessorComponent;
