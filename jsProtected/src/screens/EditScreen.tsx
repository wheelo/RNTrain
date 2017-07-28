import React, { Component } from "react";

import Navigator from 'native-navigation';

import Edit from "../components/EditPage";


class EditScreen extends Component {
  	state = { theme: 'light' }

  	ComponentWillMount() {
  		// theme数据从Async中更新
  	}

  	render() {
    	return (
    		<Navigator.Config
		        title='编辑'
		        backgroundColor="#F7F7F7"
		        elevation={4}
		        onBackPress={() => console.log('onBackPress')}
		        onLeftPress={() => console.log('onLeftPress')}
		        onRightPress={(index) => console.log('onRightPress', index)}
		        onAppear={() => console.log('onAppear')}
		    >
		    	<Edit theme={this.state.theme} {...this.props}/>
    		</Navigator.Config>
    	);
  	}
}


export default EditScreen;