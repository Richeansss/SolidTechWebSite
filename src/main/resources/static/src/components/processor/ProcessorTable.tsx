import React, { useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetProcessorsQuery, useDeleteProcessorMutation } from '../../store/api/apiProcessor';

const ProcessorTable = () => {
    const { data, isLoading, isError } = useGetProcessorsQuery(); // Получаем данные о процессорах
    const [deleteProcessor] = useDeleteProcessorMutation(); // Хук для удаления процессора

    const [rows, setRows] = React.useState<GridRowsProp>([]);

    useEffect(() => {
        if (data) {
            const formattedRows = data.map((processor) => ({
                id: processor.id,
                name: processor.name,
                brand: processor.brand.name,
                socket: processor.socket.name, //  от лл
                typeRam: processor.typeRam,
                core: processor.core,
                threads: processor.threads,
                turboBust: processor.turbo_bust, 'Yes' : 'No',
            }));
            setRows(formattedRows);
        }
    }, [data]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'brand', headerName: 'Brand', width: 150 },
        { field: 'socket', headerName: 'Socket', width: 150 },
        { field: 'typeRam', headerName: 'RAM Type', width: 150 },
        { field: 'core', headerName: 'Cores', width: 100 },
        { field: 'threads', headerName: 'Threads', width: 100 },
        { field: 'turboBust', headerName: 'Turbo Boost', width: 150 },
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
            await deleteProcessor(id);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error deleting processor:', error);
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

export default ProcessorTable;
