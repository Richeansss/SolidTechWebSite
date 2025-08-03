import React, { useEffect } from 'react';
import {
    DataGrid,
    GridColDef,
    GridRowsProp,
    GridActionsCellItem, GridPaginationModel
} from '@mui/x-data-grid';
import { useGetPCsQuery, useDeletePCMutation } from '../../store/api/pcApi.ts';



const PCTable = () => {
    const { data, isLoading, isError } = useGetPCsQuery();
    const [deletePC] = useDeletePCMutation();
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
        pageSize: 10,
        page: 0,
    });

    useEffect(() => {
        if (data) {
            const formattedRows = data.map((pc) => ({
                id: pc.id,
                image: pc.imagesUrl?.[0] ? `http://localhost:3000${pc.imagesUrl[0]}` : "",
                caseName: pc.casePc?.details?.name,
                processorName: pc.processor?.details?.name,
                videocardName: pc.videocard?.details?.name,
                ramName: pc.ram?.details?.name,
                motherboardName: pc.motherBoard?.details?.name,
                storageName: pc.storageDevice?.details?.name,
                coolerName: pc.cooler?.details?.name,
                powerName: pc.powerSupply?.details?.name,
                price: pc.price,
                isForSale: pc.isForSale ? "Да" : "Нет"
            }));
            setRows(formattedRows);
        }
    }, [data]);

    const handleDelete = async (id: number) => {
        try {
            await deletePC(id);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении ПК:', error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'image',
            headerName: 'Изображение',
            width: 140,
            renderCell: (params) => params.value ? (
                <img
                    src={params.value}
                    alt="PC"
                    style={{ width: '100px', height: 'auto', objectFit: 'contain' }}
                />
            ) : (
                <span>—</span>
            )
        },
        { field: 'caseName', headerName: 'Корпус', width: 180 },
        { field: 'processorName', headerName: 'Процессор', width: 180 },
        { field: 'videocardName', headerName: 'Видеокарта', width: 180 },
        { field: 'ramName', headerName: 'ОЗУ', width: 180 },
        { field: 'motherboardName', headerName: 'Мат. плата', width: 180 },
        { field: 'storageName', headerName: 'Накопитель', width: 180 },
        { field: 'coolerName', headerName: 'Кулер', width: 180 },
        { field: 'powerName', headerName: 'БП', width: 180 },
        { field: 'price', headerName: 'Цена (₽)', width: 120 },
        { field: 'isForSale', headerName: 'Для продажи', width: 140 },
        {
            field: 'actions',
            headerName: 'Действия',
            width: 120,
            renderCell: (params) => (
                <GridActionsCellItem
                    icon={<button className="delete-button">Удалить</button>}
                    label="Удалить"
                    onClick={() => handleDelete(params.row.id)}
                />
            ),
        },
    ];

    if (isLoading) return <div className="loading">Загрузка...</div>;
    if (isError) return <div className="error">Ошибка загрузки данных</div>;

    return (
        <div className="table-container" style={{ height: 700, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10, 20, 50]}
            />
        </div>
    );
};

export default PCTable;
