import diff from "./diff";

export default class Component {
  constructor(props) {
    this.props = props;
  }
  setState(state) {
    this.state = { ...this.state, ...state };
    // 新旧 virtualDOM 做比对
    const virtualDOM = this.render();
    const oldDOM = this.getDOM();
    const container = oldDOM.parentNode;
    diff(virtualDOM, container, oldDOM);
  }
  setDOM(dom) {
    this._dom = dom;
  }
  getDOM() {
    return this._dom;
  }
  updateProps(props) {
    this.props = props;
  }
  // 生命周期函数
  componentWillMount() {
    console.log("componentWillMount");
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps===nextProps", nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("this", this);
    console.log("shouldComponentUpdate===nextProps", nextProps);
    return nextProps != this.props || nextState != this.state;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate===nextProps", nextProps);
  }
  componentDidUpdate(prevProps, preState) {
    console.log("componentDidUpdate===prevProps", prevProps);
  }
  componentWillUnmount() {}
}
