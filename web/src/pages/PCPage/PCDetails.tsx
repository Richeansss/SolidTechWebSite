import React, { useState } from "react";
import styles from "./PCDetails.module.css";
import { useParams } from "react-router-dom";
import { useGetPCsQuery } from "../../store/api/pcApi";
import { BASE_URL } from "../../store/api/configApi";
import { Videocard } from "../../types/VideoCard";
import { Processor } from "../../types/Processor";
import { MotherBoard } from "../../types/MotherBoard";
import { Ram } from "../../types/Ram";
import { StorageDevice } from "../../types/StorageDevice";
import { Cooler } from "../../types/Cooler";
import { Case } from "../../types/Case";
import { PowerSupply } from "../../types/PowerSupply";

const getImageUrl = (path?: string) => path ? `${BASE_URL}${path}` : undefined;

const formatEnumValue = (value: string) =>
    value.replace(/^FORM_/, "").replace(/_/g, ".");

const InfoText: React.FC<{ label: string; value?: string; extra?: string[] }> = ({ label, value, extra }) => (
    <div className={styles.infoText}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value ?? "—"}</span>
        {extra && (
            <span className={styles.extra}>
        {extra.map((line, index) => (
            <div key={index}>{line}</div>
        ))}
      </span>
        )}
    </div>
);

interface ComponentBlockProps {
    title: string;
    imageUrl?: string;
    name?: string;
    extra: string[];
    reversed?: boolean;
}

const ComponentBlock: React.FC<ComponentBlockProps> = ({ title, imageUrl, name, extra, reversed }) => (
    <div className={reversed ? styles.rightInfoBox : styles.leftInfoBox}>
        {!reversed && (
            <img src={getImageUrl(imageUrl)} alt={name} className={styles.imageIcon} />
        )}
        <InfoText label={title} value={name} extra={extra} />
        {reversed && (
            <img src={getImageUrl(imageUrl)} alt={name} className={styles.imageIcon} />
        )}
    </div>
);

const PCDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetPCsQuery();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const pc = data?.find((pc) => pc.id === Number(id));
    if (isLoading) return <div className={styles.loading}>Загрузка...</div>;
    if (isError) return <div className={styles.error}>Ошибка загрузки данных</div>;
    if (!pc) return <div className={styles.error}>Компьютер не найден</div>;

    const nextImage = () => {
        if (!pc.imagesUrl?.length) return;
        setCurrentImageIndex((prev) => (prev + 1) % pc.imagesUrl.length);
    };

    const prevImage = () => {
        if (!pc.imagesUrl?.length) return;
        setCurrentImageIndex((prev) => (prev - 1 + pc.imagesUrl.length) % pc.imagesUrl.length);
    };

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
                {pc.imagesUrl?.length > 0 ? (
                    <>
                        <img
                            src={getImageUrl(pc.imagesUrl[currentImageIndex])}
                            alt={`${casePc?.name ?? "PC"} ${currentImageIndex + 1}`}
                            className={styles.pcImage}
                        />
                        <button className={styles.carouselButton} onClick={prevImage}>&lt;</button>
                        <button className={styles.carouselButton} onClick={nextImage}>&gt;</button>
                    </>
                ) : (
                    <p>Изображения отсутствуют</p>
                )}
            </div>

            <div className={styles.specs}>
                {videocard && (
                    <ComponentBlock
                        title="Видеокарта"
                        imageUrl={videocard.imageUrl}
                        name={videocard.name}
                        extra={[
                            `Объем видеопамяти: ${videocard.vram} GB`,
                            `Тип памяти: ${videocard.typeOfVram}`,
                            `Частота видеочипа: ${videocard.boostClock} МГц`,
                            `Разрядность шины памяти: ${videocard.memoryBus} Бит`,
                            `Интерфейс подключения: PCIe ${videocard.pci}.0`,
                        ]}
                    />
                )}

                {processor && (
                    <ComponentBlock
                        reversed
                        title="Процессор"
                        imageUrl={processor.imageUrl}
                        name={processor.name}
                        extra={[
                            `${processor.core} ядер`,
                            `${processor.threads} потоков`,
                            `${processor.socket.name} сокет`,
                            `${processor.turbo_bust} ГГц (турбо)`,
                        ]}
                    />
                )}

                {motherboard && (
                    <ComponentBlock
                        title="Материнская плата"
                        imageUrl={motherboard.imageUrl}
                        name={motherboard.name}
                        extra={[
                            `Сокет: ${motherboard.socket.name}`,
                            `Чипсет: ${motherboard.chipset.name}`,
                            `Версия PCIe: ${motherboard.pci}.0`,
                            `Кол-во разъемов M.2: ${motherboard.amount_of_m2}`,
                        ]}
                    />
                )}

                {ram && (
                    <ComponentBlock
                        reversed
                        title="Оперативная память"
                        imageUrl={ram.imageUrl}
                        name={ram.name}
                        extra={[
                            `Общий объем: ${ram.amountRam * ram.moduleCapacity} GB`,
                            `Кол-во планок памяти: ${ram.amountRam}`,
                            `Объем одной планки: ${ram.moduleCapacity} GB`,
                            `Тип памяти: ${ram.typeRam}`,
                            `Частота: ${ram.jdek}`,
                            `Тайминг: CL-${ram.timing}`,
                        ]}
                    />
                )}

                {storage && (
                    <ComponentBlock
                        title="Накопитель"
                        imageUrl={storage.imageUrl}
                        name={storage.name}
                        extra={[
                            `Объем: ${storage.capacityGb} GB`,
                            `Скорость чтения: ${storage.readSpeedMbps} Мбайт/сек`,
                            `Скорость записи: ${storage.writeSpeedMbps} Мбайт/сек`,
                            `Разъем подключения: ${storage.interfaceType}`,
                            `Форм-фактор: ${formatEnumValue(storage.formFactor)}`,
                        ]}
                    />
                )}

                {cooler && (
                    <ComponentBlock
                        reversed
                        title="Охлаждение"
                        imageUrl={cooler.imageUrl}
                        name={cooler.name}
                        extra={[
                            `TDP: ${cooler.tdp}`,
                            `Коннектор вентилятора: ${cooler.funConnector} pin`,
                            `Размер вентилятора: ${formatEnumValue(cooler.funSize)}`,
                        ]}
                    />
                )}

                {casePc && (
                    <ComponentBlock
                        title="Корпус"
                        imageUrl={casePc.imageUrl}
                        name={casePc.name}
                        extra={[`Форм-фактор: ${formatEnumValue(casePc.formFactor)}`]}
                    />
                )}

                {power && (
                    <ComponentBlock
                        reversed
                        title="Блок питания"
                        imageUrl={power.imageUrl}
                        name={power.name}
                        extra={[`Мощность: ${power.power} Вт`]}
                    />
                )}
            </div>
        </div>
    );
};

export default PCDetails;
