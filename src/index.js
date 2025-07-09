import render from "./diy/render.js";

let r1 = render("div", {}, "文本节点");
console.log(r1);

let r2 = render("div", {}, [
  render("div", {}, "文本节点1"),
  render("div", {}, "文本节点2"),
]);
console.log(r2);

let r3 = render("div", {}, [
  render("div", {}, "文本节点1"),
  render("div", {}, "文本节点2"),
  render("div", {}, [
    render("div", {}, "文本节点3"),
    render("div", {}, [
      render("div", {}, "文本节点4"),
      render("div", {}, "文本节点5"),
    ]),
  ]),
]);
console.log(r3);
