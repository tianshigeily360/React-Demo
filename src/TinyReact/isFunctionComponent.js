import isFunction from "./isFunction";

export default function isFunctionComponent(virtualDOM) {
  return isFunction(virtualDOM) && !virtualDOM.type?.prototype?.render;
}
