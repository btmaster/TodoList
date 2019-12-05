import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Todos from "./components/Todos";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Todos />
                </div>
            </BrowserRouter>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'));
