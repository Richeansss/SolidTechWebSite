import React, { useEffect, useState } from "react";
import axios from "axios";
import { ISoket } from "../data/models";
import IdNameTable from "./Table/IdNameTable";

export function Soket() {
    const [selectedSoket, setSelectedSoket] = useState<string | null>(null);
    const [newSoketName, setNewSoketName] = useState<string>('');
    const [isAddingSoket, setIsAddingSoket] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [sokets, setSokets] = useState<ISoket[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/soket');
            setSokets(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Ошибка при загрузке данных. Пожалуйста, повторите попытку позже.');
        }
    };

    const clearError = () => {
        setError('');
    };

    const handleAddSoketClick = () => {
        setIsAddingSoket(prevState => !prevState);
    };

    const handleNewSoketNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSoketName(event.target.value);
    };

    const checkSoketExists = async (soketName: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/soket/${soketName}`);
            return response.data.id !== undefined;
        } catch (error) {
            console.error('Error checking soket existence:', error);
            return false;
        }
    };

    const handleSaveNewSoket = async () => {
        try {
            if (!newSoketName.trim()) {
                setError('Ошибка: пустое поле названия сокета');
                return;
            }

            const soketExists = await checkSoketExists(newSoketName);
            if (soketExists) {
                setError('Ошибка: сокет с таким именем уже существует');
                return;
            }

            const response = await axios.post('http://localhost:8080/api/v1/soket/save_soket', {
                name: newSoketName
            });
            console.log('New soket added:', response.data);
            setNewSoketName('');
            fetchData();
            clearError();
        } catch (error) {
            console.error('Error adding new soket:', error);
            setError('Ошибка при добавлении нового сокета. Пожалуйста, повторите попытку позже.');
        }
    };

    return (
        <div className="border p-4 rounded flex flex-col items-center mb-2">
            <button
                className={`border rounded px-6 py-1 ${isAddingSoket ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"} transition-colors`}
                onClick={handleAddSoketClick}
            >
                Добавить новый сокет
            </button>

            {isAddingSoket && (
                <div className="border flex flex-col items-center p-4 mt-2">
                    <IdNameTable data={sokets} tableName={"Список Сокетов"}></IdNameTable>

                    <input
                        className="border rounded px-2 py-1 mb-2"
                        type="text"
                        value={newSoketName}
                        onChange={handleNewSoketNameChange}
                        placeholder="Введите название сокета"
                    />
                    {error && <p className="text-red-600 mb-2">{error}</p>}
                    <button
                        className="border rounded px-6 py-1 bg-sky-600 hover:bg-sky-700 transition-colors"
                        onClick={handleSaveNewSoket}
                    >
                        Сохранить
                    </button>
                </div>
            )}
        </div>
    );
}
