import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetCasesQuery, useDeleteCaseMutation } from '../../store/api/caseApi.ts';
import styles from './CasesTable.module.css';
import Checkbox from "@mui/material/Checkbox";
import { BASE_URL } from '../../store/api/configApi.ts';

const CasesTable = () => {
    const { data, isLoading, isError } = useGetCasesQuery();
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [deleteCase] = useDeleteCaseMutation();

    useEffect(() => {
        if (data) {
            const formattedRows = data.map((caseItem) => ({
                id: caseItem.id,
                name: caseItem.name,
                brand: caseItem.brand ? caseItem.brand.name : 'Not specified',
                formFactor: caseItem.formFactor || 'Not specified',
                amountFun: caseItem.amountFun || 'Not specified',
                lightType: caseItem.lightType?.name || 'Not specified',
                funConnector: caseItem.funConnector || 'Not specified',
                color: caseItem.color || 'Not specified',
                glassType: caseItem.glassType || 'Not specified',
                hasHub: caseItem.hasHub !== undefined ? caseItem.hasHub : false,
                imageUrl: caseItem.imageUrl
                    ? `${BASE_URL}${caseItem.imageUrl}`
                    : undefined,
            }));
            setRows(formattedRows);
        }
    }, [data]);

    const handleDelete = async (id: number) => {
        try {
            await deleteCase(id);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error deleting case:', error);
        }
    };

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
                        alt="Case"
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
            field: 'hasHub',
            headerName: 'ARGB разъем',
            width: 120,
            renderCell: (params: any) => (
                <Checkbox
                    checked={params.value}
                    disabled
                />
            )
        },        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <GridActionsCellItem
                    icon={<button className={styles.deleteButton}>Delete</button>}
                    label="Delete"
                    onClick={() => handleDelete(params.row.id)}
                />
            ),
        },
    ];

    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (isError) {
        return <div className={styles.error}>Error loading data</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                className={styles.dataGrid}
            />
        </div>
    );
};

export default CasesTable;
