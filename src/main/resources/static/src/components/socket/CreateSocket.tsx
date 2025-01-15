import React, { useState } from "react";
import { Socket } from "../../types/Socket";
import { useCreateSocketMutation } from "../../store/api/apiSocket";

const AddSocketComponent: React.FC = () => {
    const [newSocket, setNewSocket] = useState<Partial<Socket>>({ name: "" });
    const [createSocket, { isLoading, isSuccess, isError }] = useCreateSocketMutation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSocket((prevSocket) => ({
            ...prevSocket,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newSocket.name) {
            alert("Название сокета обязательно для заполнения!");
            return;
        }

        try {
            await createSocket(newSocket).unwrap();
            alert("Сокет успешно добавлен!");
            setNewSocket({ name: "" });
        } catch (error) {
            console.error("Ошибка добавления сокета:", error);
            alert("Произошла ошибка при добавлении сокета.");
        }
    };

    return (
        <div>
            <h2>Добавить сокет</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название</label>
                    <input
                        type="text"
                        name="name"
                        value={newSocket.name || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button className="button-primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Добавление..." : "Добавить сокет"}
                </button>
            </form>
        </div>
    );
};

export default AddSocketComponent;
