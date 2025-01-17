import React, { useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetMotherBoardsQuery, useDeleteMotherBoardMutation } from '../../store/api/apiMotherBoard';

const MotherBoardTable = () => {
    const { data, isLoading, isError } = useGetMotherBoardsQuery(); // Получаем данные о материнских платах
    const [deleteMotherBoard] = useDeleteMotherBoardMutation(); // Хук для удаления материнской платы

    const [rows, setRows] = React.useState<GridRowsProp>([]);

    useEffect(() => {
        if (data) {
            const formattedRows = data.map((motherBoard) => ({
                id: motherBoard.id,
                name: motherBoard.name,
                brand: motherBoard.brand.name,
                socket: motherBoard.socket.name,
                chipset: motherBoard.chipset.name,
                typeRam: motherBoard.typeRam,
                pci: motherBoard.pci,
                amount_of_m2: motherBoard.amount_of_m2,
                url: motherBoard.imageUrl,
            }));
            setRows(formattedRows);
        }
    }, [data]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'brand', headerName: 'Brand', width: 150 },
        { field: 'socket', headerName: 'Socket', width: 150 },
        { field: 'chipset', headerName: 'Chipset', width: 150 },
        { field: 'typeRam', headerName: 'RAM Type', width: 150 },
        { field: 'pci', headerName: 'PCI Slots', width: 100 },
        { field: 'amount_of_m2', headerName: 'M.2 Slots', width: 120 },
        { field: 'url', headerName: 'URL', width: 250, renderCell: (params) => <a href={params.value} target="_blank" rel="noopener noreferrer">{params.value}</a> },
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
            await deleteMotherBoard(id);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error deleting motherboard:', error);
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

export default MotherBoardTable;
