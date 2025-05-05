import React, { useMemo, useState } from "react";
import { useTable, Column, useSortBy, usePagination, useFilters } from 'react-table';
import { IMotherBoard } from "../../data/models";

interface Props {
    motherboards: IMotherBoard[];
}

const MotherboardsTable: React.FC<Props> = ({ motherboards }) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const columns: Column<IMotherBoard>[] = useMemo(() => [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Название', accessor: 'name' },
        {
            Header: 'Бренд',
            accessor: 'brand',
            Cell: ({ row }: { row: { original: { brand: { name: string } } } }) => <span>{row.original.brand.name}</span>
        },
        { Header: 'Тип памяти', accessor: 'type_of_memory' },
        {
            Header: 'Чипсет',
            accessor: 'chipset',
            Cell: ({ row }: { row: { original: { chipset: { name: string } } } }) => <span>{row.original.chipset.name}</span>
        },
        {
            Header: 'Сокет',
            accessor: 'soket',
            Cell: ({ row }: { row: { original: { soket: { name: string } } } }) => <span>{row.original.soket.name}</span>
        },
        { Header: 'Версия PCI', accessor: 'pci' },
        { Header: 'Кол-во M2', accessor: 'amount_of_m2' },
        { Header: 'URL', accessor: 'url' }
    ], []);

    const filteredMotherboards = useMemo(() => {
        if (!searchValue) return motherboards; // Если поисковая строка пустая, возвращаем исходный список
        return motherboards.filter((mb) =>
            mb.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [motherboards, searchValue]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        { columns, data: filteredMotherboards },
        useFilters,
        useSortBy,
        usePagination
    ) as any;

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    return (
        <div className="border flex flex-col items-center p-4 mt-2">
            <div className="overflow-x-auto">
                {filteredMotherboards.length === 0 ? null : (
                    <>
                        <h2 className="text-3xl font-bold mb-4">Список материнских плат</h2>
                        <input
                            className="border mb-2 p-1 rounded"
                            type="text"
                            placeholder="Поиск по названию"
                            value={searchValue}
                            onChange={handleFilterChange}
                        />
                    </>
                )}
                {filteredMotherboards.length === 0 ? (
                    <p className="text-red-500">Нет данных для отображения</p>
                ) : (
                    <table {...getTableProps()} className="border-collapse border border-gray-500 w-full">
                        <thead>
                        {headerGroups.map((headerGroup: any) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
                                {headerGroup.headers.map((column: any) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="border border-gray-500 px-4 py-2 text-left"
                                    >
                                        {column.render('Header')}
                                        <span className="ml-1">
                                            {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {page.map((row: any) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                                    {row.cells.map((cell: any) => (
                                        <td className="border border-gray-500 px-4 py-2" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                )}
                {filteredMotherboards.length === 0 ? null : (
                    <>
                        {pageOptions.length > 1 && (
                            <div className="flex justify-between mt-4">
                                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Предыдущая
                                </button>
                                <div>
                                    Страница{' '}
                                    <strong>
                                        {pageIndex + 1} из {pageOptions.length}
                                    </strong>
                                </div>
                                <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Следующая
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MotherboardsTable;
