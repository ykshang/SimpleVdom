import { isDef, isUnDef } from "./util";

// 创建节点，将 vnode 插入到 pivot 之前
export default function (vnode, pivot) {
  console.log("将 vnode 插入到 privot 之前");
  let domNode = document.createElement(vnode.selector);
  if (
    isDef(vnode.text) &&
    (isUnDef(vnode.children) || vnode.children.length == 0)
  ) {
    // 文本节点，无子节点
    domNode.innerText = vnode.text;
    // 操作dom，插入节点
    document.body.insertBefore(domNode, pivot);
  }
}
