export default function createElement(type, props, ...children) {
  const childElements = [].concat(...children).reduce((prev, cur) => {
    // 过滤布尔值和 null，不做渲染
    if (cur !== false && cur !== true && cur !== null) {
      if (cur instanceof Object) {
        prev.push(cur);
      } else {
        const text = createElement("text", { textContent: cur });
        prev.push(text);
      }
    }
    return prev;
  }, []);
  return {
    type,
    props: Object.assign({ children: childElements }, props),
    children: childElements,
  };
}
