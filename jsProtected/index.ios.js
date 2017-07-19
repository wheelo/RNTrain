/**
 * React Native TODO sample
 */

import {
    AppRegistry,
} from 'react-native';

import Navigator from 'native-navigation';


// old: AppRegistry.registerComponent('Home', () => Home);
Navigator.registerScreen('Home', () => require('./src/screens/HomeScreen'), {
	waitForRender: false,
  	initialConfig: {
    	title: '列表'
  	}
});


Navigator.registerScreen('Edit', () => require('./src/screens/EditScreen'), {
	waitForRender: true,
  	initialConfig: {
    	title: '编辑'
  	}
});

