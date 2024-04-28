import React, { useMemo, useState } from "react";
import { useTable, Column, useSortBy, usePagination, useFilters } from 'react-table';

// Объединенный интерфейс для всех типов данных
export interface IData {
    id: number;
    name: string;
}

interface Props {
    data: IData[]; // Поменял имя свойства на data
    tableName: string; // Название таблицы
}

const IdNameTable: React.FC<Props> = ({ data, tableName }) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const columns: Column<IData>[] = useMemo(() => [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Название', accessor: 'name' },
    ], []);

    const filteredData = useMemo(() => {
        if (!searchValue) return data; // Если поисковая строка пустая, возвращаем исходный список
        return data.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [data, searchValue]);

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
        { columns, data: filteredData },
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
                {filteredData.length === 0 ? null : (
                    <>
                        <h2 className="text-3xl font-bold mb-4">{tableName}</h2> {/* Добавлено динамическое вывод названия таблицы */}
                        <input
                            className="border mb-2 p-1 pl-6 rounded shadow"
                            type="text"
                            placeholder="Поиск по названию"
                            value={searchValue}
                            onChange={handleFilterChange}
                        />
                    </>
                )}
                {filteredData.length === 0 ? (
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
                {filteredData.length === 0 ? null : (
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

export default IdNameTable;
