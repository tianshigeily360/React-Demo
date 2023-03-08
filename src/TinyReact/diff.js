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

    // 1. 遍历当前子节点，把带有 key 的子节点存起来
    let keyElements = {};
    for (let i = 0; i < oldDom.childNodes.length; i++) {
      const domElement = oldDom.childNodes[i];
      // 只有元素节点类型才会有 key
      if (domElement?.nodeType === 1) {
        if (domElement?.getAttribute("key")) {
          // 如果有 key，赋值
          keyElements[domElement.getAttribute("key")] = domElement;
        }
      }
    }

    // 3. 还需要判断 keyElements 中是否有数据
    // 若没有，则直接调用 diff 进行渲染。反之，则做 key值对比
    const hasNoKey = Object.keys(keyElements).length === 0;
    if (hasNoKey) {
      // virtualDOM 的子节点也要做递归比对
      virtualDOM.children.forEach((v, k) => {
        diff(v, oldDom, oldDom?.childNodes[k]);
      });
    } else {
      // 2. 遍历当前 virtualDOM，如果 virtualDOM 中的某一子元素含有 key，且 keyElements 中能找到该 key 值对应的 domElement
      // 那么先判断该 key 对应的 domElement 和 当前索引的 oldDom 子元素是否不同
      // 如果不同那么做位置替换，将 key 对应的 domElement 插入到 当前子元素 前面
      virtualDOM.children.forEach((v, k) => {
        const key = v.props?.key;
        if (key) {
          const domElement = keyElements[key];
          // 有 domElement，即当前节点有可能发生更新
          if (domElement) {
            // 判断当前节点对应元素与该节点上的 key 对应的 domElement 是否相同，不同则换序
            if (oldDom.childNodes[k] && oldDom.childNodes[k] !== domElement) {
              oldDom.insertBefore(domElement, oldDom.childNodes[k]);
            }
          } else {
            // 如果没有 domElement，即当前节点为新增元素，直接执行挂载操作
            mountElement(v, oldDom, oldDom.childNodes[k]);
          }
        }
      });
    }

    // 删除多余子节点
    // 获取旧的真实DOM子节点
    const oldChildNodes = oldDom.childNodes;
    if (virtualDOM.children.length < oldChildNodes.length) {
      if (hasNoKey) {
        for (
          let i = oldChildNodes.length - 1;
          i > virtualDOM.children.length - 1;
          i--
        ) {
          unmountNode(oldChildNodes[i]);
        }
      } else {
        for (let i = 0; i < oldChildNodes.length; i++) {
          const element = oldChildNodes[i];
          const key = element._virtualDOM.props?.key;
          let found = false; // 是否在 virtualDOM 中找到相同 key 的元素
          if (key) {
            for (let v = 0; v < virtualDOM.children.length; v++) {
              const virtualElement = virtualDOM.children[v];
              if (virtualElement.props.key === key) {
                found = true;
              }
            }
          }
          if (!found) {
            // 如果没找到，说明是被删除的节点
            unmountNode(oldChildNodes[i]);
          }
        }
      }
    }
  }
}
