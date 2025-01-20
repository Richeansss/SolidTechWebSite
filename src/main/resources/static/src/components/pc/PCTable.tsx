import React, { useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetPCsQuery, useDeletePCMutation } from '../../store/api/apiPC'; // Assuming the necessary API hooks are created

const PCTable = () => {
    const { data, isLoading, isError } = useGetPCsQuery(); // Fetching PC data
    const [deletePC] = useDeletePCMutation(); // Hook for deleting a PC

    const [rows, setRows] = React.useState<GridRowsProp>([]);

    useEffect(() => {
        if (data) {
            const formattedRows = data.map((pc) => ({
                id: pc.id,
                motherBoard: pc.motherBoard.name,
                motherBoardWarranty: pc.motherBoardWarranty,
                motherBoardStore: pc.motherBoardStore,
                processor: pc.processor.name,
                processorWarranty: pc.processorWarranty,
                processorStore: pc.processorStore,
                ram: pc.ram.name,
                ramWarranty: pc.ramWarranty,
                ramStore: pc.ramStore,
                cooler: pc.cooler.name,
                coolerWarranty: pc.coolerWarranty,
                coolerStore: pc.coolerStore,
                case: pc.case_pc.name,
                caseWarranty: pc.caseWarranty,
                caseStore: pc.caseStore,
                videocard: pc.videocard.name,
                videocardWarranty: pc.videocardWarranty,
                videocardStore: pc.videocardStore,
                storageDevice: pc.storageDevice.name,
                storageDeviceWarranty: pc.storageDeviceWarranty,
                storageDeviceStore: pc.storageDeviceStore,
                powerSupply: pc.powerSupply.name,
                powerSupplyWarranty: pc.powerSupplyWarranty,
                powerSupplyStore: pc.powerSupplyStore,
                price: pc.price,
                imageUrl: pc.imageUrl, // Используем URL из базы данных
            }));
            setRows(formattedRows);
        }
    }, [data]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'motherBoard', headerName: 'Материнская плата', width: 180 },
        { field: 'motherBoardWarranty', headerName: 'Гарантия материнской платы', width: 250 },
        { field: 'motherBoardStore', headerName: 'Магазин материнской платы', width: 250 },
        { field: 'processor', headerName: 'Процессор', width: 180 },
        { field: 'processorWarranty', headerName: 'Гарантия процессора', width: 180 },
        { field: 'processorStore', headerName: 'Магазин процессора', width: 250 },
        { field: 'ram', headerName: 'Оперативная память', width: 180 },
        { field: 'ramWarranty', headerName: 'Гарантия оперативной памяти', width: 250 },
        { field: 'ramStore', headerName: 'Магазин оперативной памяти', width: 250 },
        { field: 'cooler', headerName: 'Охлаждение', width: 180 },
        { field: 'coolerWarranty', headerName: 'Гарантия охлаждения', width: 250 },
        { field: 'coolerStore', headerName: 'Магазин охлаждения', width: 250 },
        { field: 'case', headerName: 'Корпус', width: 180 },
        { field: 'caseWarranty', headerName: 'Гарантия корпуса', width: 250 },
        { field: 'caseStore', headerName: 'Магазин корпуса', width: 250 },
        { field: 'videocard', headerName: 'Видеокарта', width: 180 },
        { field: 'videocardWarranty', headerName: 'Гарантия видеокарты', width: 250 },
        { field: 'videocardStore', headerName: 'Магазин видеокарты', width: 250 },
        { field: 'storageDevice', headerName: 'Устройство хранения', width: 180 },
        { field: 'storageDeviceWarranty', headerName: 'Гарантия устройства хранения', width: 250 },
        { field: 'storageDeviceStore', headerName: 'Магазин устройства хранения', width: 250 },
        { field: 'powerSupply', headerName: 'Блок питания', width: 180 },
        { field: 'powerSupplyWarranty', headerName: 'Гарантия блока питания', width: 250 },
        { field: 'powerSupplyStore', headerName: 'Магазин блока питания', width: 250 },
        { field: 'price', headerName: 'Цена', width: 120 },
        {
            field: 'imageUrl',
            headerName: 'Image',
            width: 200,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt="PC"
                    style={{ width: '100px', height: 'auto', objectFit: 'contain' }}
                />
            ),
        },
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
            await deletePC(id);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error deleting PC:', error);
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

export default PCTable;
