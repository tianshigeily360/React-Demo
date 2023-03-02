import mountNativeElement from "./mountNativeElement";

export default function mountElement(virtualDOM, container) {
  // 需要区分 virtualDom 是什么类型，component 还是 NativeElement
  // 先处理 NativeElement 渲染
  mountNativeElement(virtualDOM, container);
}
