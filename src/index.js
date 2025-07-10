import render from "./diy/render.js";
import patch from "./diy/patch.js";
const container = document.getElementById("container");

const vnode1 = render("h1", {}, "你好");
const vnode2 = render("ul", {}, [
  render("li", {}, "1"),
  render("li", {}, "2"),
]);
patch(container, vnode2);
