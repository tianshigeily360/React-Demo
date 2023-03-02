import createDomElement from "./createDomElement";

export default function mountNativeElement(virtualDOM, container) {
  const newElement = createDomElement(virtualDOM);
  // 将根据虚拟DOM创建的真实DOM挂载在根节点上
  container.appendChild(newElement);
}
