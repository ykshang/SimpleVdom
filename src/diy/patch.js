import vnode from "./vnode";
import { isDef, isUnDef } from "./util";
import createElement from "./createElement";

export default function (oldVnode, newVnode) {
  // 此时 oldVnode 是 DOM 节点，需要转换为虚拟节点
  if (isUnDef(oldVnode.selector)) {
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }
  // 判断节点是否相同
  if (sameNode(oldVnode, newVnode)) {
    console.log("相同节点");
  } else {
    console.log("不相同，需要移除旧的，插入新的");
    console.log("旧节点 oldVnode：", oldVnode);
    let newVnodeElm = createElement(newVnode);
    // 需要确保 oldVnode 存在父节点
    // 在老节点之前插入新节点
    if (oldVnode.element.parentNode && newVnodeElm) {
      oldVnode.element.parentNode.insertBefore(newVnodeElm, oldVnode.element);
    }
  }

  // if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
  //   patch(oldVnode, newVnode);
  // } else {
  //   let newVnodeElm = createElm(newVnode);
  //   if (oldVnode.elm.parentNode && newVnodeElm) {
  //     oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
  //   }
  //   oldVnode.elm = null;
  // }
}

function sameNode(oldVnode, newVnode) {
  return (
    oldVnode.selector === newVnode.selector && oldVnode.key === newVnode.key
  );
}
