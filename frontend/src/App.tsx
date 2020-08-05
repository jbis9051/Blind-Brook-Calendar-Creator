import React from 'react';
import './App.css';
import {Layout} from "./components/Layout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Home} from "./pages/Home";

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path={"/"}>
                        <Home/>
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
