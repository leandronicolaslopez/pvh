import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, FlatList, TouchableOpacity } from 'react-native';
import Input from './Input'
import PropTypes from 'prop-types';
import AddressItem from './addressItem';

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                user.address.splice(index, 1, address)
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
                    <Input
                        onChangeText={(name) => {
                            user.name = name;
                            this.dispatchChange(user)
                        }}
                        value={user.name}
                        style={styles.text} />
                </View>

                <View style={styles.field}>
                    <Text>E-mail</Text>
                    <Input
                        onChangeText={(email) => {
                            user.email = email;
                            this.dispatchChange(user)
                        }}
                        value={user.email}
                        keyboardType="email-address" style={styles.text} />
                </View>

                <View style={styles.field}>
                    <Text>Phone number</Text>
                    <Input
                        onChangeText={(phone) => {
                            user.phone = phone;
                            this.dispatchChange(user)
                        }}
                        value={user.phone}
                        returnKeyType='done' keyboardType="phone-pad" style={styles.text} />
                </View>

                {/*<View style={[styles.field]}>
                    <Text>Gender</Text>

                    <Picker
                        selectedValue={user.gender}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(gender, itemIndex) => {
                            user.gender = gender;
                            this.dispatchChange(user)
                        }}>
                        <Picker.Item label="-" value="" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>

                    </View>*/}
                <View style={[{ marginTop: 32 }, styles.field]}>
                    <Text>Address</Text>
                    <FlatList
                        extraData={user}
                        data={user.address}
                        //keyExtractor={(address, index) => { return address.street+""+address.number }}
                        renderItem={(row) => {
                            console.log("ROW is", row)
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
    text: { width: '100%', height: 40, padding: 8, borderColor: '#ddd', borderWidth: 1, }
})

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
    onValueChange: PropTypes.func
}