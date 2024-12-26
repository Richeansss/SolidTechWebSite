import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetCoolersQuery, useDeleteCoolerMutation } from '../../store/api/apiCooler';
import '../case/CasesTable.css'; // Импортируем CSS

const CoolersTable = () => {
    const { data, isLoading, isError } = useGetCoolersQuery(); // Fetch data using Redux Toolkit Query
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [deleteCooler] = useDeleteCoolerMutation(); // Хук для удаления записи

    useEffect(() => {
        if (data) {
            // Format data for the table
            const formattedRows = data.map((cooler) => ({
                id: cooler.id,
                name: cooler.name,
                brand: cooler.brand ? cooler.brand.name : 'Not specified',
                tdp: cooler.tdp || 'Not specified',
                funConnector: cooler.funConnector || 'Not specified',
                lightType: cooler.lightType?.name || 'Not specified',
            }));
            setRows(formattedRows);
        }
    }, [data]);

    // Define columns for DataGrid
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'brand', headerName: 'Brand', width: 150 },
        { field: 'tdp', headerName: 'TDP', width: 150 },
        { field: 'funConnector', headerName: 'Connector', width: 180 },
        { field: 'lightType', headerName: 'Light Type', width: 180 },
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
            await deleteCooler(id); // Удаляем запись через API
            setRows((prevRows) => prevRows.filter((row) => row.id !== id)); // Обновляем состояние таблицы
        } catch (error) {
            console.error('Error deleting cooler:', error);
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

export default CoolersTable;