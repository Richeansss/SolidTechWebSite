import React, { useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import { useGetPCsQuery, useDeletePCMutation } from '../../store/api/apiPC'; // Assuming the necessary API hooks are created

const PCTable = () => {
    const { data, isLoading, isError } = useGetPCsQuery(); // Fetching PC data
    const [deletePC] = useDeletePCMutation(); // Hook for deleting a PC

    const [rows, setRows] = React.useState<GridRowsProp>([]);

    useEffect(() => {
        if (data) {
            const formattedRows = data.map((pc) => ({
                id: pc.id,
                motherBoard: pc.motherBoard.name,
                motherBoardWarranty: pc.motherBoardWarranty,
                motherBoardStore: pc.motherBoardStore,
                processor: pc.processor.name,
                processorWarranty: pc.processorWarranty,
                processorStore: pc.processorStore,
                ram: pc.ram.name,
                ramWarranty: pc.ramWarranty,
                ramStore: pc.ramStore,
                cooler: pc.cooler.name,
                coolerWarranty: pc.coolerWarranty,
                coolerStore: pc.coolerStore,
                case: pc.case_pc.name,
                caseWarranty: pc.caseWarranty,
                caseStore: pc.caseStore,
                videocard: pc.videocard.name,
                videocardWarranty: pc.videocardWarranty,
                videocardStore: pc.videocardStore,
                storageDevice: pc.storageDevice.name,
                storageDeviceWarranty: pc.storageDeviceWarranty,
                storageDeviceStore: pc.storageDeviceStore,
                powerSupply: pc.powerSupply.name,
                powerSupplyWarranty: pc.powerSupplyWarranty,
                powerSupplyStore: pc.powerSupplyStore,
                price: pc.price,
            }));
            setRows(formattedRows);
        }
    }, [data]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'motherBoard', headerName: 'Motherboard', width: 180 },
        { field: 'motherBoardWarranty', headerName: 'Motherboard Warranty', width: 180 },
        { field: 'motherBoardStore', headerName: 'Motherboard Store', width: 150 },
        { field: 'processor', headerName: 'Processor', width: 180 },
        { field: 'processorWarranty', headerName: 'Processor Warranty', width: 180 },
        { field: 'processorStore', headerName: 'Processor Store', width: 150 },
        { field: 'ram', headerName: 'RAM', width: 180 },
        { field: 'ramWarranty', headerName: 'RAM Warranty', width: 180 },
        { field: 'ramStore', headerName: 'RAM Store', width: 150 },
        { field: 'cooler', headerName: 'Cooler', width: 180 },
        { field: 'coolerWarranty', headerName: 'Cooler Warranty', width: 180 },
        { field: 'coolerStore', headerName: 'Cooler Store', width: 150 },
        { field: 'case', headerName: 'Case', width: 180 },
        { field: 'caseWarranty', headerName: 'Case Warranty', width: 180 },
        { field: 'caseStore', headerName: 'Case Store', width: 150 },
        { field: 'videocard', headerName: 'Videocard', width: 180 },
        { field: 'videocardWarranty', headerName: 'Videocard Warranty', width: 180 },
        { field: 'videocardStore', headerName: 'Videocard Store', width: 150 },
        { field: 'storageDevice', headerName: 'Storage Device', width: 180 },
        { field: 'storageDeviceWarranty', headerName: 'Storage Device Warranty', width: 180 },
        { field: 'storageDeviceStore', headerName: 'Storage Device Store', width: 150 },
        { field: 'powerSupply', headerName: 'Power Supply', width: 180 },
        { field: 'powerSupplyWarranty', headerName: 'Power Supply Warranty', width: 180 },
        { field: 'powerSupplyStore', headerName: 'Power Supply Store', width: 150 },
        { field: 'price', headerName: 'Price', width: 120 },
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
            await deletePC(id);
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Error deleting PC:', error);
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

export default PCTable;
