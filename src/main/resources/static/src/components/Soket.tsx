import React, { useEffect, useState } from "react";
import Select from 'react-select';
import axios from "axios";
import { ISoket } from "../data/models";

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

    const handleDeleteSoket = async (soketId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/soket/delete_soket/${soketId}`);
            const updatedSokets = sokets.filter(soket => soket.id !== soketId);
            setSokets(updatedSokets);
        } catch (error) {
            console.error('Error deleting soket:', error);
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
            <Select
                options={sokets.map(soket => ({ value: soket.name, label: soket.name }))}
                value={selectedSoket ? { value: selectedSoket, label: selectedSoket } : null}
                onChange={(selectedOption) => {
                    if (selectedOption !== null) {
                        setSelectedSoket(selectedOption.value);
                    }
                }}
                placeholder="Введите или выберите сокет"
            />

            {selectedSoket && <p className="mb-2">Выбранный сокет: {selectedSoket}</p>}

            <button
                className={`border rounded px-6 py-1 ${isAddingSoket ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"} transition-colors`}
                onClick={handleAddSoketClick}
            >
                Добавить новый сокет
            </button>

            {isAddingSoket && (
                <div className="border flex flex-col items-center p-4 mt-2">
                    {sokets.length > 0 && (
                        <div>
                            <h2 className="mt-4">Список сокетов</h2>
                            <table className="border-collapse border border-gray-500 mt-2">
                                <thead>
                                <tr>
                                    <th className="border border-gray-500 px-4 py-2">ID</th>
                                    <th className="border border-gray-500 px-4 py-2">Название</th>
                                    <th className="border border-gray-500 px-4 py-2">Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sokets.map(soket => (
                                    <tr key={soket.id}>
                                        <td className="border border-gray-500 px-4 py-2">{soket.id}</td>
                                        <td className="border border-gray-500 px-4 py-2">{soket.name}</td>
                                        <td className="border border-gray-500 px-4 py-2">
                                            <button className="border rounded px-4 py-1 bg-red-500 hover:bg-red-600 transition-colors" onClick={() => handleDeleteSoket(soket.id)}>Удалить</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

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
