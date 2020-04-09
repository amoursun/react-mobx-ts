/**
 * @file: {{compClass}} 状态对象
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{compClass}} 的状态入口页面
 */
import {action, observable, computed} from 'mobx'
import Root from 'utils/Root'

export default class /*{{compStateClass}}*//*skip*/State/*skip*/ extends Root{

  @action
  init(props) {
    this.assign(props)
  }

  @action
  update(props) {
    this.assign(props)
  }

  @action
  exit() {
  }
}
