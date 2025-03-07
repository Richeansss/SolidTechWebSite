import React, { useEffect, useState } from 'react';
import { useGetVideocardsQuery } from '../../store/api/apiVideoCard';
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import './CardList.css';
import {useGetPCsQuery} from "../../store/api/apiPC";

const PCList = () => {
    const { data, isLoading, isError } = useGetPCsQuery(); // Получаем данные о видеокартах

    const [videocards, setVideocards] = useState<any[]>([]);
    const navigate = useNavigate(); // Хук для навигации


    useEffect(() => {
        if (data) {
            const formattedPCs = data.map((pc) => ({
                id: pc.id,
                price: pc.price,
                case_pc: pc.casePc,
                videocard: pc.videocard,
                motherBoard: pc.motherBoard,
                storageDevice: pc.storageDevice,
                processor: pc.processor,
                ram: pc.ram,
                imagesUrl: pc.imagesUrl, // URL изображения

            }));
            setVideocards(formattedPCs);
        }
    }, [data]);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (isError) {
        return <div className="error">Error loading data</div>;
    }


    return (
        <div className="videocard-list">
            {videocards.map((pc) => (
                <div key={pc.id} className="videocard-card">
                    <div className="image-container-main" onClick={() => navigate(`/pc/${pc.id}`)}>
                        {pc.imagesUrl.length > 0 ? (
                            <>
                                <img
                                    src={`http://localhost:3000${pc.imagesUrl[0]}`} // Используем первое изображение
                                    alt={`{pc}`}
                                    className="pc-image-main"
                                />
                            </>
                        ) : (
                            <p>Изображения отсутствуют</p>
                        )}
                    </div>
                    <div className="text-container">
                        <h3>{pc.price} ₽</h3>
                        <div className="info-box">
                            <img src="/icons/gpu.png" alt="GPU" className="icon"/>
                            <span>Видеокарта<br/> {pc.videocard.name} GB</span>
                        </div>
                        <div className="info-box">
                            <img src="/icons/cpu.png" alt="CPU" className="icon"/>
                            <span>Процессор<br/> {pc.processor.name}</span>
                        </div>
                        <div className="info-box">
                            <img src="/icons/motherboard.png" alt="Motherboard" className="icon"/>
                            <span>Материнская плата<br/> {pc.motherBoard.name}</span>
                        </div>
                        <div className="info-box">
                            <img src="/icons/ram.png" alt="RAM" className="icon"/>
                            <span>Оперативная память<br/> {pc.ram.amountRam * pc.ram.moduleCapacity}GB {pc.ram.name}</span>
                        </div>
                        <div className="info-box">
                            <img src="/icons/ssd.png" alt="HDD" className="icon"/>
                            <span>Накопитель<br/> {pc.storageDevice.capacityGb}GB {pc.storageDevice.name}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PCList;
