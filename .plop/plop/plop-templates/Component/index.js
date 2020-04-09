/**
 * @file: {{compClass}} View 组件
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{compClass}} 的 React UI 组件
 */

import {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {h, c} from 'utils/base'

import compStyle from './style.min.less'
import State from './State'

@observer
export default class /*{{compReactClass}}*//*skip*/Comp/*skip*/ extends Component {
  local = {
    state: new State()
  }

  componentWillMount() {
    compStyle.use()
    this.local.state.init(this.props)
  }

  componentWillUnmount() {
    compStyle.unuse()
    this.local.state.exit()
  }

  componentWillReceiveProps(nextProps) {
    this.local.state.init(nextProps)
  }


  render() {
    const {props, local} = this

    return h.div('{{compCSSWrapper}}', {},
      '{{compClass}}'
    )
  }
}
