# RNTrain
RN简单TODO项目，此项目也可以作为RN启动项目

## 特征
  - [x]集成Native Navigation(Pod)
  - [x]集成现有项目(Pod)
  - [x]使用最新版的RN与React Native
  - [ ]TypeScript语法支持(todo)

[PPT地址](./PPT/RN基础与进阶.key)

## 安装

```sh
	>> npm install
	>> pod install
```
- 注意安装过程会出现Animation动画库引用错误，找到错误的那一行，修改为：`import <React/RCTValueAnimatedNode.h>`

## 使用

``` sh
	// 找到RNTrain.xcworkspace，Xcode启动
	// 然后命令行执行:
	>> sh build.sh
```

## 参考
- Native Navigation: http://airbnb.io/native-navigation/docs/installation.html
- 集成现有项目: https://facebook.github.io/react-native/docs/integration-with-existing-apps.html
