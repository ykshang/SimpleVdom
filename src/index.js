import render from "./diy/render.js";
import patch from "./diy/patch.js";
const container = document.getElementById("container");

const vnode1 = render("ul", {}, [
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
patch(container, vnode1);

const vnode2 = render("section", {}, [
  render("h1", {}, "你好"),
  render("p", {}, "这是一个段落"),
  render("ul", {}, [
    render("li", {}, "列表项1"),
    render("li", {}, "列表项2"),
    render("li", {}, "列表项3"),
  ]),
]);
console.log(vnode2);

// 点击按钮 将Vnode1 变更为 vnode2
const btn = document.getElementById("btn");
btn.onclick = function () {
  patch(vnode1, vnode2);
};
