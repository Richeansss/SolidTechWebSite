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

    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [inputMotherBoardName, setInputMotherBoardName] = useState<string>('');
    const [selectedSoket, setSelectedSoket] = useState<string | null>(null);
    const [selectedChipset, setSelectedChipset] = useState<string | null>(null);
    const [selectedTypeOfMemory, setSelectedTypeOfMemory] = useState<string | null>(null);
    const [selectedPci, setSelectedPci] = useState<number | null>(null);
    const [selectedAmountOfM2, setSelectedAmountOfM2] = useState<number | null>(null);
    const [inputedUrl, setInputedUrl] = useState<string | null>(null);

    const [inputValue, setInputValue] = useState<string>(''); // Состояние для хранения текущего введенного значения


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

    const handleUrlInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputedUrl(event.target.value);
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
            if (!inputMotherBoardName.trim()) {
                setError('Ошибка: пустое поле названия материнской платы');
                return;
            }

            const motherBoardExists = await checkMotherBoardExists(inputMotherBoardName);
            if (motherBoardExists) {
                setError('Ошибка: материнская плата с таким именем уже существует');
                return;
            }

            const response = await axios.post(`http://localhost:8080/api/v1/motherboard/save_motherboard?brand_id=${selectedBrand}`, {
                name: inputMotherBoardName,
                soket: selectedSoket,
                chipset: selectedChipset,
                type_of_memory: selectedTypeOfMemory,
                pci: selectedPci,
                amount_of_mem: selectedAmountOfM2,
                url: inputedUrl
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

    const chipsetOptions = [
        { value: 'h610', label: 'H610' },
        { value: 'h510', label: 'H510' },
        { value: 'a620', label: 'A620' }
    ];

    const typeOfMemoryOptions = [
        { value: 'ddr3', label: 'DDR3' },
        { value: 'ddr4', label: 'DDR4' },
        { value: 'ddr5', label: 'DDR5' }
    ];

    const pciOptions = [
        { value: 3, label: '3.0' },
        { value: 4, label: '4.0' },
        { value: 5, label: '5.0' }
    ];

    const amountOfM2Options = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' }
    ];

    const getSoketOptions = () => {
        return selectedSoket ? soketOptions.find(c => c.value === selectedSoket) : null;
    }

    const getChipsetOptions = () => {
        return selectedChipset ? chipsetOptions.find(c => c.value === selectedChipset) : null;
    }

    const getTypeOfMemoryOptions = () => {
        return selectedTypeOfMemory ? typeOfMemoryOptions.find(c => c.value === selectedTypeOfMemory) : null;
    }

    const getPciOptions = () => {
        return selectedPci ? pciOptions.find(c => c.value === selectedPci) : null;
    }

    const getAmountOfM2 = () => {
        return selectedAmountOfM2 ? amountOfM2Options.find(c => c.value === selectedAmountOfM2) : null;
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
                                    <th className="border border-gray-500 px-4 py-2">Бренд</th>
                                    <th className="border border-gray-500 px-4 py-2">Тип памяти</th>
                                    <th className="border border-gray-500 px-4 py-2">Сокет</th>
                                    <th className="border border-gray-500 px-4 py-2">Чипсет</th>
                                    <th className="border border-gray-500 px-4 py-2">Версия PCI</th>
                                    <th className="border border-gray-500 px-4 py-2">Кол-во M2</th>
                                    <th className="border border-gray-500 px-4 py-2">URL</th>
                                    <th className="border border-gray-500 px-4 py-2">Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {motherboards.map(mb => (
                                    <tr key={mb.id}>
                                        <td className="border border-gray-500 px-4 py-2">{mb.id}</td>
                                        <td className="border border-gray-500 px-4 py-2">{mb.name}</td>
                                        <td className="border border-gray-500 px-4 py-2">{brands.find(brand => brand.id === mb.brand_id)?.name}</td>
                                        <td className="border border-gray-500 px-4 py-2">{mb.type_of_memory}</td>
                                        <td className="border border-gray-500 px-4 py-2">{mb.soket}</td>
                                        <td className="border border-gray-500 px-4 py-2">{mb.chipset}</td>
                                        <td className="border border-gray-500 px-4 py-2">{mb.pci}</td>
                                        <td className="border border-gray-500 px-4 py-2">{mb.amount_of_m2}</td>
                                        <td className="border border-gray-500 px-4 py-2">{mb.url}</td>
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
                                inputValue={inputValue} // Устанавливаем текущее введенное значение
                                onInputChange={(newValue) => setInputValue(newValue)} // Обновляем состояние введенного значения при изменении ввода
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setInputMotherBoardName(selectedOption.value);
                                    } else {
                                        setInputMotherBoardName('');
                                    }
                                    setInputValue(''); // Сбрасываем введенное значение при выборе из списка
                                }}
                                onBlur={() => {
                                    if (inputValue !== "") {
                                        setInputMotherBoardName(inputValue); // Обновляем выбранное значение при потере фокуса, если введено не пустое значение
                                    }
                                    setInputValue(''); // Сбрасываем введенное значение при потере фокуса
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
                                options={brands.map(brand => ({value: brand.id, label: brand.name}))}
                                value={selectedBrand ? {
                                    value: selectedBrand,
                                    label: brands.find(brand => brand.id === selectedBrand)?.name
                                } : null}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedBrand(selectedOption.value);
                                    }
                                }}
                                placeholder="Введите или выберите бренд"
                            />

                            {/* Вывод выбранного бренда */}
                            {selectedBrand && <p className="mb-2">Выбранный
                                бренд: {brands.find(brand => brand.id === selectedBrand)?.name}</p>}
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

                        {/* Поле выбора чипсета */}
                        <div className="mr-4">
                            <Select
                                options={chipsetOptions}
                                value={getChipsetOptions()}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedChipset(selectedOption.value);
                                    }
                                }}
                                placeholder="Выберите чипсет"
                            />
                            {/* Вывод выбранного чипстеа */}
                            {selectedChipset && <p className="mb-2">Выбранный сокет: {selectedChipset}</p>}
                        </div>

                        {/* Поле выбора типа памяти */}
                        <div className="mr-4">
                            <Select
                                options={typeOfMemoryOptions}
                                value={getTypeOfMemoryOptions()}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedTypeOfMemory(selectedOption.value);
                                    }
                                }}
                                placeholder="Выберите тип памяти"
                            />
                            {/* Вывод выбранного чипстеа */}
                            {selectedTypeOfMemory &&
                                <p className="mb-2">Выбранный тип памяти: {selectedTypeOfMemory}</p>}
                        </div>

                        {/* Поле выбора версии PCI */}
                        <div className="mr-4">
                            <Select
                                options={pciOptions}
                                value={getPciOptions()}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedPci(selectedOption.value);
                                    }
                                }}
                                placeholder="Выберите версию PCI"
                            />
                            {/* Вывод выбранного версии PCI */}
                            {selectedPci && <p className="mb-2">Выбранная версия PCI: {selectedPci}</p>}
                        </div>

                        {/* Поле выбора кол-во M2 */}
                        <div className="mr-4">
                            <Select
                                options={amountOfM2Options}
                                value={getAmountOfM2()}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedAmountOfM2(selectedOption.value);
                                    }
                                }}
                                placeholder="Выберите кол-во M2"
                            />
                            {/* Вывод выбранного версии PCI */}
                            {selectedAmountOfM2 && <p className="mb-2">Выбранно кол-во M2: {selectedAmountOfM2}</p>}
                        </div>

                        <input
                            type="text"
                            value={inputedUrl || ''}
                            onChange={handleUrlInputChange}
                            placeholder="Введите URL"
                        />
                        {inputedUrl && <p>Введенный URL: {inputedUrl}</p>}
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
