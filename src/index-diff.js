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

const vnode1 = h("ul", {}, [
  h("li", { id:'li-1', key: "li-1" }, "111"),
  h("li", { id:'li-2', key: "li-2" }, "222"),
  h("li", { id:'li-3', key: "li-3" }, "333"),
]);

const container = document.getElementById("container");
patch(container, vnode1);

const vnode2 = h("ul", {}, [
  h("li", {id:'li-1', key: "li-1" }, "111"),
  h("li", {id:'li-4', key: "li-4" }, "444"),
  h("li", {id:'li-3', key: "li-3" }, "333"),
  h("li", {id:'li-5', key: "li-5" }, "555"),
]);

// 点击按钮 将Vnode1 变更为 vnode2
const btn = document.getElementById("btn");
btn.onclick = function () {
  patch(vnode1, vnode2);
};
