import { vnode, addVnodes, removeVnodes } from "./vnode";
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
    // 在老节点之首插入新节点
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
    // console.log("newVnode 有 text 没有 children, 待完善该部分逻辑");
    if (newVnode.text !== oldVnode.text) {
      // 如果新的虚拟节点和老的虚拟节点的text 不同，直接写入。如果老节点下边有子节点，直接被覆盖删除
      oldVnode.element.innerText = newVnode.text;
    }
  } else {
    // newVnode 没有 text
    // console.log("newVnode 没有 text");
    // oldVnode 存在子节点列表
    if (isDef(oldVnode.children) && oldVnode.children.length > 0) {
      // 新老都有子节点，此时最复杂
      updateChildren(oldVnode.element, oldVnode.children, newVnode.children);
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
 * 辅助函数
 */
function outputCurrentStatus(parentElement, oldChildren, newChildren) {
  console.log("------------------当前状态------------------");
  console.log(new Date().toLocaleTimeString());
  // 输出当前dom节点列表
  let len = parentElement.children.length;
  let childElmList = [];
  for (let i = 0; i < len; i++) {
    const element = parentElement.children[i];
    childElmList.push(element.innerHTML);
  }
  console.log("当前dom节点：" + childElmList.join(", "));

  // 输出当前的旧节点列表
  let oldChildrenList = [];
  for (let j = 0; j < oldChildren.length; j++) {
    const oldCh = oldChildren[j];
    if (oldCh) {
      oldChildrenList.push(oldCh.text);
    } else {
      oldChildrenList.push("undefined");
    }
  }
  console.log("当前旧节点：" + oldChildrenList.join(", "));
  // 输出当前的新节点列表
  // 输出当前的旧节点列表
  let newChildrenList = [];
  for (let j = 0; j < newChildren.length; j++) {
    newChildrenList.push(newChildren[j].text);
  }
  console.log("当前新节点：" + newChildrenList.join(", "));
}

/**
 * 对比子节点
 * @param {*} params
 */
function updateChildren(parentElement, oldChildren, newChildren) {
  outputCurrentStatus(parentElement, oldChildren, newChildren);
  let oldStartIdx = 0;
  let oldEndIdx = oldChildren.length - 1;
  let newStartIdx = 0;
  let newEndIdx = newChildren.length - 1;
  let oldStartVnode = oldChildren[oldStartIdx];
  let oldEndVnode = oldChildren[oldEndIdx];
  let newStartVnode = newChildren[newStartIdx];
  let newEndVnode = newChildren[newEndIdx];
  let oldChKeyMap = null;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 在处理过程中，情况5，可能会将已处理的节点置为undefined
    // 需要判断，如果为undefined，需要跳过，移动指针
    if (isUnDef(oldStartVnode)) {
      oldStartVnode = oldChildren[++oldStartIdx];
    } else if (isUnDef(oldEndVnode)) {
      oldEndVnode = oldChildren[--oldEndIdx];
    } else if (isUnDef(newStartVnode)) {
      newStartVnode = newChildren[++newStartIdx];
    } else if (isUnDef(newEndVnode)) {
      newEndVnode = newChildren[--newEndIdx];
    } else if (sameNode(oldStartVnode, newStartVnode)) {
      // 新首 vs 旧首
      console.log("命中 1：新尾 vs 旧尾");
      patchVnode(oldStartVnode, newStartVnode); // 相同节点，精细化比较
      // 向后移动旧首、新首的指针
      oldStartVnode = oldChildren[++oldStartIdx];
      newStartVnode = newChildren[++newStartIdx];
    } else if (sameNode(oldEndVnode, newEndVnode)) {
      // 新尾 vs 旧尾
      console.log("命中 2：新尾 vs 旧尾");
      patchVnode(oldEndVnode, newEndVnode); // 相同节点，精细化比较
      // 向后移动新尾、旧尾的指针
      oldEndVnode = oldChildren[--oldEndIdx];
      newEndVnode = newChildren[--newEndIdx];
    } else if (sameNode(oldStartVnode, newEndVnode)) {
      // 新尾 vs 旧首
      console.log("命中 3：新尾 vs 旧首");
      patchVnode(oldStartVnode, newEndVnode); // 相同节点，精细化比较
      // 移动旧首节点到旧尾节点的前边
      parentElement.insertBefore(oldStartVnode.element, oldEndVnode.element);
      // 移动旧首、新尾的指针
      oldStartVnode = oldChildren[++oldStartIdx];
      newEndVnode = newChildren[--newEndIdx];
    } else if (sameNode(oldEndVnode, newStartVnode)) {
      // 新首 vs 旧尾
      console.log("命中 4：新首 vs 旧尾");
      patchVnode(oldEndVnode, newStartVnode); // 相同节点，精细化比较
      parentElement.insertBefore(oldEndVnode.element, newStartVnode.element);
      // 移动旧尾、新首的指针
      oldEndVnode = oldChildren[--oldEndIdx];
      newStartVnode = newChildren[++newStartIdx];
    } else {
      // 以上情况都不满足
      console.log("命中 5：循环查找");
      // 循环查找，可以考虑使用map提高下一次的效率。
      // 将剩余没匹配过的节点，创建 key 索引
      if (!oldChKeyMap) {
        oldChKeyMap = createKeyToOldIdx(oldChildren, oldStartIdx, oldEndIdx);
      }
      let idxInOld = oldChKeyMap[newStartVnode.key];
      if (isUnDef(idxInOld)) {
        // 旧节点列表中没有新节点的 key
        // 直接添加新节点
        if (isUnDef(newStartVnode.element)) {
          newStartVnode.element = createElement(newStartVnode);
        }
        parentElement.insertBefore(
          newStartVnode.element,
          oldStartVnode.element
        );
        // 移动旧首的指针
        oldStartVnode = oldChildren[++oldStartIdx];
      } else {
        // 旧节点列表中存在新节点的 key
        // 移动旧节点到新节点的前边
        const elementToMove = oldChildren[idxInOld];
        parentElement.insertBefore(
          elementToMove.element,
          oldStartVnode.element
        );
      }
    }
  }
  // 双端对比结束
  // 旧列表遍历完了，说明新列表有剩，需要添加新列表中剩余的节点
  if (oldStartIdx > oldEndIdx) {
    // 旧节点先遍历完，添加剩余新节点
    addVnodes(parentElement, newChildren, newStartIdx, newEndIdx);
    // 旧列表遍历完了，说明旧列表有剩，需要删除旧列表中剩余的节点
  }
  if (newStartIdx > newEndIdx) {
    // 新节点先遍历完，删除剩余旧节点
    removeVnodes(parentElement, oldChildren, oldStartIdx, oldEndIdx);
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
    oldVnode.selector === newVnode.selector && oldVnode.key === newVnode.key
  );
}
/**
 * 旧节点列表创建 key 索引
 * @param {*} oldChildren
 * @param {*} oldStartIdx
 * @param {*} oldEndIdx
 * @returns
 */

function createKeyToOldIdx(oldChildren, oldStartIdx, oldEndIdx) {
  let keyToMap = {};
  for (let i = oldStartIdx; i <= oldEndIdx; i++) {
    let key = oldChildren[i].key;
    if (isDef(key)) {
      keyToMap[key] = i;
    }
  }
  return keyToMap;
}
