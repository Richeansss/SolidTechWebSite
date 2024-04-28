import React, { useEffect, useState } from "react";
import Select from 'react-select';
import axios from "axios";
import { IChipset } from "../data/models";
import IdNameTable from "./Table/IdNameTable";

export function Chipset() {
    const [selectedChipset, setSelectedChipset] = useState<string | null>(null);
    const [newChipsetName, setNewChipsetName] = useState<string>('');
    const [isAddingChipset, setIsAddingChipset] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [chipsets, setChipsets] = useState<IChipset[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/chipset');
            setChipsets(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Ошибка при загрузке данных. Пожалуйста, повторите попытку позже.');
        }
    };

    const clearError = () => {
        setError('');
    };

    const handleAddChipsetClick = () => {
        setIsAddingChipset(prevState => !prevState);
    };

    const handleNewChipsetNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewChipsetName(event.target.value);
    };

    const checkChipsetExists = async (chipsetName: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/chipset/${chipsetName}`);
            return response.data.id !== undefined;
        } catch (error) {
            console.error('Error checking chipset existence:', error);
            return false;
        }
    };

    const handleSaveNewChipset = async () => {
        try {
            if (!newChipsetName.trim()) {
                setError('Ошибка: пустое поле названия сокета');
                return;
            }

            const chipsetExists = await checkChipsetExists(newChipsetName);
            if (chipsetExists) {
                setError('Ошибка: сокет с таким именем уже существует');
                return;
            }

            const response = await axios.post('http://localhost:8080/api/v1/chipset/save_chipset', {
                name: newChipsetName
            });
            console.log('New chipset added:', response.data);
            setNewChipsetName('');
            fetchData();
            clearError();
        } catch (error) {
            console.error('Error adding new chipset:', error);
            setError('Ошибка при добавлении нового сокета. Пожалуйста, повторите попытку позже.');
        }
    };

    return (
        <div className="border p-4 rounded flex flex-col items-center mb-2">
            <button
                className={`border rounded px-6 py-1 ${isAddingChipset ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"} transition-colors`}
                onClick={handleAddChipsetClick}
            >
                Добавить новый сокет
            </button>

            {isAddingChipset && (
                <div className="border flex flex-col items-center p-4 mt-2">
                    <IdNameTable data={chipsets} tableName={"Список Чипсетов"}></IdNameTable>

                    <input
                        className="border rounded px-2 py-1 mb-2"
                        type="text"
                        value={newChipsetName}
                        onChange={handleNewChipsetNameChange}
                        placeholder="Введите название сокета"
                    />
                    {error && <p className="text-red-600 mb-2">{error}</p>}
                    <button
                        className="border rounded px-6 py-1 bg-sky-600 hover:bg-sky-700 transition-colors"
                        onClick={handleSaveNewChipset}
                    >
                        Сохранить
                    </button>
                </div>
            )}
        </div>
    );
}
