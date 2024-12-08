import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useGetCasesQuery } from '../../store/api/apiCase';


const CasesTable = () => {
    const { data, isLoading, isError } = useGetCasesQuery(); // Fetch data using Redux Toolkit Query
    const [rows, setRows] = useState<GridRowsProp>([]);

    useEffect(() => {
        if (data) {
            // Format data for the table
            const formattedRows = data.map((caseItem) => ({
                id: caseItem.id,
                name: caseItem.name,
                brand: caseItem.brand ? caseItem.brand.name : 'Not specified',
                formFactor: caseItem.formFactor || 'Not specified',
                amountFun: caseItem.amountFun || 'Not specified',
                lightType: caseItem.lightType || 'Not specified',
                funConnector: caseItem.funConnector || 'Not specified',
                color: caseItem.color || 'Not specified',
                glassType: caseItem.glassType || 'Not specified',
            }));
            setRows(formattedRows);
        }
    }, [data]);

    // Define columns for DataGrid
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'brand', headerName: 'Brand', width: 150 },
        { field: 'formFactor', headerName: 'Form', width: 150 },
        { field: 'amountFun', headerName: 'Amount of Fans', width: 180 },
        { field: 'lightType', headerName: 'Light Type', width: 180 },
        { field: 'funConnector', headerName: 'Connector', width: 180 },
        { field: 'color', headerName: 'Color', width: 180 },
        { field: 'glassType', headerName: 'Glass Type', width: 180 },
    ];

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
                pagination // Enable pagination
            />
        </div>
    );
};

export default CasesTable;
