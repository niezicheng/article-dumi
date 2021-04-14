/**
 * apply 方法
 * 说明：改变 this 指向，接受数组作为函数参数
 */
export default function (context: any = global, args: Array<any>) {
  // 将调用 myCall 的 function 的 this 指向赋给 context 的 fn 属性
  context.fn = this;

  let result;
  if (!args) {
    result = context.fn();
  } else {
    result = context.fn(...args); // 执行函数
  }

  delete context.fn; // 删除属性，避免污染
  return result;
}
