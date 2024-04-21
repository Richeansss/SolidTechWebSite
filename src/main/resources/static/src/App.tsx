import React, { } from 'react';
import {Brand} from "./components/Brand";
import {MotherBoard} from "./components/MotherBoard";





function App() {

    return (
        <div>
            <div className="container mx-auto max-w-5xl pt-5">
                <Brand />
                <MotherBoard />
            </div>

        </div>
    );
}

export default App;
