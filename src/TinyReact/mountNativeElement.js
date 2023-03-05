import createDomElement from "./createDomElement";
import unmountNode from "./unmountNode";

export default function mountNativeElement(virtualDOM, container, oldDom) {
  const newElement = createDomElement(virtualDOM);
  if (virtualDOM.component) {
    // 如果是类组件render出的 virtualDOM
    // 那么获取其身上绑定的实例化对象
    // 然后调用实例化对象上的 setDOM 方法把将要挂载的 真实DOM 绑定回对象上，方便 setState 做比对
    virtualDOM.component.setDOM(newElement);
  }
  // 将根据虚拟DOM创建的真实DOM挂载在根节点上
  container.appendChild(newElement);
  // 如果存在旧节点，则删除
  oldDom && unmountNode(oldDom);
}
