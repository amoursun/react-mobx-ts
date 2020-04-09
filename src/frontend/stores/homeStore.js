import {observable, action} from 'mobx';

class State {
    @observable title = 'Hello World!!! 我是全局 stores'
}

export default new State();

