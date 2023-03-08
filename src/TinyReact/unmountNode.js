export default function unmountNode(node) {
  const virtualDOM = node._virtualDOM;
  if (virtualDOM.type === "text") {
    node.remove();
    return;
  }
  const component = virtualDOM.component;
  if (component) {
    component.componentWillUnmount();
  }
  if (virtualDOM.props?.ref) {
    virtualDOM.props.ref(null);
  }
  Object.keys(virtualDOM.props).forEach((v) => {
    if (v.slice(0, 2) === "on") {
      node.removeEventListener(v.slice(2).toLowerCase(), virtualDOM.props[v]);
    }
  });
  if (node.childNodes?.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i]);
      i--;
    }
  }
  node.remove();
}
