import mountElement from "./mountElement";

export default function createDomElement(virtualDOM) {
  let newElement = null;
  // 判断虚拟DOM 类型，文本节点还是元素节点
  if (virtualDOM.type === "text") {
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    newElement = document.createElement(virtualDOM.type);
  }
  // 递归子节点
  virtualDOM.children?.forEach((v) => {
    mountElement(v, newElement);
  });
  return newElement;
}
