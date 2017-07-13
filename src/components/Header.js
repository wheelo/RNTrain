import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

class Header extends Component {
    // TODO input背景色调整下..
    render() {
        return (
            <View style={styles.header}>
            <TouchableOpacity onPress={this.props.onToggleAllComplete}>
                <Text style={styles.toggleIcon}>
                    {String.fromCharCode(10003)}
                </Text>
            </TouchableOpacity>
            <TextInput
                value={this.props.value}
                onChangeText={this.props.onChange}
                onSubmitEditing={this.props.onAddItem}
                placeholder="想要做什么?"
                blurOnSubmit={false}
                returnKeyType="done"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    toggleIcon: {
        fontSize: 30,
        color: "#CCC"
    },
    input: {
        flex: 1,
        marginLeft: 16,
        height: 50,
        borderWidth: 1,
        borderColor: '#eeeeee',
        paddingLeft: 12
    }
})

export default Header;