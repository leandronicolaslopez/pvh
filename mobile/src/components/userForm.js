import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, FlatList, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import AddressItem from './addressItem';

export const validateUser = (user) => {
    return user.name && validateMail(user.email);
}

export const validateMail = (mail) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail)
}

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            touchedName: false,
            touchedMail: false
        };

        this.dispatchChange = this.dispatchChange.bind(this)
        this.onAddressSubmit = this.onAddressSubmit.bind(this)
        this.onAddressDeletePressed = this.onAddressDeletePressed.bind(this)
    }

    dispatchChange = (user) => {
        this.props.onValueChange(user)
    }

    onAddressSubmit = (address) => {
        let user = this.props.user ? this.props.user : {}

        let addressCopy = []
        if (user.address)
            addressCopy = [...user.address]

        addressCopy.push(address)
        user.address = addressCopy

        this.dispatchChange(user)
    }

    onAddressDeletePressed = (index) => {
        let user = this.props.user ? this.props.user : {}

        let addressCopy = [...user.address]
        addressCopy.splice(index, 1)
        user.address = addressCopy

        this.dispatchChange(user)
    }

    onAddressItemPressed = (index, address) => {
        this.props.navigation.navigate('addAddress', {
            address,
            onAddressSubmit: (address) => {
                let user = this.props.user
                //user.address.splice(index, 1, address)
                user.address[index] = address
                this.dispatchChange(user)
            }
        })
    }

    render() {
        let user = this.props.user ? this.props.user : {}
        return (
            <View>
                <View style={styles.field}>
                    <Text>Full Name</Text>
                    <TextInput
                        onBlur={() => { this.setState({ touchedName: true }) }}
                        onChangeText={(name) => {
                            user.name = name;
                            this.dispatchChange(user)
                        }}
                        value={user.name}
                        style={styles.text} />
                    {
                        ((this.props.displayValidations || this.state.touchedName)
                            && !user.name) ?
                            <Text style={styles.error}>Full Name is required</Text>
                            : null
                    }
                </View>

                <View style={styles.field}>
                    <Text>E-mail</Text>
                    <TextInput
                        onBlur={() => { this.setState({ touchedMail: true }) }}
                        onChangeText={(email) => {
                            user.email = email;
                            this.dispatchChange(user)
                        }}
                        value={user.email}
                        keyboardType="email-address" style={styles.text} />
                    {
                        ((this.props.displayValidations || this.state.touchedName)
                            && !validateMail(user.email)) ?
                            <Text style={styles.error}>Valid email is required</Text>
                            : null
                    }
                </View>

                <View style={styles.field}>
                    <Text>Phone number</Text>
                    <TextInput
                        onChangeText={(phone) => {
                            user.phone = phone;
                            this.dispatchChange(user)
                        }}
                        value={user.phone}
                        returnKeyType='done' keyboardType="phone-pad" style={styles.text} />
                </View>

                {<View style={[styles.field]}>
                    <Text>Gender</Text>
                    <View style={{ flexDirection: 'row', flex: 1 }}>

                        <TouchableOpacity
                            onPress={() => {
                                user.gender = 'male'
                                this.dispatchChange(user)
                            }}
                            style={[styles.genderOption, {
                                backgroundColor: user.gender == 'male' ? '#aaa' : 'white'
                            }]}>
                            <Text
                                style={{
                                    color: user.gender == 'male' ? 'white' : 'black'
                                }}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                user.gender = 'female'
                                this.dispatchChange(user)
                            }}
                            style={[styles.genderOption, {
                                backgroundColor: user.gender == 'female' ? '#aaa' : 'white'
                            }]}
                        >
                            <Text
                                style={{
                                    color: user.gender == 'female' ? 'white' : 'black'
                                }}
                            >Female</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                <View style={[{ marginTop: 32 }, styles.field]}>
                    <Text>Address</Text>
                    <FlatList
                        extraData={user}
                        data={user.address}
                        renderItem={(row) => {
                            return (<AddressItem
                                onDelete={(address) => this.onAddressDeletePressed(row.index)}
                                onPress={(address) => this.onAddressItemPressed(row.index, address)}
                                address={row.item} />)
                        }} />

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('addAddress', { onAddressSubmit: this.onAddressSubmit })}>
                        <Text style={{ alignSelf: 'center' }}>Add new address</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    field: {
        marginTop: 12
    },
    text: { width: '100%', height: 40, padding: 8, borderColor: '#ddd', borderWidth: 1, },
    genderOption: {
        borderRadius: 4,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: { color: 'red' }
})

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
    onValueChange: PropTypes.func
}