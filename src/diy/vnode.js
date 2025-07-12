import { isUnDef } from "./util";
import createElement from "./createElement";

/**
 *
 * @param {*} selector 选择器
 * @param {*} data 数据
 * @param {*} children 子节点
 * @param {*} text 文本
 * @param {*} element 对应的 DOM 元素对象，他的值是实时获取
 * @returns
 */
export function vnode(selector, data, children, text, element) {
  const key = data.key;
  return {
    selector,
    data,
    children,
    text,
    element,
    key,
  };
}

export function addVnodes(parentElement, vnodes, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    let ch = vnodes[i];
    // 需要判断对应的DOM节点是否存在。不能直接挂载。
    if (isUnDef(ch.element)) {
      // 创建dom,并挂载到虚拟节点上
      ch.element = createElement(ch);
    }
    // 追加到父元素上
    parentElement.appendChild(ch.element);
  }
}
export function removeVnodes(parentElement, vnodes, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    // 移除子DOM节点
    parentElement.removeChild(vnodes[i].element);
  }
}
