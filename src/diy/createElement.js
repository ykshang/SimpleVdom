import { isDef, isUnDef } from "./util";

// 把vnode 转换为 DOM节点
export default function createElement(vnode) {
  // console.log("把 vnode 转换为 DOM 节点");
  let domNode = document.createElement(vnode.selector);
  if (
    isDef(vnode.text) &&
    (isUnDef(vnode.children) || vnode.children.length == 0)
  ) {
    // 文本节点，无子节点
    domNode.innerText = vnode.text;
    // 绑定 vnode 和 DOM 节点
    vnode.element = domNode;
  } else if ((Array.isArray(vnode.children), vnode.children.length > 0)) {
    // 子节点是数组
    for (let i = 0; i < vnode.children.length; i++) {
      const ch = vnode.children[i];
      // 递归创建子节点
      ch.element = createElement(ch);
      // 追加子节点，操作 dom
      domNode.appendChild(ch.element);
      // 绑定 vnode 和 DOM 节点
      vnode.element = domNode;
    }
  }
  // 返回对应的dom节点
  return vnode.element;
}
