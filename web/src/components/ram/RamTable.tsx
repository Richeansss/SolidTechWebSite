import React, { useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetRamsQuery, useDeleteRamMutation } from '../../store/api/ramApi.ts';
import styles from "../case/CasesTable.module.css";
import { BASE_URL } from '../../store/api/configApi.ts';

const RamTable = () => {
    const { data, isLoading, isError } = useGetRamsQuery(); // Получаем данные о RAM
    const [deleteRam] = useDeleteRamMutation(); // Хук для удаления RAM

    const [rows, setRows] = React.useState<GridRowsProp>([]);

    useEffect(() => {
        if (data) {
            const formattedRows = data.map((ram) => ({
                id: ram.id,
                name: ram.name,
                brand: ram.brand.name,
                amountRam: ram.amountRam,
                moduleCapacity: ram.moduleCapacity,
                typeRam: ram.typeRam,
                jdek: ram.jdek,
                timing: ram.timing,
                lightType: ram.lightType.name,
                imageUrl: ram.imageUrl
                    ? `${BASE_URL}${ram.imageUrl}`
                    : undefined,
            }));
            setRows(formattedRows);
        }
    }, [data]);

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
                        alt="Ram"
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
        { field: 'amountRam', headerName: 'Кол-во модулей', width: 150 },
        { field: 'moduleCapacity', headerName: 'Память одного модуля (GB)', width: 250 },
        { field: 'typeRam', headerName: 'Тип памяти', width: 150 },
        { field: 'jdek', headerName: 'Частота (MHz)', width: 180 },
        { field: 'timing', headerName: 'Тайминги', width: 180 },
        { field: 'lightType', headerName: 'Тип подсветки', width: 180,  },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<span className={styles.deleteButton}>🗑️</span>}
                    label="Delete"
                    onClick={() => handleDelete(params.row.id)}
                    showInMenu={false}
                />
            ]
        },
    ];

    const handleDelete = async (id: number) => {
        try {
            await deleteRam(id);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error deleting RAM:', error);
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
                className={styles.dataGrid}
            />
        </div>
    );
};

export default RamTable;
