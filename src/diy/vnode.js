/**
 *
 * @param {*} selector 选择器
 * @param {*} data 数据
 * @param {*} children 子节点
 * @param {*} text 文本
 * @param {*} element 对应的 DOM 元素对象
 * @returns
 */
export default function (selector, data, children, text, element) {
  return {
    selector,
    data,
    children,
    text,
    element,
  };
}
