import { isDef } from "./util";

// 创建节点，将 vnode 插入到 pivot 之前
export default function (vnode, pivot) {
  console.log("将 vnode 插入到 privot 之前");
  let domNode = document.createElement(vnode.selector);
  // 判断有子节点和文本吗？
  if (
    isDef(vnode.text) &&
    (isUnDef(vnode.children) || vnode.children.length == 0)
  ) {
    domNode.innerText = vnode.text;
    document.body.insertBefore(domNode, pivot);
  }
}
