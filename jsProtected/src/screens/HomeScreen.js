import React, { Component } from "react";

// Navigator
import Navigator from 'native-navigation';

import Home from "../components/HomePage";


class HomeScreen extends Component {
  	constructor(props) {
    	super(props);
		this.state = {
			theme: 'light'
		};
  	}

  	componentWillMount() {
  		// 初始化的theme从AsyncStorage中更新: dark / light
  		// this.setState({ theme: 'light' })
  	}

  	render() {
    	return (
    		<Navigator.Config
		        title='列表'
		        backgroundColor="#F7F7F7"
		        elevation={4}
		        onBackPress={() => console.log('onBackPress')}
		        onLeftPress={() => console.log('onLeftPress')}
		        onRightPress={(index) => console.log('onRightPress', index)}
		        onAppear={() => console.log('onAppear')}
		    >
    			<Home theme={this.state.theme} />
    		</Navigator.Config>
    	);
  	}
}



export default HomeScreen;