/**
 * React Native TODO sample
 */

import {
    AppRegistry,
} from 'react-native';


import Navigator from 'native-navigation';

// import App from './src/app';
//AppRegistry.registerComponent('RNTrain', () => App);

Navigator.registerScreen('RNTrain', () => require('./src/List'), {
	waitForRender: false,
	// todo
  	initialConfig: {
    	title: '列表'
  	}
});


Navigator.registerScreen('Edit', () => require('./src/Edit'), {
	waitForRender: true,
  	initialConfig: {
    	title: '编辑'
  	}
});

