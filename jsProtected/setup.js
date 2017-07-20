// 初始化配置文件


//// DEV ////

console.disableYellowBox = true;
// 全局打印函数
global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};