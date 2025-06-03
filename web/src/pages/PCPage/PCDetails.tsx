import React, { useState } from "react";
import styles from "./PCDetails.module.css";
import { useParams } from "react-router-dom";
import { useGetPCsQuery } from "../store/api/pcApi";

const PCDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetPCsQuery();
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    if (isLoading) return <div className={styles.loading}>Загрузка...</div>;
    if (isError) return <div className={styles.error}>Ошибка загрузки данных</div>;

    // @ts-ignore
    const pc = data?.find((pc) => pc.id.toString() === id);
    if (!pc) return <div className={styles.error}>Компьютер не найден</div>;

    const nextImage = () => {
        if (pc.imagesUrl.length === 0) return;
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % pc.imagesUrl.length
        );
    };

    const prevImage = () => {
        if (pc.imagesUrl.length === 0) return;
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + pc.imagesUrl.length) % pc.imagesUrl.length
        );
    };

    const InfoText: React.FC<{ label: string; value: string; extra?: string | string[] }> = ({ label, value, extra }) => {
        return (
            <div className={styles.infoText}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{value}</span>
                {extra && (
                    <span className={styles.extra}>
                        {Array.isArray(extra) ? extra.map((line, index) => <div key={index}>{line}</div>) : extra}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className={styles.pcDetails}>
            <h2>{pc.casePc.name} ({pc.price} ₽)</h2>
            <div className={styles.imageContainer}>
                {pc.imagesUrl.length > 0 ? (
                    <>
                        <img
                            src={`http://localhost:3000${pc.imagesUrl[currentImageIndex]}`}
                            alt={`${pc.casePc.name} ${currentImageIndex + 1}`}
                            className={styles.pcImage}
                        />
                        <button className="carousel-button prev" onClick={prevImage}>&lt;</button>
                        <button className="carousel-button next" onClick={nextImage}>&gt;</button>
                    </>
                ) : (
                    <p>Изображения отсутствуют</p>
                )}
            </div>
            <div className={styles.specs}>
                <div className={styles.leftInfoBox}>
                    <img src={pc.videocard.imageUrl} alt={pc.casePc.name} className={styles.imageIcon} />
                    <InfoText
                        label="Видеокарта"
                        value={pc.videocard.name}
                        extra={[
                            `Объем видеопамяти: ${pc.videocard.vram} GB`,
                            `Тип памяти: ${pc.videocard.typeOfVram}`,
                            `Частота видеочипа: ${pc.videocard.boostClock} МГц`,
                            `Разрядность шины памяти: ${pc.videocard.memoryBus} Бит`,
                            `Интерфейс подключения: PCIe ${pc.videocard.pci}.0`,
                        ]}
                    />
                </div>
                <div className={styles.rightInfoBox}>
                    <InfoText
                        label="Процессор"
                        value={pc.processor.name}
                        extra={[
                            `${pc.processor.core} ядер`,
                            `${pc.processor.threads} потоков`,
                            `${pc.processor.socket.name} сокет`,
                            `${pc.processor.turbo_bust} ГГц (турбо)`,
                        ]}
                    />
                    <img src={pc.processor.imageUrl} alt={pc.casePc.name} className={styles.imageIcon} />
                </div>
                <div className={styles.leftInfoBox}>
                    <img src={pc.motherBoard.imageUrl} alt={pc.casePc.name} className={styles.imageIcon} />
                    <InfoText
                        label="Материнская плата"
                        value={pc.motherBoard.name}
                        extra={[
                            `Сокет: ${pc.motherBoard.socket.name}`,
                            `Чипсет: ${pc.motherBoard.chipset.name}`,
                            `Версия PCIe: ${pc.motherBoard.pci}.0`,
                            `Кол-во разъемов M.2: ${pc.motherBoard.amount_of_m2}`,
                        ]}
                    />
                </div>
                <div className={styles.rightInfoBox}>
                    <InfoText
                        label="Оперативная память"
                        value={pc.ram.name}
                        extra={[
                            `Общий объем: ${pc.ram.amountRam * pc.ram.moduleCapacity} GB`,
                            `Кол-во планок памяти: ${pc.ram.amountRam}`,
                            `Объем одной планки памяти: ${pc.ram.moduleCapacity} GB`,
                            `Тип памяти: ${pc.ram.typeRam}`,
                            `Частота: ${pc.ram.jdek}`,
                            `Таймнг: CL-${pc.ram.timing}`,
                        ]}
                    />
                    <img src={pc.ram.imageUrl} alt={pc.casePc.name} className={styles.imageIcon} />
                </div>
                <div className={styles.leftInfoBox}>
                    <img src={pc.storageDevice.imageUrl} alt={pc.casePc.name} className={styles.imageIcon} />
                    <InfoText
                        label="Накопитель"
                        value={pc.storageDevice.name}
                        extra={[
                            `Объем: ${pc.storageDevice.capacityGb} GB`,
                            `Скорость чтения: ${pc.storageDevice.readSpeedMbps} Мбайт/сек`,
                            `Скорость записи: ${pc.storageDevice.writeSpeedMbps} Мбайт/сек`,
                            `Разъем подключения: ${pc.storageDevice.interfaceType}`,
                            `Форм-фактор: ${pc.storageDevice.formFactor.replace("FORM_", "").replace("_", ".")}`,
                        ]}
                    />
                </div>
                <div className={styles.rightInfoBox}>
                    <InfoText
                        label="Охлаждение"
                        value={pc.cooler.name}
                        extra={[
                            `TDP: ${pc.cooler.tdp}`,
                            `Коннектор вентилятора: ${pc.cooler.funConnector} pin`,
                            `Размер вентилятора: ${pc.cooler.funSize.replace("SIZE_", "")}`,
                        ]}
                    />
                    <img src={pc.cooler.imageUrl} alt={pc.cooler.name} className={styles.imageIcon} />
                </div>
                <div className={styles.leftInfoBox}>
                    <img src={pc.casePc.imageUrl} alt={pc.casePc.name} className={styles.imageIcon} />
                    <InfoText
                        label="Корпус"
                        value={pc.casePc.name}
                        extra={[
                            `TDP: ${pc.casePc.formFactor}`,
                            `Коннектор вентилятора: ${pc.cooler.funConnector} pin`,
                            `Размер вентилятора: ${pc.cooler.funSize.replace("SIZE_", "")}`,
                        ]}
                    />
                </div>
                <div className={styles.rightInfoBox}>
                    <InfoText
                        label="Блок питания"
                        value={pc.powerSupply.name}
                        extra={`${pc.ram.amountRam * pc.ram.moduleCapacity} GB`}
                    />
                    <img src={pc.powerSupply.imageUrl} alt={pc.cooler.name} className={styles.imageIcon} />
                </div>
            </div>
        </div>
    );
};

export default PCDetails;
