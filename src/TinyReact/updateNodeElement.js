/**
 *
 * @param {object} newElement 将要被设置属性与事件的元素节点
 * @param {object} virtualDOM 虚拟DOM
 * 首先需要把 virtualDOM 中的 props 属性解析出来
 * 然后分析该属性为什么类型：1.事件(on 开头)；2.表单值(value、checked)；3.非 children 属性
 * 最后根据不同类型对元素节点做绑定
 */
export default function updateNodeElement(newElement, virtualDOM) {
  const newProps = virtualDOM.props;
  Object.keys(newProps).forEach((v) => {
    const newPropsValue = newProps[v];
    if (v.slice(0, 2) === "on") {
      newElement.addEventListener(v.slice(2).toLowerCase(), newPropsValue);
    } else if (v === "value" || v === "checked") {
      newElement[v] = newPropsValue;
    } else if (v !== "children") {
      if (v === "className") {
        newElement.setAttribute("class", newPropsValue);
      } else {
        newElement.setAttribute(v, newPropsValue);
      }
    }
  });
}
