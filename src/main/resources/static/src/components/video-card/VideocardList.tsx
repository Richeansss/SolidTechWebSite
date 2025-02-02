import React, { useEffect, useState } from 'react';
import { useGetVideocardsQuery } from '../../store/api/apiVideoCard';
import './CardList.css';
import {useGetPCsQuery} from "../../store/api/apiPC";

const VideocardList = () => {
    const { data, isLoading, isError } = useGetPCsQuery(); // Получаем данные о видеокартах

    const [videocards, setVideocards] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            const formattedVideocards = data.map((videocard) => ({
                id: videocard.id,
                name: videocard.case_pc,
                vram: videocard.videocard,
                imageUrl: videocard.imageUrl, // URL изображения
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
            {videocards.map((videocard) => (
                <div key={videocard.id} className="videocard-card">
                    <div className="image-container">
                        <img
                            src={videocard.imageUrl}
                            alt={videocard.name}
                            className="videocard-image"
                        />
                    </div>
                    <div className="text-container">
                        <h3>{videocard.name}</h3>
                        <p>Memory: {videocard.vram} GB</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideocardList;
