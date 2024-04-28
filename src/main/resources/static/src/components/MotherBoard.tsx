import React, {useCallback, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {IBrand, IMotherBoard, ISoket} from "../data/models";
import Select from "react-select";
import MotherboardsTable from "./Table/MotherBoardTable";
import ErrorMessage from "./subcomponents/ErrorMessage";

export function MotherBoard() {
    const [selectedMotherBoard, setSelectedMotherBoard] = useState<string | null>(null);
    const [isAddingMotherBoard, setIsAddingMotherBoard] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [inputMotherBoardName, setInputMotherBoardName] = useState<string>('');
    const [selectedSoket, setSelectedSoket] = useState<number | null>(null);
    const [selectedChipset, setSelectedChipset] = useState<number | null>(null);
    const [selectedTypeOfMemory, setSelectedTypeOfMemory] = useState<string | null>(null);
    const [selectedPci, setSelectedPci] = useState<number | null>(null);
    const [selectedAmountOfM2, setSelectedAmountOfM2] = useState<number | null>(null);
    const [inputedUrl, setInputedUrl] = useState<string>('');

    const [inputValue, setInputValue] = useState<string>('');

    const [brands, setBrands] = useState<IBrand[]>([]);
    const [sokets, setSoket] = useState<ISoket[]>([]);
    const [chipsets, setChipset] = useState<ISoket[]>([]);
    const [motherboards, setMotherBoards] = useState<IMotherBoard[]>([]);

    // Состояния для отслеживания открытия каждого селекта
    const [selectsOpen, setSelectsOpen] = useState({
        brand: false,
        soket: false,
        chipset: false
    });


    const handleRequestError = useCallback((error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;
            if (status === 404) {
                setError('Ошибка: данные не найдены. Пожалуйста, проверьте корректность запроса.');
            } else if (status === 403) {
                setError('Ошибка: доступ запрещен. Обратитесь к администратору для получения дополнительной информации.');
            } else if (status === 500) {
                setError('Ошибка: внутренняя ошибка сервера. Пожалуйста, повторите попытку позже или обратитесь к администратору.');
            } else {
                setError(`Произошла ошибка: ${error.message}`);
            }
        } else if (error.request) {
            setError('Ошибка: запрос не был выполнен. Проверьте ваше интернет-соединение и повторите попытку.');
        } else {
            setError('Произошла ошибка: ' + error.message);
        }
    }, []);


    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/motherboard');
            setMotherBoards(response.data);
        } catch (error: any) {
            handleRequestError(error);
        }
    }, [handleRequestError]);

    const fetchBrands = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/brand');
            setBrands(response.data);
        } catch (error: any) {
            handleRequestError(error);
        }
    }, [handleRequestError]);

    const fetchSoket = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/soket');
            setSoket(response.data);
        } catch (error: any) {
            handleRequestError(error);
        }
    }, [handleRequestError]);

    const fetchChipset = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/chipset');
            setChipset(response.data);
        } catch (error: any) {
            handleRequestError(error);
        }
    }, [handleRequestError]);

    useEffect(() => {
        if (selectsOpen.brand) {
            fetchBrands();
        }
    }, [selectsOpen.brand, fetchBrands]);

    useEffect(() => {
        if (selectsOpen.soket) {
            fetchSoket();
        }
    }, [selectsOpen.soket, fetchSoket]);

    useEffect(() => {
        if (selectsOpen.chipset) {
            fetchChipset();
        }
    }, [selectsOpen.chipset, fetchChipset]);


    useEffect(() => {
        fetchData();
        fetchBrands();
        fetchSoket();
        fetchChipset();
    }, []);

    const handleUrlInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputedUrl(event.target.value);
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

    const handleSaveNewMotherBoard = async () => {
        try {
            if (!inputMotherBoardName.trim()) {
                setError('Ошибка: пустое поле названия материнской платы');
                return;
            }

            const response = await axios.post(`http://localhost:8080/api/v1/motherboard/save_motherboard?brand_id=${selectedBrand}&soket_id=${selectedSoket}&chipset_id=${selectedChipset}`, {
                name: inputMotherBoardName,
                type_of_memory: selectedTypeOfMemory,
                pci: selectedPci,
                amount_of_mem: selectedAmountOfM2,
                url: inputedUrl
            });

            fetchData();
            console.log('New motherboard added:', response.data);
            clearError();
            // Сбрасываем выбранные опции Select на null
            setSelectedBrand(null);
            setInputMotherBoardName('');
            setSelectedSoket(null);
            setSelectedChipset(null);
            setSelectedTypeOfMemory(null);
            setSelectedPci(null);
            setSelectedAmountOfM2(null);
            setInputedUrl('');
        } catch (error) {
            console.error('Error adding new motherboard:', error);
            setError('Ошибка при добавлении новой материнской платы. Пожалуйста, повторите попытку позже.');
        }
    };

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

    const getTypeOfMemoryOptions = () => {
        return selectedTypeOfMemory ? typeOfMemoryOptions.find(c => c.value === selectedTypeOfMemory) : null;
    }

    const getPciOptions = () => {
        return selectedPci ? pciOptions.find(c => c.value === selectedPci) : null;
    };

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
                    <MotherboardsTable motherboards={motherboards} />

                    <div className="flex flex-wrap justify-center items-center">

                        {/* Поле выбора материнской платы */}
                        <div className="mb-4 mr-4">
                            <label htmlFor="motherboard" className="mr-2">Материнская плата:</label>
                            <Select
                                id="motherboard"
                                options={motherboards.map(board => ({value: board.name, label: board.name}))}
                                value={inputMotherBoardName ? {
                                    value: inputMotherBoardName,
                                    label: inputMotherBoardName
                                } : null}
                                inputValue={inputValue}
                                onInputChange={(newValue) => setInputValue(newValue)}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setInputMotherBoardName(selectedOption.value);
                                    } else {
                                        setInputMotherBoardName('');
                                    }
                                    setInputValue('');
                                }}
                                onBlur={() => {
                                    if (inputValue !== "") {
                                        setInputMotherBoardName(inputValue);
                                    }
                                    setInputValue('');
                                }}
                                placeholder="Выберите или введите"
                                className="w-full"
                            />
                        </div>

                        {/* Поле выбора бренда */}
                        <div className="mb-4 mr-4">
                            <label htmlFor="brand" className="mr-2">Бренд:</label>
                            <Select
                                id="brand"
                                options={brands.map(brand => ({value: brand.id, label: brand.name}))}
                                value={selectedBrand ? {
                                    value: selectedBrand,
                                    label: brands.find(brand => brand.id === selectedBrand)?.name // Используйте безопасный доступ ?.name
                                } : null}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedBrand(selectedOption.value);
                                    }
                                }}
                                menuIsOpen={selectsOpen.brand}
                                onMenuOpen={() => setSelectsOpen(prevState => ({ ...prevState, brand: true }))}
                                onMenuClose={() => setSelectsOpen(prevState => ({ ...prevState, brand: false }))}
                                placeholder="Выберите или введите"
                                className="w-full"
                            />
                        </div>

                        {/* Поле выбора сокета */}
                        <div className="mb-4 mr-4">
                            <label htmlFor="soket" className="mr-2">Сокет:</label>
                            <Select
                                id="soket"
                                options={sokets.map(soket => ({value: soket.id, label: soket.name}))}
                                value={selectedSoket ? {
                                    value: selectedSoket,
                                    label: sokets.find(soket => soket.id === selectedSoket)?.name
                                } : null}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedSoket(selectedOption.value);
                                    }
                                }}
                                menuIsOpen={selectsOpen.soket}
                                onMenuOpen={() => setSelectsOpen(prevState => ({ ...prevState, soket: true }))}
                                onMenuClose={() => setSelectsOpen(prevState => ({ ...prevState, soket: false }))}
                                placeholder="Выберите или введите"
                                className="w-full"
                            />
                        </div>

                        {/* Поле выбора чипсета*/}
                        <div className="mb-4 mr-4">
                            <label htmlFor="chipset" className="mr-2">Чипсет:</label>
                            <Select
                                id="chipset"
                                options={chipsets.map(chipset => ({value: chipset.id, label: chipset.name}))}
                                value={selectedChipset ? {
                                    value: selectedChipset,
                                    label: chipsets.find(chipset => chipset.id === selectedChipset)?.name
                                } : null}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedChipset(selectedOption.value);
                                    }
                                }}
                                menuIsOpen={selectsOpen.chipset}
                                onMenuOpen={() => setSelectsOpen(prevState => ({ ...prevState, chipset: true }))}
                                onMenuClose={() => setSelectsOpen(prevState => ({ ...prevState, chipset: false }))}
                                placeholder="Выберите или введите"
                                className="w-full"
                            />
                        </div>

                        {/* Поле выбора типа памяти */}
                        <div className="mb-4 mr-4">
                            <label htmlFor="memory" className="mr-2">Тип памяти:</label>
                            <Select
                                id="memory"
                                options={typeOfMemoryOptions}
                                value={getTypeOfMemoryOptions()}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedTypeOfMemory(selectedOption.value);
                                    }
                                }}
                                placeholder="Выберите"
                                className="w-full"
                            />
                        </div>

                        {/* Поле выбора версии PCI */}
                        <div className="mb-4 mr-4">
                            <label htmlFor="pci" className="mr-2">Версия PCI:</label>
                            <Select
                                id="pci"
                                options={pciOptions}
                                value={getPciOptions()}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedPci(selectedOption.value);
                                    }
                                }}
                                placeholder="Выберите"
                                className="w-full"
                            />
                        </div>

                        {/* Поле выбора кол-во M2 */}
                        <div className="mb-4 mr-4">
                            <label htmlFor="m2" className="mr-2">Кол-во M2:</label>
                            <Select
                                id="m2"
                                options={amountOfM2Options}
                                value={getAmountOfM2()}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setSelectedAmountOfM2(selectedOption.value);
                                    }
                                }}
                                placeholder="Выберите"
                                className="w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="url" className="mr-2">URL:</label>
                            <input
                                id="url"
                                type="text"
                                value={inputedUrl || ''}
                                onChange={handleUrlInputChange}
                                placeholder="Введите URL"
                                className="border rounded px-2 py-1"
                            />
                        </div>

                    </div>


                    {error && <ErrorMessage error={error} />} {/* Используем компонент ErrorMessage для вывода ошибки */}
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