import React, {useCallback, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {IBrand, IProcessor, ISoket} from "../data/models";
import Select from "react-select";
import ErrorMessage from "./subcomponents/ErrorMessage";
import UrlInput from "./subcomponents/UrlImput";
import SelectFormSql from "./subcomponents/SelectFromSql";
import SelectValueString from "./subcomponents/SelectValueString";
import SelectValueNumber from "./subcomponents/SelectValueNumber";


export function Processor() {
    const [selectedProcessor, setSelectedProcessor] = useState<string | null>(null);
    const [isAddingProcessor, setIsAddingProcessor] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [selectedSoket, setSelectedSoket] = useState<number | null>(null);

    const [inputProcessorName, setInputProcessorName] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');

    const [selectedTypeOfMemory, setSelectedTypeOfMemory] = useState<string | null>(null);
    const [selectedCore, setSelectedCore] = useState<number | null>(null);
    const [selectedThreads, setSelectedThreads] = useState<number | null>(null);
    const [selectedTurboBust, setSelectedTurboBust] = useState<number | null>(null);

    const [inputedUrl, setInputedUrl] = useState<string>('');

    const [brands, setBrands] = useState<IBrand[]>([]);
    const [sokets, setSoket] = useState<ISoket[]>([]);
    const [processors, setProcessors] = useState<IProcessor[]>([]);

    const [selectsOpen, setSelectsOpen] = useState({
        brand: false,
        soket: false,
    });

    // todo Порешать что-то с дублированием кода

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
            const response = await axios.get('http://localhost:8080/api/v1/processor');
            setProcessors(response.data);
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
        fetchData();
        fetchBrands();
        fetchSoket();
    }, []);

    const handleUrlInputChange = (value: string) => {
        setInputedUrl(value);
    };

    const handleProcessorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProcessor(event.target.value);
    };

    const clearError = () => {
        setError('');
    };

    const handleAddProcessorClick = () => {
        setIsAddingProcessor(prevState => !prevState);
    };

    const handleSaveNewProcessor = async () => {
        try {
            // Проверка наличия обязательных полей
            if (!selectedBrand || !selectedSoket || !selectedTypeOfMemory || !selectedCore || !selectedThreads || !inputedUrl) {
                setError('Ошибка: заполните все обязательные поля');
                return;
            }

            const url = `http://localhost:8080/api/v1/processor/save_processor`;
            const params = new URLSearchParams({
                brand_id: String(selectedBrand),
                soket_id: String(selectedSoket),
            });

            const processorData = {
                name: inputProcessorName, // Предполагается, что у вас есть поле для ввода имени процессора
                type_of_memory: selectedTypeOfMemory,
                core: selectedCore,
                threads: selectedThreads,
                turbo_bust: selectedTurboBust,
                url: inputedUrl
            };

            const response = await axios.post(`${url}?${params}`, processorData);

            fetchData();
            console.log('New processor added:', response.data);
            clearError();
            // Сбрасываем выбранные опции Select на null
            setSelectedBrand(null);
            setSelectedSoket(null);
            setSelectedTypeOfMemory(null);
            setSelectedCore(null);
            setSelectedThreads(null);
            setSelectedTurboBust(null);
            setInputedUrl('');
        } catch (error) {
            console.error('Error adding new processor:', error);
            setError('Ошибка при добавлении нового процессора. Пожалуйста, повторите попытку позже.');
        }
    };


    const typeOfMemoryOptions = [
        {value: 'ddr3', label: 'DDR3'},
        {value: 'ddr4', label: 'DDR4'},
        {value: 'ddr5', label: 'DDR5'}
    ];

    const coreOptions: { value: number, label: string }[] = [];
    for (let i = 1; i <= 24; i++) {
        coreOptions.push({ value: i, label: `${i}` });
    }

    const threadsOptions: { value: number, label: string }[] = [];
    for (let i = 1; i <= 48; i++) {
        threadsOptions.push({ value: i, label: `${i}` });
    }

    const turboBustOptions: { value: number, label: string }[] = [];
    for (let i = 1; i <= 70; i++) {
        turboBustOptions.push({ value: i / 10, label: `${i / 10}` });
    }

    const getTypeOfMemoryOptions = () => {
        return selectedTypeOfMemory ? typeOfMemoryOptions.find(c => c.value === selectedTypeOfMemory) : null;
    }

    const getCoreOptions = () => {
        return selectedCore ? coreOptions.find(c => c.value === selectedCore) : null;
    };

    const getThreadsOptions = () => {
        return selectedThreads ? threadsOptions.find(c => c.value === selectedThreads) : null;
    }

    const getTurboBustOptions = () => {
        return selectedTurboBust ? turboBustOptions.find(c => c.value === selectedTurboBust) : null;
    }

    return (
        // todo Добавть табилцу
        <div className="border p-4 rounded flex flex-col items-center mb-2">
            <select value={selectedProcessor || ''} onChange={handleProcessorChange}
                    className="border rounded px-2 py-1 mb-2">
                <option value="">Выберите процессор</option>
                {processors.map(mb => (
                    <option key={mb.id} value={mb.name}>{mb.name}</option>
                ))}
            </select>
            {selectedProcessor && <p className="mb-2">Выбранный процессор: {selectedProcessor}</p>}

            <button
                className={`border rounded px-6 py-1 ${isAddingProcessor ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"} transition-colors`}
                onClick={handleAddProcessorClick}
            >
                Добавить новый процессор
            </button>


            {isAddingProcessor && (
                <div className="border flex flex-col items-center p-4 mt-2">

                    <div className="flex flex-wrap justify-center items-center">

                        {/* Поле выбора материнской платы */}
                        <div className="mb-4 mr-4">
                            <label htmlFor="processor" className="mr-2">Процессор: </label>
                            <Select
                                id="processor"
                                options={processors.map(processor => ({
                                    value: processor.name,
                                    label: processor.name
                                }))}
                                value={inputProcessorName ? {
                                    value: inputProcessorName,
                                    label: inputProcessorName
                                } : null}
                                inputValue={inputValue}
                                onInputChange={(newValue) => setInputValue(newValue)}
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        setInputProcessorName(selectedOption.value);
                                    } else {
                                        setInputProcessorName('');
                                    }
                                    setInputValue('');
                                }}
                                onBlur={() => {
                                    if (inputValue !== "") {
                                        setInputProcessorName(inputValue);
                                    }
                                    setInputValue('');
                                }}
                                placeholder="Выберите или введите"
                                className="w-full"
                            />
                        </div>

                        {/* Поле выбора бренда */}
                        <SelectFormSql
                            id="brand"
                            options={brands.map(brand => ({
                                value: brand.id,
                                label: brand.name || ''
                            }))}
                            value={selectedBrand ? {
                                value: selectedBrand,
                                label: brands.find(brand => brand.id === selectedBrand)?.name || ''
                            } : null}
                            onChange={(selectedOption) => {
                                if (selectedOption !== null) {
                                    setSelectedBrand(parseInt(selectedOption.value as string, 10)); // Преобразуем значение к числу
                                }
                            }}
                            isOpen={selectsOpen.brand}
                            onMenuOpen={() => setSelectsOpen(prevState => ({...prevState, brand: true}))}
                            onMenuClose={() => setSelectsOpen(prevState => ({...prevState, brand: false}))}
                            placeholder="Бренд"
                        />

                        <SelectFormSql
                            id="soket"
                            options={sokets.map(soket => ({
                                value: soket.id,
                                label: soket.name || ''
                            }))}
                            value={selectedSoket ? {
                                value: selectedSoket,
                                label: sokets.find(soket => soket.id === selectedSoket)?.name || ''
                            } : null}
                            onChange={(selectedOption) => {
                                if (selectedOption !== null) {
                                    setSelectedSoket(parseInt(selectedOption.value as string, 10)); // Преобразуем значение к числу
                                }
                            }}
                            isOpen={selectsOpen.soket}
                            onMenuOpen={() => setSelectsOpen(prevState => ({...prevState, soket: true}))}
                            onMenuClose={() => setSelectsOpen(prevState => ({...prevState, soket: false}))}
                            placeholder="Сокет"
                        />


                        {/* Поле выбора типа памяти */}
                        <SelectValueString
                            id="memory"
                            options={typeOfMemoryOptions}
                            value={getTypeOfMemoryOptions() ?? null}
                            onChange={(selectedOption) => {
                                if (selectedOption !== null) {
                                    setSelectedTypeOfMemory(selectedOption.value);
                                }
                            }}
                            placeholder="Выберите"
                            className="w-full"
                        />

                        {/* Поле выбора кол-во Core */}
                        <SelectValueNumber
                            id="core"
                            options={coreOptions}
                            value={getCoreOptions() ?? null}
                            onChange={(selectedOption) => {
                                if (selectedOption !== null) {
                                    setSelectedCore(selectedOption.value);
                                }
                            }}
                            placeholder="Выберите"
                            labelText="Кол-во ядер"
                            className="w-full"
                        />

                        {/* Поле выбора кол-во Threads*/}
                        <SelectValueNumber
                            id="m2"
                            options={threadsOptions}
                            value={getThreadsOptions() ?? null}
                            onChange={(selectedOption) => {
                                if (selectedOption !== null) {
                                    setSelectedThreads(selectedOption.value);
                                }
                            }}
                            placeholder="Выберите"
                            labelText="Кол-во потоков"
                            className="w-full"
                        />

                        {/* Поле выбора кол-во TurboBust*/}
                        <SelectValueNumber
                            id="turboBust"
                            options={turboBustOptions}
                            value={getTurboBustOptions() ?? null}
                            onChange={(selectedOption) => {
                                if (selectedOption !== null) {
                                    setSelectedTurboBust(selectedOption.value);
                                }
                            }}
                            placeholder="Выберите"
                            labelText="Частота в турбобусте"
                            className="w-full"
                        />

                        <UrlInput value={inputedUrl} onChange={handleUrlInputChange}/>
                    </div>


                    {error &&
                        <ErrorMessage error={error}/>} {/* Используем компонент ErrorMessage для вывода ошибки */}
                    <button
                        className="border rounded px-6 py-1 bg-sky-600 hover:bg-sky-700 transition-colors"
                        onClick={handleSaveNewProcessor}
                    >
                        Сохранить
                    </button>
                </div>
            )}
        </div>
    );
}