/**
 * @file PAGE_NAME 页面入口组件
 * @author YOURNAME
 */


import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {h, c} from 'utils/base'
import State from './state'
import pageStyle from './style.use.less'
import ErrorWall from 'common/components/ErrorWall'

@inject('app')
@observer
export default class IndexPage extends Component {

    local = {
        state: new State()
    }

    componentWillMount() {
        pageStyle.use()
        this.local.state.init()
    }

    componentWillUnmount() {
        pageStyle.unuse()
        this.local.state.exit()
    }

    render() {
        return h.div('page-error-404', {},
            h(ErrorWall, {type: '404'})
        )
    }
}
