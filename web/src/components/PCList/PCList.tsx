import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CardList.module.css';
import { useGetPCsQuery } from '../../store/api/pcApi';
import { BASE_URL } from '../../store/api/configApi';
import { PC } from '../../types/PC'; // Импортируй из нужного места

export const PCList: React.FC = () => {
    const { data: pcs, isLoading, isError } = useGetPCsQuery();
    const navigate = useNavigate();

    if (isLoading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (isError) {
        return <div className="error">Ошибка при загрузке данных</div>;
    }

    if (!pcs || pcs.length === 0) {
        return <div className="empty">Нет доступных ПК</div>;
    }

    return (
        <div className={styles.pcList}>
            {pcs.map((pc: PC) => (
                <div key={pc.id} className={styles.pcCard}>
                    <div
                        className={styles.mainImageContainer}
                        onClick={() => navigate(`/pc/${pc.id}`)}
                    >
                        {pc.imagesUrl?.length > 0 ? (
                            <img
                                src={`${BASE_URL}${pc.imagesUrl[0]}`}
                                alt={`Изображение ПК ${pc.id}`}
                                className={styles.mainPcImage}
                            />
                        ) : (
                            <p>Изображения отсутствуют</p>
                        )}
                    </div>

                    <div className={styles.textContainer}>
                        <h3>{pc.price} ₽</h3>

                        <div className={styles.infoBox}>
                            <img src="/icons/gpu.png" alt="GPU" className={styles.iconImage} />
                            <span>
                                Видеокарта<br />
                                {pc.videocard?.details?.name || '—'}
                            </span>
                        </div>

                        <div className={styles.infoBox}>
                            <img src="/icons/cpu.png" alt="CPU" className={styles.iconImage} />
                            <span>
                                Процессор<br />
                                {pc.processor?.details?.name || '—'}
                            </span>
                        </div>

                        <div className={styles.infoBox}>
                            <img src="/icons/motherboard.png" alt="Motherboard" className={styles.iconImage} />
                            <span>
                                Материнская плата<br />
                                {pc.motherBoard?.details?.name || '—'}
                            </span>
                        </div>

                        <div className={styles.infoBox}>
                            <img src="/icons/ram.png" alt="RAM" className={styles.iconImage} />
                            <span>
                                Оперативная память<br />
                                {(() => {
                                    const ramDetails = pc.ram?.details as any;
                                    if (ramDetails?.amountRam && ramDetails?.moduleCapacity) {
                                        return `${ramDetails.amountRam * ramDetails.moduleCapacity} GB ${pc.ram?.details?.name || ''}`;
                                    }
                                    return '—';
                                })()}
                            </span>
                        </div>

                        <div className={styles.infoBox}>
                            <img src="/icons/ssd.png" alt="Storage" className={styles.iconImage} />
                            <span>
                                Накопитель<br />
                                {(() => {
                                    const sdDetails = pc.storageDevice?.details as any;
                                    return sdDetails?.capacityGb
                                        ? `${sdDetails.capacityGb} GB ${pc.storageDevice?.details?.name || ''}`
                                        : '—';
                                })()}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
