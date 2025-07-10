import vnode from "./vnode";
import { isDef } from "./util";
import createElement from "./createElement";

export default function (oldVnode, newVnode) {
  // 此时 oldVnode 是 DOM 节点，需要转换为虚拟节点
  if (isDef(oldVnode.selector)) {
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
    createElement(newVnode, oldVnode.elm);
  }

  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    patch(oldVnode, newVnode);
  } else {
    let newVnodeElm = createElm(newVnode);
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
    oldVnode.elm = null;
  }
}

function sameNode(oldVnode, newVnode) {
  return oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key;
}
