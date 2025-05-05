import React, { useEffect, useState  } from "react";
import axios from "axios";
import { IFPSBuild } from "../data/models";
import IdNameTable from "./Table/IdNameTable";
import FPSBuildTable from "./Table/FPSBuildTable";

export function FPSBuild() {
    const [newFPSBuildName, setNewFPSBuildName] = useState<string>('');
    const [isAddingFPSBuild, setIsAddingFPSBuild] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [fpsBuilds, setFPSBuilds] = useState<IFPSBuild[]>([]);



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/fpsBuild');
            setFPSBuilds(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Ошибка при загрузке данных. Пожалуйста, повторите попытку позже.');
        }
    };

    const clearError = () => {
        setError('');
    };

    const handleAddFPSBuildClick = () => {
        setIsAddingFPSBuild(prevState => !prevState); // Переключение состояния при нажатии кнопки
    };

    const handleNewFPSBuildNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewFPSBuildName(event.target.value);
    };

    /*const checkFPSBuildExists = async (fpsBuildsName: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/fpsBuild/${fpsBuildsName}`);
            return response.data.id !== undefined; // Если существует поле "id" в ответе, значит, игра существует
        } catch (error) {
            console.error('Error checking fpsBuilds existence:', error);
            return false;
        }
    };
    // todo Надо сюда вставить потом проверку с процом и видеокартрой
    */

    const handleSaveNewFPSBuild = async () => {
        try {
            /*
            if (!newFPSBuildName.trim()) {
                setError('Ошибка: пустое поле названия игрыа');
                return;
            }
             */

            // Если игра с таким именем не существует, сохраняем новый игру
            const response = await axios.post('http://localhost:8080/api/v1/fpsBuild/save_fpsBuild', {
            });
            console.log('New fpsBuilds added:', response.data);
            setNewFPSBuildName('');
            fetchData(); // Обновляем список брендов после добавления нового
            clearError(); // Очищаем сообщение об ошибке после успешного сохранения
        } catch (error) {
            console.error('Error adding new fpsBuilds:', error);
            setError('Ошибка при добавлении нового бренда. Пожалуйста, повторите попытку позже.');
        }
    };


    return (
        <div className="border p-4 rounded flex flex-col items-center mb-2">

            <button
                className={`border rounded px-6 py-1 ${isAddingFPSBuild ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"} transition-colors`}
                onClick={handleAddFPSBuildClick}
            >
                Добавить новую игру
            </button>

            {isAddingFPSBuild && (

                <div className="border flex flex-col items-center p-4 mt-2">
                    <FPSBuildTable data={fpsBuilds} tableName={"Список Игр"}></FPSBuildTable>

                    <input
                        className="border rounded px-2 py-1 mb-2"
                        type="text"
                        value={newFPSBuildName}
                        onChange={handleNewFPSBuildNameChange}
                        placeholder="Введите название игрыа"
                    />
                    {error && <p className="text-red-600 mb-2">{error}</p>} {/* Отображение сообщения об ошибке */}
                    <button
                        className="border rounded px-6 py-1 bg-sky-600 hover:bg-sky-700 transition-colors"
                        onClick={handleSaveNewFPSBuild}
                    >
                        Сохранить
                    </button>
                </div>            )}
        </div>
    )
}
