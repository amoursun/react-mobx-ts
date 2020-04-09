import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {toJS} from 'mobx';
import {inject, observer} from 'mobx-react';

import pageStyle from './style.use.less'

// import State from './State' // mobx State 放同级
// @observer
// class Home extends Component {
//     local = {
//         state: new State()
//     }
//
//     constructor(props) {
//         super(props);
//         console.log(props)
//     }
//
//     render() {
//         let {title} = this.local.state;
//         return (
//             <h1>{title}</h1>
//         );
//     }
// }

/**
 *
 * App.js 写成stores={stores} 不能写{...stores}
 * <Provider stores={stores}>
 *      <Router basename={__BASENAME__}>{Routes()}</Router>
 * </Provider>
 */
// @inject('stores')
// @observer
// class Home extends Component {
//     local = {
//         state: this.props.stores.homeStore
//     }
//
//     constructor(props) {
//         super(props);
//         console.log(props)
//     }
//
//     render() {
//         let {title} = this.local.state;
//         return (
//             <h1>{title}</h1>
//         );
//     }
// }

/**
 *
 * App.js 写成{...stores} 不能写stores={stores}
 * <Provider {...stores}>
 *      <Router basename={__BASENAME__}>{Routes()}</Router>
 * </Provider>
 */
// const Home = inject('homeStore')(observer(({homeStore}) => {
//     return (
//         <h1>{homeStore.title}</h1>
//     );
// }));

/**
 *
 * App.js 写成{...stores} 不能写stores={stores}
 * <Provider {...stores}>
 *      <Router basename={__BASENAME__}>{Routes()}</Router>
 * </Provider>
 */
@inject('homeStore')
@observer
class Home extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    componentWillMount() {
      pageStyle.use()
    }

    componentWillUnmount(){
      pageStyle.unuse()
    }

    render() {
        let {title} = this.props.homeStore;
        return (
            <h1>{title}</h1>
        );
    }
}


export default Home;

