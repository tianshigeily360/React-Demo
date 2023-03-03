import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";

export default function createDomElement(virtualDOM) {
  let newElement = null;
  // 判断虚拟DOM 类型，文本节点还是元素节点
  if (virtualDOM.type === "text") {
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    newElement = document.createElement(virtualDOM.type);
    // 挂载完元素节点，需要把元素上的属性与事件也设置上
    updateNodeElement(newElement, virtualDOM);
  }
  newElement._virtualDOM = virtualDOM;
  // 递归子节点
  virtualDOM.children?.forEach((v) => {
    mountElement(v, newElement);
  });
  return newElement;
}
