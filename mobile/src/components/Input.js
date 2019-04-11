import React from "react";
import { TextInput } from "react-native";

export default class Input extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return <TextInput {...this.props}/>
    }
}