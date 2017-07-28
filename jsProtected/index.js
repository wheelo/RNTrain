/**
 * React Native TODO sample
 */

import {
    AppRegistry,
} from 'react-native';

import Navigator from 'native-navigation';

// 初始化配置
import './setup';


// AppRegistry.registerComponent('Home', () => Home);
Navigator.registerScreen('Home', () => require('./build/screens/HomeScreen'), {
	waitForRender: false,
  	initialConfig: {
    	title: '列表'
  	}
});


Navigator.registerScreen('Edit', () => require('./build/screens/EditScreen'), {
	waitForRender: true,
  	initialConfig: {
    	title: '编辑'
  	}
});

