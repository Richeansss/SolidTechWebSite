import React from 'react';
import { useGetCasesQuery, useDeleteCaseMutation } from '../../store/api/apiCase';

const CaseList: React.FC = () => {
    const { data: cases, isLoading, isError } = useGetCasesQuery();
    const [deleteCase] = useDeleteCaseMutation();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading cases</p>;

    const handleDelete = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить корпус?')) {
            await deleteCase(id);
        }
    };

    return (
        <div>
            <h2>Список корпусов</h2>
            <ul>
                {cases?.map((caseItem) => (
                    <li key={caseItem.id}>
                        {caseItem.name}{' '}
                        <button onClick={() => handleDelete(caseItem.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CaseList;
