import React, { } from 'react';
import {Brand} from "./components/Brand";
import {MotherBoard} from "./components/MotherBoard";
import {Soket} from "./components/Soket";
import {Chipset} from "./components/Chipset";
import {Game} from "./components/Game";






function App() {

    return (
        <div>
            <div className="container mx-auto max-w-5xl pt-5">
                <MotherBoard />
                <div className="flex flex-wrap justify-center items-center space-x-4">
                    <Brand />
                    <Soket />
                    <Chipset />
                </div>
                <Game />
            </div>

        </div>
    );
}

export default App;
