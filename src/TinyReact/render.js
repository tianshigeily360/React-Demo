import diff from "./diff";

export default function render(virtualDOM, container, oldDom) {
  diff(virtualDOM, container, oldDom);
}
