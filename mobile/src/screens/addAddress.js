import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default class AddAddress extends Component {
    constructor(props) {
        super(props);

        this.onAddressSubmit = props.navigation.state.params.onAddressSubmit
        const addressParam = props.navigation.state.params.address

        this.state = Object.assign({
            street: '',
            number: '',
            city: '',
            zipcode: ''
        }, addressParam);

        this.onBtnPressed = this.onBtnPressed.bind(this)
    }

    onBtnPressed = () => {
        let address = this.state
        console.log("Returning address to userform", address)
        this.onAddressSubmit(address)
        this.props.navigation.goBack()
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.field}>
                        <Text>Street</Text>
                        <TextInput
                            onChangeText={(street) => this.setState({ street })}
                            value={this.state.street}
                            style={styles.text} />
                    </View>

                    <View style={styles.field}>
                        <Text>Number</Text>
                        <TextInput
                            onChangeText={(number) => this.setState({ number })}
                            value={this.state.number}
                            style={styles.text} />
                    </View>

                    <View style={styles.field}>
                        <Text>City</Text>
                        <TextInput
                            onChangeText={(city) => this.setState({ city })}
                            value={this.state.city}
                            style={styles.text} />
                    </View>

                    <View style={styles.field}>
                        <Text>Zip code</Text>
                        <TextInput
                            onChangeText={(zipcode) => this.setState({ zipcode })}
                            value={this.state.zipcode}
                            style={styles.text} />
                    </View>

                </ScrollView>

                <TouchableOpacity style={styles.button} onPress={this.onBtnPressed}>
                    <Text style={{ color: '#000' }}>
                        SAVE AND RETURN
                            </Text>
                </TouchableOpacity>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    button: { borderRadius: 8, height: 40, backgroundColor: '#CDD6E3', justifyContent: 'center', alignItems: 'center' },
    container: {
        flex: 1,
        margin: 20
    },
    field: {
        marginTop: 12
    },
    text: { width: '100%', height: 40, padding: 8, borderColor: '#ddd', borderWidth: 1 }
})