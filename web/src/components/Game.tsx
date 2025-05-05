import React, { useEffect, useState  } from "react";
import axios from "axios";
import { IGame } from "../data/models";
import IdNameTable from "./Table/IdNameTable";

export function Game() {
    const [newGameName, setNewGameName] = useState<string>('');
    const [isAddingGame, setIsAddingGame] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [games, setGames] = useState<IGame[]>([]);



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/game');
            setGames(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Ошибка при загрузке данных. Пожалуйста, повторите попытку позже.');
        }
    };

    const clearError = () => {
        setError('');
    };

    const handleAddGameClick = () => {
        setIsAddingGame(prevState => !prevState); // Переключение состояния при нажатии кнопки
    };

    const handleNewGameNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewGameName(event.target.value);
    };

    const checkGameExists = async (gameName: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/game/${gameName}`);
            return response.data.id !== undefined; // Если существует поле "id" в ответе, значит, игра существует
        } catch (error) {
            console.error('Error checking game existence:', error);
            return false;
        }
    };

    const handleSaveNewGame = async () => {
        try {
            if (!newGameName.trim()) {
                setError('Ошибка: пустое поле названия игрыа');
                return;
            }

            const gameExists = await checkGameExists(newGameName);
            if (gameExists) {
                setError('Ошибка: игры с таким именем уже существует');
                return;
            }

            // Если игра с таким именем не существует, сохраняем новый игру
            const response = await axios.post('http://localhost:8080/api/v1/game/save_game', {
                name: newGameName
            });
            console.log('New game added:', response.data);
            setNewGameName('');
            fetchData(); // Обновляем список брендов после добавления нового
            clearError(); // Очищаем сообщение об ошибке после успешного сохранения
        } catch (error) {
            console.error('Error adding new game:', error);
            setError('Ошибка при добавлении нового бренда. Пожалуйста, повторите попытку позже.');
        }
    };


    return (
        <div className="border p-4 rounded flex flex-col items-center mb-2">

            <button
                className={`border rounded px-6 py-1 ${isAddingGame ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"} transition-colors`}
                onClick={handleAddGameClick}
            >
                Добавить новую игру
            </button>

            {isAddingGame && (

                <div className="border flex flex-col items-center p-4 mt-2">
                    <IdNameTable data={games} tableName={"Список Игр"}></IdNameTable>

                    <input
                        className="border rounded px-2 py-1 mb-2"
                        type="text"
                        value={newGameName}
                        onChange={handleNewGameNameChange}
                        placeholder="Введите название игрыа"
                    />
                    {error && <p className="text-red-600 mb-2">{error}</p>} {/* Отображение сообщения об ошибке */}
                    <button
                        className="border rounded px-6 py-1 bg-sky-600 hover:bg-sky-700 transition-colors"
                        onClick={handleSaveNewGame}
                    >
                        Сохранить
                    </button>
                </div>            )}
        </div>
    )
}
