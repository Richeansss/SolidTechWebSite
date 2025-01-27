import React, { useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetVideocardsQuery, useDeleteVideocardMutation } from '../../store/api/apiVideoCard';

const VideocardTable = () => {
    const { data, isLoading, isError } = useGetVideocardsQuery(); // Получаем данные о видеокартах
    const [deleteVideocard] = useDeleteVideocardMutation(); // Хук для удаления видеокарт

    const [rows, setRows] = React.useState<GridRowsProp>([]);

    useEffect(() => {
        if (data) {
            const formattedRows = data.map((videocard) => ({
                id: videocard.id,
                name: videocard.name,
                brand: videocard.brand.name,
                vram: videocard.vram,
                typeOfVram: videocard.typeOfVram,
                memoryBus: videocard.memoryBus,
                pci: videocard.pci,
                color: videocard.color,
                lightType: videocard.lightType.name,
                imageUrl: videocard.imageUrl, // Используем URL из базы данных
            }));
            setRows(formattedRows);
        }
    }, [data]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'imageUrl',
            headerName: 'Изображение',
            width: 200,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <img
                        src={params.value}
                        alt="Processor"
                        style={{
                            maxWidth: '100px',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            display: 'block',
                        }}
                    />
                </div>
            ),
        },
        { field: 'name', headerName: 'Название', width: 180 },
        { field: 'brand', headerName: 'Бренд', width: 150 },
        { field: 'vram', headerName: 'VRAM (GB)', width: 150 },
        { field: 'typeOfVram', headerName: 'VRAM ТИП', width: 150 },
        { field: 'memoryBus', headerName: 'Шина (bit)', width: 180 },
        { field: 'pci', headerName: 'Версия PCI', width: 150 },
        { field: 'color', headerName: 'Цвет', width: 150 },
        { field: 'lightType', headerName: 'Тип подсветки', width: 180 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <GridActionsCellItem
                    icon={<button className="delete-button">Delete</button>}
                    label="Delete"
                    onClick={() => handleDelete(params.row.id)}
                />
            ),
        },
    ];

    const handleDelete = async (id: number) => {
        try {
            await deleteVideocard(id);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error deleting videocard:', error);
        }
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (isError) {
        return <div className="error">Error loading data</div>;
    }

    return (
        <div className="table-container">
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
            />
        </div>
    );
};

export default VideocardTable;
