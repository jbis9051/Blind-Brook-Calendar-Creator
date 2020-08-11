import React from 'react';
import './App.css';
import {Layout} from "./components/Layout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Create} from "./pages/Create";
import {About} from "./pages/About";

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path={"/"}>
                        <Create/>
                    </Route>
                    <Route exact path={"/about"}>
                        <About/>
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
