import React, { useState, useMemo } from "react";
import Select from "react-select";
import { MotherBoard } from "../../types/MotherBoard";
import { RamType } from "../../types/Ram";
import { useCreateMotherBoardMutation } from "../../store/api/apiMotherBoard";
import { useGetBrandsQuery } from "../../store/api/apiBrand";
import { useGetSocketsQuery } from "../../store/api/apiSocket";
import { useGetChipsetsQuery } from "../../store/api/apiChipset";
import "../case/CreateCase.css";
import {useUploadImageMutation} from "../../store/api/apiMotherBoard";

const AddMotherBoardComponent: React.FC = () => {
    // @ts-ignore
    const [newMotherBoard, setNewMotherBoard] = useState<Partial<MotherBoard>>({
        brand: { id: 0, name: "" },
        name: "",
        socket: { id: 0, name: "" },
        chipset: { id: 0, name: "", socket: { id: 0, name: "" }},
        typeRam: RamType.DDR4, // Default RAM type
        pci: 0,
        amount_of_m2: 0,
        hasArgb: false, // Изначально значение false
        imageUrl: "",
    });

    const [image, setImage] = useState<File | null>(null);
    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation(); // Мутация для загрузки изображения

    const [createMotherBoard, { isLoading, isSuccess, isError }] = useCreateMotherBoardMutation();
    const { data: existingBrands } = useGetBrandsQuery();
    const { data: socketTypes, isLoading: isSearchingSockets } = useGetSocketsQuery();
    const { data: chipsetTypes, isLoading: isSearchingChipsets } = useGetChipsetsQuery();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
        }
    };

    const brandOptions = useMemo(
        () =>
            existingBrands?.map((brand) => ({
                value: brand.id,
                label: brand.name,
            })),
        [existingBrands]
    );

    const socketOptions = useMemo(
        () =>
            socketTypes?.map((socket) => ({
                value: socket.id,
                label: socket.name,
            })),
        [socketTypes]
    );

    const chipsetOptions = useMemo(
        () =>
            chipsetTypes?.map((chipset) => ({
                value: chipset.id,
                label: chipset.name,
            })),
        [chipsetTypes]
    );

    const ramOptions = useMemo(
        () =>
            Object.values(RamType).map((ramType) => ({
                value: ramType,
                label: ramType,
            })),
        []
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewMotherBoard((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBrandChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewMotherBoard((prev) => ({
                ...prev,
                brand: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const handleSocketChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewMotherBoard((prev) => ({
                ...prev,
                socket: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const handleChipsetChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewMotherBoard((prev) => ({
                ...prev,
                chipset: { id: selectedOption.value, name: selectedOption.label, socket: { id: 0, name: "" } },
            }));
        }
    };

    const handleRamTypeChange = (selectedOption: { value: RamType; label: string } | null) => {
        if (selectedOption) {
            setNewMotherBoard((prev) => ({
                ...prev,
                typeRam: selectedOption.value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !newMotherBoard.name ||
            !newMotherBoard.brand ||
            !newMotherBoard.socket ||
            !newMotherBoard.chipset ||
            !newMotherBoard.pci ||
            !newMotherBoard.amount_of_m2
        ) {
            alert("Все поля обязательны для заполнения!");
            return;
        }

        try {
            const createdMotherBoard = await createMotherBoard({
                ...newMotherBoard,
                hasArgb: newMotherBoard.hasArgb,
            }).unwrap();

            if (image) {
                // @ts-ignore
                await uploadImage({ id: createdMotherBoard.id, file: image }).unwrap();
            }

            alert("Материнская плата успешно добавлена!");
            setNewMotherBoard((prevState) => ({
                ...prevState,
                name: "",
            }));
        } catch (error) {
            console.error("Ошибка добавления материнской платы:", error);
            alert("Произошла ошибка при добавлении материнской платы.");
        }
    };

    return (
        <div>
            <h2>Добавить материнскую плату</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название</label>
                    <input
                        type="text"
                        name="name"
                        value={newMotherBoard.name || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Бренд</label>
                    <Select
                        options={brandOptions}
                        value={newMotherBoard.brand ? {
                            value: newMotherBoard.brand.id,
                            label: newMotherBoard.brand.name
                        } : null}
                        onChange={handleBrandChange}
                        placeholder="Выберите бренд"
                        isClearable
                    />
                </div>
                <div>
                    <label>Сокет</label>
                    <Select
                        options={socketOptions}
                        value={newMotherBoard.socket ? { value: newMotherBoard.socket.id, label: newMotherBoard.socket.name } : null}
                        onChange={handleSocketChange}
                        placeholder="Выберите сокет"
                    />
                </div>
                <div>
                    <label>Чипсет</label>
                    <Select
                        options={chipsetOptions}
                        value={newMotherBoard.chipset ? { value: newMotherBoard.chipset.id, label: newMotherBoard.chipset.name } : null}
                        onChange={handleChipsetChange}
                        placeholder="Выберите чипсет"
                    />
                </div>
                <div>
                    <label>Тип оперативной памяти</label>
                    <Select
                        options={ramOptions}
                        value={ramOptions.find((option) => option.value === newMotherBoard.typeRam)}
                        onChange={handleRamTypeChange}
                        placeholder="Выберите тип RAM"
                        required
                    />
                </div>
                <div>
                    <label>Версия PCI</label>
                    <input
                        type="number"
                        name="pci"
                        value={newMotherBoard.pci || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Количество M.2</label>
                    <input
                        type="number"
                        name="amount_of_m2"
                        value={newMotherBoard.amount_of_m2 || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Подсветка ARGB</label>
                    <input
                        type="checkbox"
                        name="has_argb"
                        checked={newMotherBoard.hasArgb || false}
                        onChange={(e) => {
                            setNewMotherBoard((prev) => ({
                                ...prev,
                                hasArgb: e.target.checked,
                            }));
                        }}
                    />
                </div>
                <div>
                    <label>Изображение</label>
                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                </div>
                <button className="button-primary" type="submit" disabled={isLoading || isUploading}>
                    {isLoading ? "Добавление..." : "Добавить материнскую плату"}
                </button>
            </form>
        </div>
    );
};

export default AddMotherBoardComponent;
