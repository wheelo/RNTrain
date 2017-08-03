# RNTrain
general RN starter Project - support Native Navigation, TS, Mobx & Redux integrated with the latest version of react, react-native

## Feature
  - [x] Integrate with airbnb's [Native Navigation](http://airbnb.io/native-navigation/docs/installation.html)
  - [x] Use Pod to integrate with exsiting project
  - [x] Deploy all code under the environment of the latested version of React & React Native("react": "16.0.0-alpha.12", "react-native": "^0.47.1")
  - [x] Support TypeScript Grammer instead of FLow(in TS-sample branch)
  - [ ] Support Mobx & Redux(in mobx-sample/redux-sample branch)

[powerpoint is here(Chinese)](./PPT/RN基础与进阶.key)

## Installation
Installation mainly goes to Pod installation. As this is a repo for integrated with exsiting project:   

```sh
	>> npm install
	>> pod install
```
- The installation will report an error about the animation, when error occurres, Plz change the line of source code to this: `import <React/RCTValueAnimatedNode.h>`

## Usage

``` sh
	// Find RNTrain.xcworkspace and kick off the Xcode
	// exec the following command:
	>> sh build.sh
```

## references
- Native Navigation: http://airbnb.io/native-navigation/docs/installation.html
- Integrate with the exsiting project: https://facebook.github.io/react-native/docs/integration-with-existing-apps.html
