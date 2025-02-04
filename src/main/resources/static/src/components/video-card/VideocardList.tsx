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
                case_pc: pc.case_pc,
                videocard: pc.videocard,
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
                        <h3>{pc.case_pc.name}</h3>
                        <p>Memory: {pc.videocard.name} GB</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideocardList;
