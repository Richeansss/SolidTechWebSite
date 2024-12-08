import React from 'react';
import CaseList from '../components/case/CaseList';
import CreateCase from '../components/case/CaseList';

const App: React.FC = () => {
    return (
        <div>
            <h1>Магазин компьютеров</h1>
            <CreateCase />
            <CaseList />
        </div>
    );
};

export default App;
