import React, { Component } from "react";
import Navigator from 'native-navigation';

import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";


class ListItem extends Component {
    ScreenTo = () => {
        Navigator.push('Edit', {
            ...this.props
        });
    };

    render() {
        const { complete } = this.props;
        const textComponent = (
            <TouchableOpacity style={styles.textWrap} onPress={() => this.ScreenTo()}>
                <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
            </TouchableOpacity>
        );

        const removeButton = (
            <TouchableOpacity onPress={this.props.onRemove}>
            <Text style={styles.delete}>x</Text>
            </TouchableOpacity>
        );

        return (
            <View style={styles.container}>
                <Switch style={styles.switchContainer}
                    value={complete}
                    onValueChange={this.props.onComplete}
                />
                {textComponent}
                {removeButton}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    complete: {
        textDecorationLine: "line-through"
    },
    text: {
        fontSize: 22,
        color: "#4d4d4d",
    },
    delete: {
        fontSize: 28,
        color: "#cc9a9a"
    }
});


export default ListItem;