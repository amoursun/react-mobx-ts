import React, {Component} from 'react'
import Routes from 'routes';
import stores from 'stores';
import './style.use.less';

const {Provider} = MobxReact;
// const {BrowserRouter: Router} = ReactRouterDOM; // node 启动服务刷新页面白屏
const {HashRouter: Router} = ReactRouterDOM; // node 启动服务刷新页面正常
// import {BrowserRouter as Router, withRouter} from "react-router-dom";


class App extends Component {
    render() {
        return (
            <div className="app-module">
                <Provider {...stores}>
                    <Router basename={__BASENAME__}>{Routes()}</Router>
                </Provider>
            </div>
        )
    }
}

export default App;
