import h from "./diy/h.js";

let r1 = h("div", {}, "文本节点");
console.log(r1);

let r2 = h("div", {}, [h("div", {}, "文本节点1"), h("div", {}, "文本节点2")]);
console.log(r2);

let r3 = h("div", {}, [
  h("div", {}, "文本节点1"),
  h("div", {}, "文本节点2"),
  h("div", {}, [
    h("div", {}, "文本节点3"),
    h("div", {}, [h("div", {}, "文本节点4"), h("div", {}, "文本节点5")]),
  ]),
]);
console.log(r3);
