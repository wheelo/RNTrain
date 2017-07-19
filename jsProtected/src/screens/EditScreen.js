import React, { Component } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, Platform, AsyncStorage
} from 'react-native';

import Navigator from 'native-navigation';

import { updateText, toggleEditing} from "../stateChanges";


class App extends Component {
  	constructor(props) {
    	super(props);
		this.state = {
			loading: true,
			displayButton: false,
			items: [],
			text: this.props.text
		}
  	}

	componentWillMount() {
		AsyncStorage.getItem("items").then(json => {
			try {
				const items = JSON.parse(json);
				this.setState({
		      		items,
		      		loading: false,
		      		displayButton: true
		      	});
		    } catch (error) {
				this.setState({
					loading: false
				});
			}
		});
	}

	handleUpdateText(key, text) {
  		// 多组件间的状态共享，现在用asyncStorage
  		this.setState(updateText(key, text));
  		if (text) {
  			if (!this.state.displayButton) {
  				this.setState({ displayButton: true });
  			}
  		} else {
  			// setNativeProps
  			if (this.state.displayButton) {
  				this.setState({ displayButton: false });
  			}
  		}
  		this.setState({ text });
  	}

  	handleToggleEditing(key, editing) {
  		this.setState(toggleEditing(key, editing));
  		Navigator.present('Home');
  	}

  	// 输入文本框
  	_renderEditComponent() {
  		const { itemKey } = this.props;
  		return (
  			<View style={styles.textWrap}>
	            <TextInput
	                onChangeText={text => this.handleUpdateText(itemKey, text)}
	                autoFocus
	                value={this.state.text}
	                style={styles.input}
	                autoCapitalize="none"
	                autoCorrect={false}
	                multiline
	            />
          	</View>
        );
  	}

  	// 保存按钮
  	_renderDoneButton() {
  		const { itemKey } = this.props;
  		const { displayButton } = this.state;

        return (
        	displayButton ? 
        	<View>
	            <TouchableOpacity style={styles.done} onPress={() => this.handleToggleEditing(itemKey, false)}>
	                <Text style={styles.doneText}>保存</Text>
	            </TouchableOpacity>
	        </View>
	        :
	        <View></View>
        )
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
    			<View style={styles.container}>
    				{this._renderEditComponent()}
					{this._renderDoneButton()}
					{this.state.loading &&
			          	<View style={styles.loading}>
				            <ActivityIndicator
				              	animating
				              	size="large"
				            />
				        </View>
			        }
    			</View>
    		</Navigator.Config>
    	);
  	}
}

// 样式
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		...Platform.select({
			ios: { paddingTop: 66 }
		})
	},
	input: {
        flex: 1,
        fontSize: 20,
        padding: 0,
        flexDirection: "row",
        alignItems: "center",
        color: "#4d4d4d"
    },
	textWrap: {
        flex: 1,
        marginHorizontal: 10,
    },
    done: {
        backgroundColor: "#38f",
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    doneText: {
        color: "#fff",
        fontSize: 16,
    },
    loading: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.2)"
	}
})

export default App;