import render from "./diy/render.js";
import patch from "./diy/patch.js";
const container = document.getElementById("container");

const vnode1 = render("h1", {}, "你好");
const vnode2 = render("ul", {}, [
  render("li", {}, "1"),
  render("li", {}, "2"),
  render("li", {}, [
    render("div", {}, [
      render("ol", {}, [
        render("li", {}, "A"),
        render("li", {}, "B"),
        render("li", {}, "C"),
      ]),
    ]),
  ]),
  render("li", {}, "4"),
]);

console.log(vnode1);
console.log(vnode2);
// patch(container, vnode2);

// 点击按钮 将Vnode1 变更为 vnode2
const btn = document.getElementById("btn");
btn.onclick = function () {
  patch(container, vnode2);
};
