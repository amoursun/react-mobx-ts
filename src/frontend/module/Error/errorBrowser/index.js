/**
 * @file PAGE_NAME 页面入口组件
 * @author YOURNAME
 */


import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {h, c} from 'utils/base'
import pageStyle from './style.use.less'

@inject('app')
@observer
export default class IndexPage extends Component {

    componentWillMount() {
        pageStyle.use()
    }

    componentWillUnmount() {
        pageStyle.unuse()
    }

    render() {
        return h.div('page-error-browser', {},
            h.div('browser-img', {}),
            // h.div('browser-text', {}, _i('not_low_browser'))
            h.div('browser-text', {},
                '暂时不支持ie11以下, chrome, firefox, safrai 等其低版本浏览器, 请更新浏览器版本'
            )
        )
    }
}
