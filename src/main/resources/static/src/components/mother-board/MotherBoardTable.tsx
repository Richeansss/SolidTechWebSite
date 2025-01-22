import React, { useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetMotherBoardsQuery, useDeleteMotherBoardMutation } from '../../store/api/apiMotherBoard';
import Checkbox from '@mui/material/Checkbox';


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
                hasArgb: motherBoard.hasArgb,
                imageUrl: motherBoard.imageUrl,
            }));
            setRows(formattedRows);
        }
    }, [data]);

    // @ts-ignore
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'imageUrl',
            headerName: 'Image',
            width: 200,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <img
                        src={params.value}
                        alt="MotherBoard"
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
        { field: 'socket', headerName: 'Сокет', width: 150 },
        { field: 'chipset', headerName: 'Чипсет', width: 150 },
        { field: 'typeRam', headerName: 'Тип памяти', width: 150 },
        { field: 'pci', headerName: 'Версия PCI', width: 100 },
        { field: 'amount_of_m2', headerName: 'кол-во M.2', width: 120 },
        {
            field: 'hasArgb',
            headerName: 'ARGB разъем',
            width: 120,
            renderCell: (params: any) => (
                <Checkbox
                    checked={params.value}
                    disabled
                />
            )
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
