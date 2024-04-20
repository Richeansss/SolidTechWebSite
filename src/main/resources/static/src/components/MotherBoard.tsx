import React, { useEffect, useState } from "react";
import axios from "axios";
import { IBrand, IMotherBoard } from "../data/models";
import Select from "react-select";

export function MotherBoard() {
    const [selectedMotherBoard, setSelectedMotherBoard] = useState<string | null>(null);
    const [newMotherBoardName, setNewMotherBoardName] = useState<string>('');
    const [isAddingMotherBoard, setIsAddingMotherBoard] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [motherboards, setMotherBoards] = useState<IMotherBoard[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [inputMotherBoardName, setInputMotherBoardName] = useState<string | null>(null);
    const [selectedSoket, setSelectedSoket] = useState<string | null>(null);
    const [brands, setBrands] = useState<IBrand[]>([]);

    useEffect(() => {
        fetchData();
        fetchBrands();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/motherboard');
            setMotherBoards(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Ошибка при загрузке данных. Пожалуйста, повторите попытку позже.');
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/brand');
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
            setError('Ошибка при загрузке данных. Пожалуйста, повторите попытку позже.');
        }
    };

    const handleDeleteMotherBoard = async (motherBoardId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/motherboard/delete/${motherBoardId}`);
            const updatedMotherBoards = motherboards.filter(mb => mb.id !== motherBoardId);
            setMotherBoards(updatedMotherBoards);
        } catch (error) {
            console.error('Error deleting motherboard:', error);
        }
    };

    const handleMotherBoardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMotherBoard(event.target.value);
    };

    const clearError = () => {
        setError('');
    };

    const handleAddMotherBoardClick = () => {
        setIsAddingMotherBoard(prevState => !prevState);
    };

    const handleNewMotherBoardNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMotherBoardName(event.target.value);
    };

    const checkMotherBoardExists = async (motherBoardName: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/motherboard/${motherBoardName}`);
            return response.data.id !== undefined;
        } catch (error) {
            console.error('Error checking motherboard existence:', error);
            return false;
        }
    };

    const handleSaveNewMotherBoard = async () => {
        try {
            if (!newMotherBoardName.trim()) {
                setError('Ошибка: пустое поле названия материнской платы');
                return;
            }

            const motherBoardExists = await checkMotherBoardExists(newMotherBoardName);
            if (motherBoardExists) {
                setError('Ошибка: материнская плата с таким именем уже существует');
                return;
            }

            const response = await axios.post('http://localhost:8080/api/v1/motherboard/save', {
                name: newMotherBoardName
            });
            console.log('New motherboard added:', response.data);
            setNewMotherBoardName('');
            fetchData();
            clearError();
        } catch (error) {
            console.error('Error adding new motherboard:', error);
            setError('Ошибка при добавлении новой материнской платы. Пожалуйста, повторите попытку позже.');
        }
    };

    const soketOptions = [
        { value: 'am4', label: 'AM4' },
        { value: 'lga1700', label: 'LGA1700' },
        { value: 'am5', label: 'AM5' }
    ];

    const getSoketOptions = () => {
        return selectedSoket ? soketOptions.find(c => c.value === selectedSoket) : null;
    }

    return (
        <div className="border p-4 rounded flex flex-col items-center mb-2">
            <select value={selectedMotherBoard || ''} onChange={handleMotherBoardChange}
                    className="border rounded px-2 py-1 mb-2">
                <option value="">Выберите материнскую плату</option>
                {motherboards.map(mb => (
                    <option key={mb.id} value={mb.name}>{mb.name}</option>
                ))}
            </select>
            {selectedMotherBoard && <p className="mb-2">Выбранная материнская плата: {selectedMotherBoard}</p>}

            <button
                className={`border rounded px-6 py-1 ${isAddingMotherBoard ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"} transition-colors`}
                onClick={handleAddMotherBoardClick}
            >
                Добавить новую материнскую плату
            </button>

            {isAddingMotherBoard && (
                <div className="border flex flex-col items-center p-4 mt-2">
                    {motherboards.length > 0 && (
                        <div>
                            <h2 className="mt-4">Список материнских плат</h2>
                            <table className="border-collapse border border-gray-500 mt-2">
                                <thead>
                                <tr>
                                    <th className="border border-gray-500 px-4 py-2">ID</th>
                                    <th className="border border-gray-500 px-4 py-2">Название</th>
                                    <th className="border border-gray-500 px-4 py-2">Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {motherboards.map(mb => (
                                    <tr key={mb.id}>
                                        <td className="border border-gray-500 px-4 py-2">{mb.id}</td>
                                        <td className="border border-gray-500 px-4 py-2">{mb.name}</td>
                                        <td className="border border-gray-500 px-4 py-2">
                                            <button
                                                className="border rounded px-4 py-1 bg-red-500 hover:bg-red-600 transition-colors"
                                                onClick={() => handleDeleteMotherBoard(mb.id)}>Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="flex">
                        {/* Поле выбора материнской платы */}
                        <div className="mr-4">
                            <Select
                                options={motherboards.map(board => ({value: board.name, label: board.name}))}
                                value={inputMotherBoardName ? {
                                    value: inputMotherBoardName,
                                    label: inputMotherBoardName
                                } : null}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setInputMotherBoardName(selectedOption.value);
                                    }
                                }}
                                placeholder="Введите материнскую плату"
                            />
                            {/* Вывод выбранной материнской платы */}
                            {inputMotherBoardName &&
                                <p className="mb-2">Выбранная материнская плата: {inputMotherBoardName}</p>}
                        </div>

                        {/* Поле выбора бренда */}
                        <div className="mr-4">
                            <Select
                                options={brands.map(brand => ({value: brand.name, label: brand.name}))}
                                value={selectedBrand ? {value: selectedBrand, label: selectedBrand} : null}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedBrand(selectedOption.value);
                                    }
                                }}
                                placeholder="Выберите бренд"
                            />
                            {/* Вывод выбранного бренда */}
                            {selectedBrand && <p className="mb-2">Выбранный бренд: {selectedBrand}</p>}
                        </div>

                        {/* Поле выбора сокета */}
                        <div className="mr-4">
                            <Select
                                options={soketOptions}
                                value={getSoketOptions()}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedSoket(selectedOption.value);
                                    }
                                }}
                                placeholder="Выберите сокет"
                            />
                            {/* Вывод выбранного сокета */}
                            {selectedSoket && <p className="mb-2">Выбранный сокет: {selectedSoket}</p>}
                        </div>
                    </div>

                    {error && <p className="text-red-600 mb-2">{error}</p>}
                    <button
                        className="border rounded px-6 py-1 bg-sky-600 hover:bg-sky-700 transition-colors"
                        onClick={handleSaveNewMotherBoard}
                    >
                        Сохранить
                    </button>
                </div>
            )}
        </div>
    );
}
