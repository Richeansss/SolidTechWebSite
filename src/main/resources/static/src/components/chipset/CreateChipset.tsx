import React, { useState } from "react";
import { Chipset } from "../../types/Chipset";
import { useCreateChipsetMutation } from "../../store/api/apiChipset";

const AddChipsetComponent: React.FC = () => {
    const [newChipset, setNewChipset] = useState<Partial<Chipset>>({ name: "" });
    const [createChipset, { isLoading, isSuccess, isError }] = useCreateChipsetMutation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewChipset((prevChipset) => ({
            ...prevChipset,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newChipset.name) {
            alert("Название чипсета обязательно для заполнения!");
            return;
        }

        try {
            await createChipset(newChipset).unwrap();
            alert("Чипсет успешно добавлен!");
            setNewChipset({ name: "" });
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
                <button className="button-primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Добавление..." : "Добавить чипсет"}
                </button>
            </form>
        </div>
    );
};

export default AddChipsetComponent;
