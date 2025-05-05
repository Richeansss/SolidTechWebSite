import React, { useMemo, useState } from "react";
import { useTable, Column, useSortBy, usePagination, useFilters } from 'react-table';
import { IFPSBuild, IGameFPSCount, IGame } from "../../data/models"; // Импорт интерфейсов IFPSBuild и IGameFPSCount

interface Props {
    data: IFPSBuild[]; // Обновлено имя интерфейса
    tableName: string;
}

const FPSBuildTable: React.FC<Props> = ({ data, tableName }) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [dataFound, setDataFound] = useState<boolean>(true);

    const columns: Column<IFPSBuild>[] = useMemo(() => [
        { Header: 'ID', accessor: 'id' },
        {
            Header: 'Название',
            accessor: (row: IFPSBuild) => row.gameFPSCounts.map((game) => game.game.name).join(', ')
        }
    ], []);

    const filteredData = useMemo(() => {
        if (!searchValue) return data;
        const filtered = data.filter((item) =>
            item.gameFPSCounts.some((game) =>
                game.game.name.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
        setDataFound(filtered.length > 0);
        return filtered;
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
                <>
                    <h2 className="text-3xl font-bold mb-4">{tableName}</h2>
                    <input
                        className="border mb-2 p-1 pl-6 rounded shadow"
                        type="text"
                        placeholder="Поиск по названию"
                        value={searchValue}
                        onChange={handleFilterChange}
                    />
                </>
                {filteredData.length === 0 && !searchValue ? (
                    <p className="text-red-500">Таблица пуста</p>
                ) : filteredData.length === 0 && searchValue ? (
                    <p className="text-red-500">Значение не найдено</p>
                ) : (
                    <>
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
                        <div className="flex justify-between mt-4">
                            {canPreviousPage && (
                                <button onClick={() => previousPage()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Предыдущая
                                </button>
                            )}
                            <div>
                                Страница{' '}
                                <strong>
                                    {pageIndex + 1} из {pageOptions.length}
                                </strong>
                            </div>
                            {canNextPage && (
                                <button onClick={() => nextPage()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Следующая
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FPSBuildTable;
