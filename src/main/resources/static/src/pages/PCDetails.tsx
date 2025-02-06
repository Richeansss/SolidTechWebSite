import React from "react";
// import "./PCDetails.css";
import { useParams } from "react-router-dom";
import {useGetPCsQuery} from "../store/api/apiPC";

const PCDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetPCsQuery();

    if (isLoading) return <div className="loading">Загрузка...</div>;
    if (isError) return <div className="error">Ошибка загрузки данных</div>;

    // @ts-ignore
    const pc = data?.find((pc) => pc.id.toString() === id);
    if (!pc) return <div className="error">Компьютер не найден</div>;

    return (
        <div className="pc-details">
            <h2>{pc.case_pc.name} ({pc.price} ₽)</h2>
            <div className="image-container">
                <img src={pc.imageUrl} alt={pc.case_pc.name} className="pc-image" />
            </div>
            <div className="specs">
                <div className="info-box">
                    <img src="/icons/gpu.png" alt="GPU" className="icon" />
                    <span>Видеокарта: {pc.videocard.name} GB</span>
                </div>
                <div className="info-box">
                    <img src="/icons/cpu.png" alt="CPU" className="icon" />
                    <span>Процессор: {pc.processor.name}</span>
                </div>
                <div className="info-box">
                    <img src="/icons/motherboard.png" alt="Motherboard" className="icon" />
                    <span>Материнская плата: {pc.motherBoard.name}</span>
                </div>
                <div className="info-box">
                    <img src="/icons/ram.png" alt="RAM" className="icon" />
                    <span>Оперативная память: {pc.ram.amountRam * pc.ram.moduleCapacity}GB {pc.ram.name}</span>
                </div>
                <div className="info-box">
                    <img src="/icons/ssd.png" alt="SSD" className="icon" />
                    <span>Накопитель: {pc.storageDevice.capacityGb}GB {pc.storageDevice.name}</span>
                </div>
            </div>
        </div>
    );
};

export default PCDetails;