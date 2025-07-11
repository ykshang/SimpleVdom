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
      // 新的存在子节点列表，此时最复杂，新老都有子节点
      let uIndex = 0; // 代表下边，等于 i
      for (let i = 0; i < newVnode.children.length; i++) {
        let ch = newVnode.children[i];
        let isExistFlg = false;
        for (let j = 0; j < oldVnode.children.length; j++) {
          const oCh = oldVnode.children[j];
          if (sameNode(oCh, ch)) {
            // 相同节点，精细化比较
            isExistFlg = true;
            // break;
          }
        }
        if (!isExistFlg) {
          // 如果节点不存在，创建 dom 并插入
          console.log(i, ch);
          let chDom = createElement(ch);
          ch.element = chDom;
          // 遍历的时候需要注意下标，针对场景 新 [1,2,3,6,7,4,5]，老 [1,2,3,4] 的情况
          if (uIndex < oldVnode.children.length) {
            // 获取要插入的元素在 newVnode里的下标，并插入到 oldVnode.element 中对应的元素之前。
            oldVnode.element.insertBefore(
              chDom,
              oldVnode.children[uIndex].element
            );
          } else {
            oldVnode.element.appendChild(chDom);
          }
        } else {
          uIndex++; // 向后移动下标
        }
      }
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
