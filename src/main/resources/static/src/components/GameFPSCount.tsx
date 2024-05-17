import React, { useState, useEffect } from "react";
import axios from "axios";

export function GameFPSCount() {
    const [selectedGame, setSelectedGame] = useState<number | null>(null);
    const [selectedFPSBuild, setSelectedFPSBuild] = useState<number | null>(null);
    const [fpsCount, setFpsCount] = useState<number>(0);
    const [games, setGames] = useState<any[]>([]);
    const [fpsBuilds, setFPSBuilds] = useState<any[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchGames();
        fetchFPSBuilds();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/game');
            setGames(response.data);
        } catch (error) {
            handleError(error, 'Ошибка при загрузке данных игр. Пожалуйста, повторите попытку позже.');
        }
    };

    const fetchFPSBuilds = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/fpsBuild');
            setFPSBuilds(response.data);
        } catch (error) {
            handleError(error, 'Ошибка при загрузке данных FPSBuild. Пожалуйста, повторите попытку позже.');
        }
    };

    const handleSave = async () => {
        try {
            if (!selectedGame) {
                setError('Пожалуйста, выберите игру');
                return;
            }

            if (!selectedFPSBuild) {
                setError('Пожалуйста, выберите FPSBuild');
                return;
            }

            // Сохраняем новую запись GameFPSCount
            const response = await axios.post(`http://localhost:8080/api/v1/fpsbuild/${selectedFPSBuild}/games/${selectedGame}`, null, {
                params: { fpsCount }
            });
            console.log('New GameFPSCount added:', response.data);
            // Очищаем поля после успешного сохранения
            setSelectedGame(null);
            setSelectedFPSBuild(null);
            setFpsCount(0);
            setError('');
            // Обновляем список игр и FPSBuild после добавления новой записи
            fetchGames();
            fetchFPSBuilds();
        } catch (error) {
            handleError(error, 'Ошибка при добавлении новой записи GameFPSCount. Пожалуйста, повторите попытку позже.');
        }
    };

    const handleError = (error: unknown, defaultErrorMessage: string) => {
        console.error('Error:', error);
        if (axios.isAxiosError(error) && error.response) {
            setError(`${error.response.data.message}: ${error.response.data.details}`);
        } else {
            setError(defaultErrorMessage);
        }
    };

    return (
        <div className="border p-4 rounded flex flex-col items-center mb-2">
            <h2 className="text-3xl font-bold mb-4">Добавить новый GameFPSCount</h2>

            <select className="border rounded px-2 py-1 mb-2" onChange={(e) => setSelectedFPSBuild(Number(e.target.value))} value={selectedFPSBuild || ''}>
                <option value="">Выберите FPSBuild</option>
                {fpsBuilds.map((fpsBuild: any) => (
                    <option key={fpsBuild.id} value={fpsBuild.id}>{fpsBuild.name}</option>
                ))}
            </select>

            <select className="border rounded px-2 py-1 mb-2" onChange={(e) => setSelectedGame(Number(e.target.value))} value={selectedGame || ''}>
                <option value="">Выберите игру</option>
                {games.map((game: any) => (
                    <option key={game.id} value={game.id}>{game.name}</option>
                ))}
            </select>

            <input
                className="border rounded px-2 py-1 mb-2"
                type="number"
                value={fpsCount}
                onChange={(e) => setFpsCount(Number(e.target.value))}
                placeholder="Введите количество FPS"
            />

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <button
                className="border rounded px-6 py-1 bg-sky-600 hover:bg-sky-700 transition-colors"
                onClick={handleSave}
            >
                Сохранить
            </button>
        </div>
    )
}
