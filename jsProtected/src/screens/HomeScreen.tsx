import React, { Component } from 'react';

// Navigator
import Navigator from 'native-navigation';

import Home from "../components/HomePage";

// interface Props
interface State {
	theme: String
}


class HomeScreen extends Component<State> {
	state = { theme: 'light' }

  	componentWillMount() {
  		// 初始化的theme从AsyncStorage中更新: dark / light
  		// this.setState({ theme: 'dark' })
  	}

  	render() {
    	return (
    		<Navigator.Config
		        title='列表'
		        backgroundColor="#F7F7F7"
		        elevation={4}
		        onBackPress={() => console.log('onBackPress')}
		        onLeftPress={() => console.log('onLeftPress')}
		        onRightPress={index => console.log('onRightPress', index)}
		        onAppear={() => console.log('onAppear')}
		    >
    			<Home theme={this.state.theme} />
    		</Navigator.Config>
    	);
  	}
}

// const styles

export default HomeScreen;