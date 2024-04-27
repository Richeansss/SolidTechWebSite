import React, { useMemo } from "react";
import { useTable, Column, useSortBy, usePagination, useFilters } from 'react-table';
import { IMotherBoard } from "../../data/models";

interface Props {
    motherboards: IMotherBoard[];
}

const MotherboardsTable: React.FC<Props> = ({ motherboards }) => {
    const columns: Column<IMotherBoard>[] = useMemo(() => [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Название', accessor: 'name' },
        {
            Header: 'Бренд',
            accessor: 'brand',
            Cell: ({ row }) => <span>{row.original.brand.name}</span>
        },
        { Header: 'Тип памяти', accessor: 'type_of_memory' },
        { Header: 'Чипсет', accessor: 'chipset' },
        {
            Header: 'Сокет',
            accessor: 'soket',
            Cell: ({ row }) => <span>{row.original.soket.name}</span>
        },
        { Header: 'Версия PCI', accessor: 'pci' },
        { Header: 'Кол-во M2', accessor: 'amount_of_m2' },
        { Header: 'URL', accessor: 'url' }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        setFilter,
        state: { pageIndex, pageSize }
    } = useTable({ columns, data: motherboards }, useFilters, useSortBy, usePagination);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value || undefined;
        setFilter("name", value);
    };

    return (
        <div className="border flex flex-col items-center p-4 mt-2">
            {motherboards.length > 0 && (
                <div className="overflow-x-auto">
                    <h2 className="text-xl font-bold mb-4">Список материнских плат</h2>
                    <input
                        className="border mb-2 p-1"
                        type="text"
                        placeholder="Поиск по названию"
                        onChange={handleFilterChange}
                    />
                    <table {...getTableProps()} className="border-collapse border border-gray-500 w-full">
                        <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="border border-gray-500 px-4 py-2 text-left"
                                    >
                                        {column.render('Header')}
                                        <span>
                                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                            </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td className="border border-gray-500 px-4 py-2" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            Предыдущая
                        </button>
                        <div>
                            Страница{' '}
                            <strong>
                                {pageIndex + 1} из {Math.ceil(motherboards.length / pageSize)}
                            </strong>
                        </div>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            Следующая
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MotherboardsTable;
