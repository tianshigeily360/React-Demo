import diff from "./diff";

export default function render(
  virtualDOM,
  container,
  oldDom = container.firstChild
) {
  console.log("virtualDOM", virtualDOM);
  diff(virtualDOM, container, oldDom);
}
