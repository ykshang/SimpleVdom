import { isDef, isUnDef } from "./util";

// 创建DOM节点
export default function (vnode) {
  console.log("将 vnode 插入到 privot 之前");
  let domNode = document.createElement(vnode.selector);
  if (
    isDef(vnode.text) &&
    (isUnDef(vnode.children) || vnode.children.length == 0)
  ) {
    // 文本节点，无子节点
    domNode.innerText = vnode.text;
    vnode.element = domNode;
  } else if ((Array.isArray(vnode.children), vnode.children.length > 0)) {
    // 子节点是数组
    for (let i = 0; i < vnode.children.length; i++) {
      const element = vnode.children[i];
      // createElement(element, domNode);
    }
  }
  // 返回对应的dom节点
  return vnode.element;
}
