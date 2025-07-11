import vnode from "./vnode.js";
/**
 *
 * @param {*} selector 选择器
 * @param {*} data 属性
 * @param {*} content 内容或者子元素
 * @returns
 * @description 核心函数，用于创建虚拟节点
 */
export default function h(selector, data, content) {
  if (arguments.length !== 3) {
    throw new Error("对不起，必须传入三个参数");
  }
  if (typeof content == "string" || typeof content === "number") {
    // 说明是文本节点 h(“div”, {}, "文本")
    return vnode(selector, data, undefined, content, undefined);
  } else if (Array.isArray(content)) {
    // 说明是数组 h(“div”, {}, [h()])
    let children = [];
    for (let i = 0; i < content.length; i++) {
      const element = content[i];
      if (typeof element !== "object" || !element.hasOwnProperty("selector")) {
        throw new Error("第三个参数的数组中必须传入 h 函数");
      } else {
        // 不需要再次执行 element()，因为在调用的时候，就已经是执行语句。
        // 只需要收集结果即可
        children.push(element);
      }
    }
    return vnode(selector, data, children, undefined, undefined);
  } else if (typeof content == "object" && content.hasOwnProperty("selector")) {
    // 说明是对象 h("div", {}, h())
    let children = [content];
    return vnode(selector, data, children, undefined, undefined);
  } else {
    throw new Error("传入的第三个参数类型不匹配");
  }
}
