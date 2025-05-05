import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetLightTypesQuery, useDeleteLightTypeMutation } from '../../store/api/apiLighttype'; // Импорт хука для работы с Light Types

const LightTypeTable = () => {
    const { data, isLoading, isError } = useGetLightTypesQuery(); // Получение данных через Redux Toolkit Query
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [deleteLightType] = useDeleteLightTypeMutation(); // Хук для удаления записи

    useEffect(() => {
        if (data) {
            // Форматирование данных для таблицы
            const formattedRows = data.map((lightTypeItem) => ({
                id: lightTypeItem.id,
                name: lightTypeItem.name,
            }));
            setRows(formattedRows);
        }
    }, [data]);

    // Определяем колонки для DataGrid
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 180 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <GridActionsCellItem
                    icon={
                        <button className="delete-button">Delete</button> // Кнопка удаления
                    }
                    label="Delete"
                    onClick={() => handleDelete(params.row.id)} // Вызов функции удаления
                />
            ),
        },
    ];

    // Функция для удаления записи
    const handleDelete = async (id: number) => {
        try {
            await deleteLightType(id); // Удаление записи через API
            setRows((prevRows) => prevRows.filter((row) => row.id !== id)); // Обновление состояния таблицы
        } catch (error) {
            console.error('Error deleting light type:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                style={{ height: 'calc(100% - 60px)' }} // Устанавливаем конкретную высоту таблицы
            />
        </div>
    );
};

export default LightTypeTable;
