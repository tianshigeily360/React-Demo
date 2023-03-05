import mountNativeElement from "./mountNativeElement";
import isFunction from "./isFunction";
import mountComponent from "./mountComponent";

export default function mountElement(virtualDOM, container, oldDom) {
  // 需要区分 virtualDom 是什么类型，component 还是 NativeElement
  if (isFunction(virtualDOM)) {
    // 挂载类或函数组件
    mountComponent(virtualDOM, container, oldDom);
  } else {
    // 挂载原生节点
    mountNativeElement(virtualDOM, container, oldDom);
  }
}
