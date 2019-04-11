import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class AddressItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let { address } = this.props
        console.log("Rendering address item", address)
        return (
            <View style={styles.row}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => this.props.onPress(this.props.address)}>
                    <Text style={styles.name}>{`${address.street} ${address.number}`}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.onDelete(this.props.address)}>
                    <Image source={require('./../assets/img/trash.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16
    },
    email: {
        marginTop: 4
    }
})