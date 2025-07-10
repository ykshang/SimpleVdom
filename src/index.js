import render from "./diy/render.js";
import patch from "./diy/patch.js";
const container = document.getElementById("container");

const vnode1 = render("section", {}, [
  render("p", {}, "A"),
  render("p", {}, "B"),
  render("p", {}, "C"),
]);
patch(container, vnode1);

console.log("vnode1", vnode1);

const vnode2 = render("section", {}, [
  render("p", {}, "A"),
  render("p", {}, "B"),
  render("p", {}, "C"),
  render("p", {}, "D"),
]);

// 点击按钮 将Vnode1 变更为 vnode2
const btn = document.getElementById("btn");
btn.onclick = function () {
  patch(vnode1, vnode2);
};
