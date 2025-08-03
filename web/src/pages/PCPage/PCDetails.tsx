import React, { useState } from "react";
import styles from "./PCDetails.module.css";
import { useParams } from "react-router-dom";
import { useGetPCsQuery } from "../../store/api/pcApi";
import { Videocard } from "../../types/VideoCard";
import { Processor } from "../../types/Processor";
import { MotherBoard } from "../../types/MotherBoard";
import { Ram } from "../../types/Ram";
import { StorageDevice } from "../../types/StorageDevice";
import { Cooler } from "../../types/Cooler";
import { Case } from "../../types/Case";
import { PowerSupply } from "../../types/PowerSupply";
import {BASE_URL} from "../../store/api/configApi.ts";

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

    const InfoText: React.FC<{ label: string; value?: string; extra?: string | string[] }> = ({ label, value, extra }) => (
        <div className={styles.infoText}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value ?? "—"}</span>
            {extra && (
                <span className={styles.extra}>
                    {Array.isArray(extra)
                        ? extra.map((line, index) => <div key={index}>{line}</div>)
                        : extra}
                </span>
            )}
        </div>
    );

    const videocard = pc.videocard?.details as Videocard | undefined;
    const processor = pc.processor?.details as Processor | undefined;
    const motherboard = pc.motherBoard?.details as MotherBoard | undefined;
    const ram = pc.ram?.details as Ram | undefined;
    const storage = pc.storageDevice?.details as StorageDevice | undefined;
    const cooler = pc.cooler?.details as Cooler | undefined;
    const casePc = pc.casePc?.details as Case | undefined;
    const power = pc.powerSupply?.details as PowerSupply | undefined;

    return (
        <div className={styles.pcDetails}>
            <h2>{casePc?.name ?? "Без корпуса"} ({pc.price} ₽)</h2>

            <div className={styles.imageContainer}>
                {pc.imagesUrl.length > 0 ? (
                    <>
                        <img
                            src={`${BASE_URL}${pc.imagesUrl[currentImageIndex]}`}
                            alt={`${casePc?.name ?? "PC"} ${currentImageIndex + 1}`}
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
                {videocard && (
                    <div className={styles.leftInfoBox}>
                        <img
                            src={videocard.imageUrl ? `${BASE_URL}${videocard.imageUrl}` : undefined}
                            alt={videocard.name}
                            className={styles.imageIcon}
                        />
                        <InfoText
                            label="Видеокарта"
                            value={videocard.name}
                            extra={[
                                `Объем видеопамяти: ${videocard.vram} GB`,
                                `Тип памяти: ${videocard.typeOfVram}`,
                                `Частота видеочипа: ${videocard.boostClock} МГц`,
                                `Разрядность шины памяти: ${videocard.memoryBus} Бит`,
                                `Интерфейс подключения: PCIe ${videocard.pci}.0`,
                            ]}
                        />
                    </div>
                )}
                {processor && (
                    <div className={styles.rightInfoBox}>
                        <InfoText
                            label="Процессор"
                            value={processor.name}
                            extra={[
                                `${processor.core} ядер`,
                                `${processor.threads} потоков`,
                                `${processor.socket.name} сокет`,
                                `${processor.turbo_bust} ГГц (турбо)`,
                            ]}
                        />
                        <img
                            src={processor.imageUrl ? `${BASE_URL}${processor.imageUrl}` : undefined}
                            alt={processor.name}
                            className={styles.imageIcon}
                        />
                    </div>
                )}
                {motherboard && (
                    <div className={styles.leftInfoBox}>
                        <img
                            src={motherboard.imageUrl ? `${BASE_URL}${motherboard.imageUrl}` : undefined}
                            alt={motherboard.name}
                            className={styles.imageIcon}
                        />
                        <InfoText
                            label="Материнская плата"
                            value={motherboard.name}
                            extra={[
                                `Сокет: ${motherboard.socket.name}`,
                                `Чипсет: ${motherboard.chipset.name}`,
                                `Версия PCIe: ${motherboard.pci}.0`,
                                `Кол-во разъемов M.2: ${motherboard.amount_of_m2}`,
                            ]}
                        />
                    </div>
                )}
                {ram && (
                    <div className={styles.rightInfoBox}>
                        <InfoText
                            label="Оперативная память"
                            value={ram.name}
                            extra={[
                                `Общий объем: ${ram.amountRam * ram.moduleCapacity} GB`,
                                `Кол-во планок памяти: ${ram.amountRam}`,
                                `Объем одной планки памяти: ${ram.moduleCapacity} GB`,
                                `Тип памяти: ${ram.typeRam}`,
                                `Частота: ${ram.jdek}`,
                                `Тайминг: CL-${ram.timing}`,
                            ]}
                        />
                        <img
                            src={ram.imageUrl ? `${BASE_URL}${ram.imageUrl}` : undefined}
                            alt={ram.name}
                            className={styles.imageIcon}
                        />
                    </div>
                )}
                {storage && (
                    <div className={styles.leftInfoBox}>
                        <img
                            src={storage.imageUrl ? `${BASE_URL}${storage.imageUrl}` : undefined}
                            alt={storage.name}
                            className={styles.imageIcon}
                        />
                        <InfoText
                            label="Накопитель"
                            value={storage.name}
                            extra={[
                                `Объем: ${storage.capacityGb} GB`,
                                `Скорость чтения: ${storage.readSpeedMbps} Мбайт/сек`,
                                `Скорость записи: ${storage.writeSpeedMbps} Мбайт/сек`,
                                `Разъем подключения: ${storage.interfaceType}`,
                                `Форм-фактор: ${storage.formFactor.replace("FORM_", "").replace("_", ".")}`,
                            ]}
                        />
                    </div>
                )}
                {cooler && (
                    <div className={styles.rightInfoBox}>
                        <InfoText
                            label="Охлаждение"
                            value={cooler.name}
                            extra={[
                                `TDP: ${cooler.tdp}`,
                                `Коннектор вентилятора: ${cooler.funConnector} pin`,
                                `Размер вентилятора: ${cooler.funSize.replace("SIZE_", "")}`,
                            ]}
                        />
                        <img
                            src={cooler.imageUrl ? `${BASE_URL}${cooler.imageUrl}` : undefined}
                            alt={cooler.name}
                            className={styles.imageIcon}
                        />
                    </div>
                )}
                {casePc && (
                    <div className={styles.leftInfoBox}>
                        <img
                            src={casePc.imageUrl ? `${BASE_URL}${casePc.imageUrl}` : undefined}
                            alt={casePc.name}
                            className={styles.imageIcon}
                        />
                        <InfoText
                            label="Корпус"
                            value={casePc.name}
                            extra={[`Форм-фактор: ${casePc.formFactor}`]}
                        />
                    </div>
                )}
                {power && (
                    <div className={styles.rightInfoBox}>
                        <InfoText
                            label="Блок питания"
                            value={power.name}
                            extra={`Мощность: ${power.power} Вт`}
                        />
                        <img
                            src={power.imageUrl ? `${BASE_URL}${power.imageUrl}` : undefined}
                            alt={power.name}
                            className={styles.imageIcon}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PCDetails;
