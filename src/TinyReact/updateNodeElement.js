/**
 *
 * @param {object} newElement 将要被设置属性与事件的元素节点
 * @param {object} virtualDOM 虚拟DOM
 * @param {object} oldVirtualDOM 旧虚拟DOM
 * 首先需要把 virtualDOM 中的 props 属性解析出来
 * 然后分析该属性是什么类型：1.事件(on 开头)；2.表单值(value、checked)；3.非 children 属性
 * 最后根据不同类型对元素节点做绑定
 */
export default function updateNodeElement(
  newElement,
  virtualDOM,
  oldVirtualDOM
) {
  const newProps = virtualDOM.props;
  const oldProps = oldVirtualDOM?.props || {};
  Object.keys(newProps).forEach((v) => {
    const newPropsValue = newProps[v];
    const oldPropsValue = oldProps?.[v];
    // 比对下新旧虚拟DOM上的元素值是否相同，不同则赋新值
    if (newPropsValue !== oldPropsValue) {
      if (v.slice(0, 2) === "on") {
        const eventName = v.slice(2).toLowerCase();
        newElement.addEventListener(eventName, newPropsValue);
        // 事件需要卸载旧值
        newElement.removeEventListener(eventName, oldPropsValue);
      } else if (v === "value" || v === "checked") {
        newElement[v] = newPropsValue;
      } else if (v !== "children") {
        if (v === "className") {
          newElement.setAttribute("class", newPropsValue);
        } else {
          newElement.setAttribute(v, newPropsValue);
        }
      }
    }
  });
  // 还要考虑下属性被删除的情况
  Object.keys(oldProps).forEach((v) => {
    if (!newProps[v]) {
      if (v.slice(0, 2) === "on") {
        const eventName = v.slice(2).toLowerCase();
        newElement.removeEventListener(eventName, oldProps[v]);
      } else if (v !== "children") {
        if (v === "className") {
          newElement.removeAttribute("class");
        } else {
          newElement.removeAttribute(v);
        }
      }
    }
  });
}
