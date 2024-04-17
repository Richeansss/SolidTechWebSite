import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {IBrand} from "./data/models";
import {Brand} from "./components/Brand";



function App() {

    return (
        <div>
            <div className="container mx-auto max-w-2xl pt-5">
                <Brand />
                <Brand />
            </div>

        </div>
    );
}

export default App;
