import createDomElement from "./createDomElement";
import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode";
import unmountNode from "./unmountNode";
import diffComponent from "./diffComponent";

export default function diff(virtualDOM, container, oldDom) {
  const oldVirtualDOM = oldDom?._virtualDOM || {};
  const oldComponent = oldVirtualDOM?.component;
  if (!oldDom) {
    // 如果没有旧元素，那么直接做挂载
    mountElement(virtualDOM, container, oldDom);
  } else if (
    oldVirtualDOM.type !== virtualDOM.type &&
    typeof virtualDOM.type !== "function"
  ) {
    // 如果对比的是原生节点且节点类型不一样，则直接创建新DOM节点并替换
    const newElement = createDomElement(virtualDOM);
    oldDom.parentNode.replaceChild(newElement, oldDom);
  } else if (typeof virtualDOM.type === "function") {
    // 对比的是组件
    diffComponent(virtualDOM, oldComponent, oldDom, container);
  } else if (virtualDOM.type === oldVirtualDOM?.type) {
    if (virtualDOM.type === "text") {
      // 更新文本节点
      updateTextNode(virtualDOM, oldVirtualDOM, oldDom);
    } else {
      // 更新元素节点
      updateNodeElement(oldDom, virtualDOM, oldVirtualDOM);
    }
    // virtualDOM 的子节点也要做递归比对
    virtualDOM.children.forEach((v, k) => {
      diff(v, oldDom, oldDom?.childNodes[k]);
    });
    // 删除多余子节点
    // 获取旧的真实DOM子节点
    const oldChildNodes = oldDom.childNodes;
    if (virtualDOM.children.length < oldChildNodes.length) {
      for (
        let i = oldChildNodes.length - 1;
        i > virtualDOM.children.length - 1;
        i--
      ) {
        unmountNode(oldChildNodes[i]);
      }
    }
  }
}
