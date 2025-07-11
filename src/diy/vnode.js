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
  return {
    selector,
    data,
    children,
    text,
    element,
  };
}

export function addVnodes(parentElement, vnodes, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    parentElement.appendChild(vnodes[i].element);
  }
}
export function removeVnodes(parentElement, vnodes, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    parentElement.removeChild(vnodes[i].element);
  }
}
