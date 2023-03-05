import isFunctionComponent from "./isFunctionComponent";
import mountElement from "./mountElement";

// 挂载组件，需要判断是 类组件 还是 函数组件
export default function mountComponent(virtualDOM, container, oldDom) {
  let nextVirtualDOM = null;
  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    nextVirtualDOM = buildFUnctionComponent(virtualDOM);
    console.log("函数组件。。。");
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM);
    console.log("类组件。。。");
  }
  mountElement(nextVirtualDOM, container, oldDom);
}

function buildFUnctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {});
}
function buildClassComponent(virtualDOM) {
  const classVirtualDom = new virtualDOM.type(virtualDOM.props); // 类组件的实例化对象
  const nextVirtualDOM = classVirtualDom.render(); // 类组件 render 后的虚拟DOM
  nextVirtualDOM.component = classVirtualDom;
  return nextVirtualDOM;
}
