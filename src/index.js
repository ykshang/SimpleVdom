import h from "./diy./diy/h.js";
import { patch } from "./diy/patch.js";

const container = document.getElementById("container");

const vnode1 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
]);
// const vnode1 = h("section", {}, "待替换的节点");
patch(container, vnode1);

console.log("vnode1", vnode1);

const vnode2 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
]);
// const vnode2 = h("section", {}, '现在是文字');

// 点击按钮 将Vnode1 变更为 vnode2
const btn = document.getElementById("btn");
btn.onclick = function () {
  console.log("vnode1", vnode1);
  patch(vnode1, vnode2);
};
