import React, {useMemo, useState} from "react";
import { Chipset } from "../../types/Chipset";
import { useCreateChipsetMutation } from "../../store/api/apiChipset";
import {useGetSocketsQuery} from "../../store/api/apiSocket";
import Select from "react-select";

const AddChipsetComponent: React.FC = () => {
    const [newChipset, setNewChipset] = useState<Partial<Chipset>>({ name: "" });
    const [createChipset, { isLoading, isSuccess, isError }] = useCreateChipsetMutation();
    const { data: existingSockets } = useGetSocketsQuery();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewChipset((prevChipset) => ({
            ...prevChipset,
            [name]: value,
        }));
    };

    const socketOptions = useMemo(() =>
        existingSockets?.map((socket) => ({
            value: socket.id,
            label: socket.name,
        })), [existingSockets]
    );

    const handleSocketsChange = (selectedOption: { value: number; label: string } | null) => {
        if (selectedOption) {
            setNewChipset((prevChipset) => ({
                ...prevChipset,
                socket: { id: selectedOption.value, name: selectedOption.label },
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newChipset.name) {
            alert("Название чипсета обязательно для заполнения!");
            return;
        }

        if (!newChipset.socket) {
            alert("Сокет обязателен для выбора!");
            return;
        }

        try {
            await createChipset(newChipset).unwrap();
            alert("Чипсет успешно добавлен!");
            setNewChipset({ name: "", socket: undefined });
        } catch (error) {
            console.error("Ошибка добавления чипсета:", error);
            alert("Произошла ошибка при добавлении чипсета.");
        }
    };

    return (
        <div>
            <h2>Добавить чипсет</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название</label>
                    <input
                        type="text"
                        name="name"
                        value={newChipset.name || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Сокет</label>
                    <Select
                        options={socketOptions}
                        value={
                            newChipset.socket
                                ? { value: newChipset.socket.id, label: newChipset.socket.name }
                                : null
                        }
                        onChange={handleSocketsChange}
                        placeholder="Выберите сокет"
                    />
                </div>
                <button className="button-primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Добавление..." : "Добавить чипсет"}
                </button>
            </form>
        </div>
    );
};

export default AddChipsetComponent;
