import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetStorageDevicesQuery, useDeleteStorageDeviceMutation } from '../../store/api/apiStorageDevice';

const StorageDevicesTable = () => {
    const { data, isLoading, isError } = useGetStorageDevicesQuery(); // Fetch data using Redux Toolkit Query
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [deleteStorageDevice] = useDeleteStorageDeviceMutation(); // Хук для удаления записи

    useEffect(() => {
        if (data) {
            console.log('Data:', data); // Логируем данные, чтобы проверить, что приходит с API
            const formattedRows = data.map((storageDevice) => ({
                id: storageDevice.id,
                name: storageDevice.name,
                brand: storageDevice.brand ? storageDevice.brand.name : 'Not specified',
                type: storageDevice.type || 'Not specified',
                capacityGb: storageDevice.capacityGb || 'Not specified',
                formFactor: storageDevice.formFactor || 'Not specified',
                interfaceType: storageDevice.interfaceType || 'Not specified',
                readSpeedMbps: storageDevice.readSpeedMbps || 'Not specified',
                writeSpeedMbps: storageDevice.writeSpeedMbps || 'Not specified',
                imageUrl: storageDevice.imageUrl, // Используем URL из базы данных
            }));
            setRows(formattedRows);
        }
    }, [data]);

    // Определяем колонки для DataGrid
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
                        alt="StorageDevices"
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
        { field: 'type', headerName: 'Тип', width: 150 },
        { field: 'capacityGb', headerName: 'Объем (GB)', width: 180 },
        { field: 'formFactor', headerName: 'Форм фактор', width: 180 },
        { field: 'interfaceType', headerName: 'Тип интерфейса', width: 180 },
        { field: 'readSpeedMbps', headerName: 'Чтение (Mbps)', width: 180 },
        { field: 'writeSpeedMbps', headerName: 'Запись (Mbps)', width: 180 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <GridActionsCellItem
                    icon={
                        <button className="delete-button">Delete</button> // Добавляем свой класс кнопки
                    }
                    label="Delete"
                    onClick={() => handleDelete(params.row.id)}
                />
            ),
        },
    ];

    const handleDelete = async (id: number) => {
        try {
            await deleteStorageDevice(id); // Удаляем запись через API
            setRows((prevRows) => prevRows.filter((row) => row.id !== id)); // Обновляем состояние таблицы
        } catch (error) {
            console.error('Error deleting storage device:', error);
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
                pagination // Включаем пагинацию
            />
        </div>
    );
};

export default StorageDevicesTable;
