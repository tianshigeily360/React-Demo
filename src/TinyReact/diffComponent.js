import mountElement from "./mountElement";
import updateComponent from "./updateComponent";

export default function diffComponent(
  virtualDOM,
  oldComponent,
  oldDom,
  container
) {
  if (virtualDOM.type === oldComponent?.constructor) {
    // 通过构造函数比对，是同一组件
    // 需要更新组件
    updateComponent(virtualDOM, oldComponent, oldDom, container);
  } else {
    // 不是同一组件，需替换
    // 替换完成还需要删除旧组件，所以 oldDOM 要入参
    mountElement(virtualDOM, container, oldDom);
  }
}
