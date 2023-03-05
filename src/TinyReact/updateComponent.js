import diff from "./diff";

export default function updateComponent(
  virtualDOM,
  oldComponent,
  oldDom,
  container
) {
  if (oldComponent) {
    const {
      componentWillReceiveProps,
      componentWillUpdate,
      componentDidUpdate,
    } = oldComponent;
    const newProps = virtualDOM.props;
    componentWillReceiveProps(newProps);
    // 判断 新旧props 是否发生变化，变化则强制更新
    // 因为 shouldComponentUpdate 需要 this，所以这里不能用结构出来的方法，否则 this 指向为 undefined
    if (oldComponent.shouldComponentUpdate(newProps)) {
      const prevProps = oldComponent.props;
      componentWillUpdate(newProps);
      // 更新实例对象上的 props
      oldComponent.updateProps(newProps);
      // 获取最新 virtualDOM
      const nextVirtualDOM = oldComponent.render();
      nextVirtualDOM.component = oldComponent;
      // 把最新的 virtualDOM 通过 diff渲染为真实DOM
      diff(nextVirtualDOM, container, oldDom);
      componentDidUpdate(prevProps);
    }
  }
}
