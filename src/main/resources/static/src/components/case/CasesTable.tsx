import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetCasesQuery, useDeleteCaseMutation } from '../../store/api/apiCase';
import './CasesTable.css';  // Импортируем CSS

const CasesTable = () => {
    const { data, isLoading, isError } = useGetCasesQuery(); // Fetch data using Redux Toolkit Query
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [deleteCase] = useDeleteCaseMutation(); // Хук для удаления записи

    useEffect(() => {
        if (data) {
            // Format data for the table
            const formattedRows = data.map((caseItem) => ({
                id: caseItem.id,
                name: caseItem.name,
                brand: caseItem.brand ? caseItem.brand.name : 'Not specified',
                formFactor: caseItem.formFactor || 'Not specified',
                amountFun: caseItem.amountFun || 'Not specified',
                lightType: caseItem.lightType?.name || 'Not specified',  // Используем name
                funConnector: caseItem.funConnector || 'Not specified',
                color: caseItem.color || 'Not specified',
                glassType: caseItem.glassType || 'Not specified',
                imageUrl: caseItem.imageUrl, // Используем URL из базы данных
            }));
            setRows(formattedRows);
        }
    }, [data]);

    // Define columns for DataGrid
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
        { field: 'formFactor', headerName: 'Форм-фактор', width: 150 },
        { field: 'amountFun', headerName: 'Кол-во вентиляторов', width: 180 },
        { field: 'lightType', headerName: 'Тип подсветки', width: 180 },
        { field: 'funConnector', headerName: 'Коннектор', width: 180 },
        { field: 'color', headerName: 'Цвет', width: 180 },
        { field: 'glassType', headerName: 'Тип стекла', width: 180 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <GridActionsCellItem
                    icon={
                        <button className="delete-button">Delete</button>  // Добавляем свой класс кнопки
                    }
                    label="Delete"
                    onClick={() => handleDelete(params.row.id)}
                />
            ),
        },
    ];

    const handleDelete = async (id: number) => {
        try {
            await deleteCase(id); // Удаляем запись через API
            setRows((prevRows) => prevRows.filter((row) => row.id !== id)); // Обновляем состояние таблицы
        } catch (error) {
            console.error('Error deleting case:', error);
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
                pagination // Enable pagination
            />
        </div>
    );
};

export default CasesTable;
