import React, { useEffect, useState  } from "react";
import Select  from 'react-select';
import axios from "axios";
import { IBrand } from "../data/models";

export function Brand() {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [newBrandName, setNewBrandName] = useState<string>('');
    const [isAddingBrand, setIsAddingBrand] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [brands, setBrands] = useState<IBrand[]>([]);



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/brand');
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Ошибка при загрузке данных. Пожалуйста, повторите попытку позже.');
        }
    };

    const handleDeleteBrand = async (brandId: number) => {
        try {
            // Отправляем запрос на удаление бренда с указанным id
            await axios.delete(`http://localhost:8080/api/v1/brand/delete_brand/${brandId}`);

            // После успешного удаления обновляем список брендов
            const updatedBrands = brands.filter(brand => brand.id !== brandId);
            setBrands(updatedBrands);
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    };


    const clearError = () => {
        setError('');
    };

    const handleAddBrandClick = () => {
        setIsAddingBrand(prevState => !prevState); // Переключение состояния при нажатии кнопки
    };

    const handleNewBrandNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBrandName(event.target.value);
    };

    const checkBrandExists = async (brandName: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/brand/${brandName}`);
            return response.data.id !== undefined; // Если существует поле "id" в ответе, значит, бренд существует
        } catch (error) {
            console.error('Error checking brand existence:', error);
            return false;
        }
    };

    const handleSaveNewBrand = async () => {
        try {
            if (!newBrandName.trim()) {
                setError('Ошибка: пустое поле названия бренда');
                return;
            }

            const brandExists = await checkBrandExists(newBrandName);
            if (brandExists) {
                setError('Ошибка: бренд с таким именем уже существует');
                return;
            }

            // Если бренд с таким именем не существует, сохраняем новый бренд
            const response = await axios.post('http://localhost:8080/api/v1/brand/save_brand', {
                name: newBrandName
            });
            console.log('New brand added:', response.data);
            setNewBrandName('');
            fetchData(); // Обновляем список брендов после добавления нового
            clearError(); // Очищаем сообщение об ошибке после успешного сохранения
        } catch (error) {
            console.error('Error adding new brand:', error);
            setError('Ошибка при добавлении нового бренда. Пожалуйста, повторите попытку позже.');
        }
    };


    return (
        <div className="border p-4 rounded flex flex-col items-center mb-2">
            <Select
                options={brands.map(brand => ({ value: brand.name, label: brand.name }))}
                value={selectedBrand ? { value: selectedBrand, label: selectedBrand } : null}
                onChange={(selectedOption) => {
                    if (selectedOption !== null) {
                        setSelectedBrand(selectedOption.value);
                    }
                }}
                placeholder="Введите или выберите бренд"
            />

            {/* Вывод выбранного бренда */}
            {selectedBrand && <p className="mb-2">Выбранный бренд: {selectedBrand}</p>}

            <button
                className={`border rounded px-6 py-1 ${isAddingBrand ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"} transition-colors`}
                onClick={handleAddBrandClick}
            >
                Добавить новый бренд
            </button>

            {isAddingBrand && (

                <div className="border flex flex-col items-center p-4 mt-2">
                    {brands.length > 0 && (
                        <div>
                            <h2 className="mt-4">Список брендов</h2>
                            <table className="border-collapse border border-gray-500 mt-2">
                                <thead>
                                <tr>
                                    <th className="border border-gray-500 px-4 py-2">ID</th>
                                    <th className="border border-gray-500 px-4 py-2">Название</th>
                                    <th className="border border-gray-500 px-4 py-2">Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {brands.map(brand => (
                                    <tr key={brand.id}>
                                        <td className="border border-gray-500 px-4 py-2">{brand.id}</td>
                                        <td className="border border-gray-500 px-4 py-2">{brand.name}</td>
                                        <td className="border border-gray-500 px-4 py-2">
                                            <button className="border rounded px-4 py-1 bg-red-500 hover:bg-red-600 transition-colors" onClick={() => handleDeleteBrand(brand.id)}>Удалить</button>
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
                        value={newBrandName}
                        onChange={handleNewBrandNameChange}
                        placeholder="Введите название бренда"
                    />
                    {error && <p className="text-red-600 mb-2">{error}</p>} {/* Отображение сообщения об ошибке */}
                    <button
                        className="border rounded px-6 py-1 bg-sky-600 hover:bg-sky-700 transition-colors"
                        onClick={handleSaveNewBrand}
                    >
                        Сохранить
                    </button>
                </div>
            )}
        </div>
    )
}
