import React, { Component } from 'react';
import { ActivityIndicator, View } from "react-native";
import {variaveis, geral} from "../../../styles";

export class LoadingButton extends Component {
    render() {
        let colors = this.props.color == undefined ? variaveis.k0 : this.props.color;
        return (<ActivityIndicator size="small" color={colors} />);
    }
}

export class LoadingPage extends Component {
    render() {
        let colors = this.props.color == undefined ? variaveis.k6 : this.props.color;
        return (<View style={[geral.flex, geral.justifyContentCenter, geral.alignItemsCenter]}>
                    <ActivityIndicator size="large" color={colors} />
                </View>);
    }
}