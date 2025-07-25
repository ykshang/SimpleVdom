import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 通过传入模块初始化 patch 函数
const patch = init([
  classModule, // 开启 classes 功能
  propsModule, // 支持传入 props
  styleModule, // 支持内联样式同时支持动画
  eventListenersModule, // 添加事件监听
]);

const container = document.getElementById("container");
console.log(container);

// const vnode1 = h("div#container.two.classes", { on: { click: someFn } }, [
//   h("span", { style: { fontWeight: "bold" } }, "This is bold"),
//   " and this is just normal text",
//   h("a", { props: { href: "/foo" } }, "I'll take you places!"),
// ]);
// console.log(vnode1);
// // 传入一个空的元素节点 - 将产生副作用（修改该节点）
// patch(container, vnode1);

// const vnode2 = h(
//   "div#container.two.classes",
//   { on: { click: anotherEventHandler } },
//   [
//     h(
//       "span",
//       { style: { fontWeight: "normal", fontStyle: "italic" } },
//       "This is now italic type"
//     ),
//     " and this is still just normal text",
//     h("a", { props: { href: "/bar" } }, "I'll take you places!"),
//   ]
// );
// console.log(vnode2);

// // 再次调用 `patch`
// patch(vnode1, vnode2); // 将旧节点更新为新节点
const vnode1 = h("div", "Hello, Vnode!");
console.log(vnode1);
patch(container, vnode1); // 将旧节点更新为新节点

function clickItem({ target }) {
  console.log(target.innerText);
  // console.log(...arguments);
}
const style = {
  cursor: "pointer",
  margin: "10px",
  textDecoration: 'underline'
};
const vnode2 = h("ul", { key: "list" }, [
  h("li", { key: "item1", on: { click: clickItem }, style }, "Item 1"),
  h("li", { key: "item2", on: { click: clickItem }, style }, "Item 2"),
  h("li", { key: "item3", on: { click: clickItem }, style }, "Item 3"),
]);

patch(vnode1, vnode2); // 将旧节点更新为新节点
