// 文本节点 比对更新
export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDom) {
  if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    // 如果新旧虚拟节点上的 textContent 内容不同，更新真实节点上的内容
    oldDom.textContent = virtualDOM.props.textContent;
  }
  // 同步更新真实DOM节点上的 _virtualDOM
  oldDom._virtualDOM = virtualDOM;
}
