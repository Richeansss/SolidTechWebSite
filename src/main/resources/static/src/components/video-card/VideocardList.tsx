import React, { useEffect, useState } from 'react';
import { useGetVideocardsQuery } from '../../store/api/apiVideoCard';
import './CardList.css';
import {useGetPCsQuery} from "../../store/api/apiPC";

const VideocardList = () => {
    const { data, isLoading, isError } = useGetPCsQuery(); // Получаем данные о видеокартах

    const [videocards, setVideocards] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            const formattedVideocards = data.map((pc) => ({
                id: pc.id,
                price: pc.price,
                case_pc: pc.case_pc,
                videocard: pc.videocard,
                motherBoard: pc.motherBoard,
                storageDevice: pc.storageDevice,
                processor: pc.processor,
                ram: pc.ram,
                imageUrl: pc.imageUrl, // URL изображения
            }));
            setVideocards(formattedVideocards);
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
                    <div className="image-container">
                        <img
                            src={pc.imageUrl}
                            alt={pc.name}
                            className="videocard-image"
                        />
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

export default VideocardList;
