import React, { Component } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, Platform, AsyncStorage
} from 'react-native';


import { updateText, toggleEditing} from "../stateChanges";

// let { height, width } = Dimensions.get(“window”);
class Edit extends Component {
  	constructor(props) {
    	super(props);
		this.state = {
			loading: true,
			items: [],
			text: this.props.text,
			disabled: false
		}
  	}

	componentWillMount() {
		AsyncStorage.getItem("items").then(json => {
			try {
				const items = JSON.parse(json);
				this.setState({
		      		items,
		      		loading: false
		      	});
		    } catch (error) {
				this.setState({
					loading: false
				});
			}
		});
	}
	// 多组件间的状态共享，现在用asyncStorage
	handleUpdateText(key, text) {
  		this.setState(updateText(key, text));
  		let disabled = false;
  		// 打印宽高等属性，相对于screen : x, y, width, height, pageX, pageY
		// this._doneButton.measure(LOG);
		// measureInWindow(callback) / measureLayout(relativeToNativeNode, onSuccess, onFail)
  		if (text) {
  			// 直接设置属性, setNativeProps
  			this._doneButton.setNativeProps({
  				style: { backgroundColor: '#38f' }
  			});
  			disabled = false;
  		} else {
  			// 直接disabled: true不行
  			this._doneButton.setNativeProps({
  				style: { backgroundColor: 'red' }
  			});
  			disabled = true;
  		}
  		this.setState({ text, disabled});
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

        return (
        	<View>
	            <TouchableOpacity disabled={this.state.disabled} ref={_ => this._doneButton = _} style={styles.done} onPress={() => this.handleToggleEditing(itemKey, false)}>
	                <Text style={styles.doneText}>保存</Text>
	            </TouchableOpacity>
	        </View>
        )
  	}
	
  	render() {
    	return (
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


export default Edit;