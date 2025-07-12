// 是否有定义
export function isDef(val) {
  return val !== null && val !== undefined && val !== "";
}
// 是否未定义
export function isUnDef(val) {
  return val === null || val === undefined || val === "";
}
