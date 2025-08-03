import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import styles from './CardList.module.css';
import {useGetPCsQuery} from "../../store/api/pcApi.ts";
import {BASE_URL} from "../../store/api/configApi.ts";


export const PCList: React.FC = () => {
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
        <div className={styles.pcList}>
            {videocards.map((pc) => (
                <div key={pc.id} className={styles.pcCard}>
                    <div className={styles.mainImageContainer} onClick={() => navigate(`/pc/${pc.id}`)}>
                        {pc.imagesUrl.length > 0 ? (
                            <>
                                <img
                                    src={`${BASE_URL}${pc.imagesUrl}`} // Используем первое изображение
                                    alt={`{pc}`}
                                    className={styles.mainPcImage}
                                />
                            </>
                        ) : (
                            <p>Изображения отсутствуют</p>
                        )}
                    </div>
                    <div className={styles.textContainer}>
                        <h3>{pc.price} ₽</h3>
                        <div className={styles.infoBox}>
                            <img src="/icons/gpu.png" alt="GPU" className={styles.iconImage}/>
                            <span>Видеокарта<br/> {pc.videocard.details.name} GB</span>
                        </div>
                        <div className={styles.infoBox}>
                            <img src="/icons/cpu.png" alt="CPU" className={styles.iconImage}/>
                            <span>Процессор<br/> {pc.processor.details.name}</span>
                        </div>
                        <div className={styles.infoBox}>
                            <img src="/icons/motherboard.png" alt="Motherboard" className={styles.iconImage}/>
                            <span>Материнская плата<br/> {pc.motherBoard.details.name}</span>
                        </div>
                        <div className={styles.infoBox}>
                            <img src="/icons/ram.png" alt="RAM" className={styles.iconImage}/>
                            <span>Оперативная память<br/> {pc.ram.details.amountRam * pc.ram.details.moduleCapacity}GB {pc.ram.name}</span>
                        </div>
                        <div className={styles.infoBox}>
                            <img src="/icons/ssd.png" alt="HDD" className={styles.iconImage}/>
                            <span>Накопитель<br/> {pc.storageDevice.details.capacityGb}GB {pc.storageDevice.name}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
