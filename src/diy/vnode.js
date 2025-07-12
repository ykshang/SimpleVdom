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

export function addVnodes(parentElm, vnodes, startIndex, endIndex) {
  // 遍历vnodes,将其对应的DOM节点挂载到parentElm上
  for (let i = startIndex; i <= endIndex; i++) {
    let ch = vnodes[i];
    // 需要判断对应的DOM节点是否存在。不能直接挂载。
    if (isUnDef(ch.element)) {
      // 创建dom,并挂载到虚拟节点ch上
      ch.element = createElement(ch);
    }
    // 根据位置插入到父元素上
    parentElm.insertBefore(ch.element, parentElm.children[i]);
  }
}
export function removeVnodes(parentElm, vnodes, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    // 根据下标逐个找到对应dom元素，并通过父节点移除
    parentElm.removeChild(vnodes[i].element);
  }
}
