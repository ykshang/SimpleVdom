import vnode from "./vnode";
import { isDef, isUnDef } from "./util";
import createElement from "./createElement";

export function patch(oldVnode, newVnode) {
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
    patchVnode(oldVnode, newVnode);
  } else {
    // 移除旧节点，插入新节点
    let newVnodeElm = createElement(newVnode);
    // 需要确保 oldVnode 存在父节点
    // 在老节点之前插入新节点
    if (oldVnode.element.parentNode && newVnodeElm) {
      oldVnode.element.parentNode.insertBefore(newVnodeElm, oldVnode.element);
    }
    // 删除老节点
    oldVnode.element.parentNode.removeChild(oldVnode.element);
  }
}

/**
 *
 * @param {*} oldVnode
 * @param {*} newVnode
 * @desc 相同节点，精细化比较
 */
function patchVnode(oldVnode, newVnode) {
  // 二者完全相同
  if (oldVnode === newVnode) {
    console.log("相同节点，无需处理");
    return;
  }
  if (
    isDef(newVnode.text) &&
    (isUnDef(newVnode.children) || newVnode.children.length === 0)
  ) {
    // newVnode 有 text，同时没有children
    console.log("newVnode 有 text 没有 children, 待完善该部分逻辑");
    if (newVnode.text !== oldVnode.text) {
      // 如果新的虚拟节点和老的虚拟节点的text 不同，直接写入。如果老节点下边有子节点，直接被覆盖删除
      oldVnode.element.innerText = newVnode.text;
    }
  } else {
    // newVnode 没有 text
    console.log("newVnode 没有 text");
    // oldVnode 存在子节点列表
    if (isDef(oldVnode.children) && oldVnode.children.length > 0) {
      // 新老都有子节点，此时最复杂
    } else {
      // oldVnode 没有子节点列表，newVnode 有子节点列表
      // 清空 oldVnode 的文字
      oldVnode.element.innerHTML = "";
      // 逐个将 newVode 的子节点追加到 oldVnode 上
      for (let i = 0; i < newVnode.children.length; i++) {
        const ch = newVnode.children[i];
        // 虚拟节点转 dom
        let chElm = createElement(ch);
        // 逐个追加到 dom 树上
        oldVnode.element.appendChild(chElm);
      }
    }
  }
}
/**
 *
 * @param {} oldVnode
 * @param {*} newVnode
 * @returns {boolean}
 * @desc 判断节点是否相同
 */
function sameNode(oldVnode, newVnode) {
  return (
    oldVnode.selector === newVnode.selector &&
    oldVnode.data.key === newVnode.data.key
  );
}
