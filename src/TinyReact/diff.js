import mountElement from "./mountElement";
import updateTextNode from "./updateTextNode";

export default function diff(virtualDOM, container, oldDom) {
  if (!oldDom) {
    // 如果没有旧元素，那么直接做挂载
    mountElement(virtualDOM, container);
  } else {
    // 在根据 virtualDOM 创建 真实DOM 时，将对应 virtualDOM 顺便挂载在 真实DOM 上，方便做 diff 比对
    const oldVirtualDOM = oldDom._virtualDOM;
    if (virtualDOM.type === oldVirtualDOM?.type) {
      if (virtualDOM.type === "text") {
        // 更新文本节点
        updateTextNode(virtualDOM, oldVirtualDOM, oldDom);
      } else {
        // 更新元素节点
      }
    }
    // virtualDOM 的子节点也要做递归比对
    virtualDOM.children.forEach((v, k) => {
      diff(v, oldDom, oldDom.childNodes[k]);
    });
  }
}
