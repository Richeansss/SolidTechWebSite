import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetPowerSuppliesQuery, useDeletePowerSupplyMutation } from '../../store/api/apiPowerSupply';
import '../case/CasesTable.css'; // Импортируем CSS

const PowerSuppliesTable = () => {
    const { data, isLoading, isError } = useGetPowerSuppliesQuery(); // Fetch data using Redux Toolkit Query
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [deletePowerSupply] = useDeletePowerSupplyMutation(); // Хук для удаления записи

    useEffect(() => {
        if (data) {
            console.log('Data:', data); // Логируем данные, чтобы проверить, что приходит с API
            const formattedRows = data.map((powerSupply) => ({
                id: powerSupply.id,
                name: powerSupply.name,
                brand: powerSupply.brand ? powerSupply.brand.name : 'Not specified',
                certificate: powerSupply.certificate || 'Not specified',
                power: powerSupply.power || 'Not specified',
                modular: powerSupply.modular ? 'Yes' : 'No',
                imageUrl: powerSupply.imageUrl, // Используем URL из базы данных
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
        { field: 'certificate', headerName: 'Сертификат', width: 150 },
        { field: 'power', headerName: 'Мощность (W)', width: 180 },
        { field: 'modular', headerName: 'Модульность', width: 180 },
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
            await deletePowerSupply(id); // Удаляем запись через API
            setRows((prevRows) => prevRows.filter((row) => row.id !== id)); // Обновляем состояние таблицы
        } catch (error) {
            console.error('Error deleting power supply:', error);
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

export default PowerSuppliesTable;
