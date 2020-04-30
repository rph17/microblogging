import React, { Component } from 'react';
import { SafeAreaView, View, Text, FlatList, KeyboardAvoidingView, StatusBar, Alert } from 'react-native';
import {geral, margin, inputs, variaveis, buttons, imgs, fonts} from '../../styles'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';

export default class Login extends Component {
    static navigationOptions = {headerShown: false};

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            post: null,
            id_post: null,
            tipo: null
        }
    }

    componentDidMount() {
    //  AsyncStorage.removeItem('POSTS')
        this.props.navigation.setParams({logout: true});
        AsyncStorage.getItem('USER').then((us) => {
            let user = JSON.parse(us);
            this.setState({user});
            console.log("Login", user)
        });
        console.log("post", this.props.navigation.state.params)

        if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.id_post != undefined) {
            const {item, id_post, tipo} = this.props.navigation.state.params;
            this.setState({post: item.msg, id_post, tipo})
        }
    }

    post = async() => {
        const {user, post, id_post} = this.state;
        let data = new Date();
        // let posts = []
        let postMsg = {
            nome: user.nome,
            data: data.getDate() + "/" + (data.getMonth()+1) + "/" + data.getFullYear(),
            msg: post,
            email: user.email
        };

        await AsyncStorage.getItem('POSTS').then((posts) => {
            console.log(posts)
            let arrayPosts = JSON.parse(posts);
            let key = arrayPosts != null ? Object.keys(arrayPosts).length : 0;
            let postArrays = id_post != null ? null : [key];
            if (id_post != null) {
                arrayPosts[id_post].msg = postMsg.msg;
                console.log("Edit", arrayPosts, id_post);
                postArrays = arrayPosts;
            } else {
                console.log("Add")
                postArrays = [];
                postArrays.push(postMsg);
                if (arrayPosts != null) {
                    postArrays = [...arrayPosts, ...postArrays];
                }
                postArrays.reverse();
            }

            AsyncStorage.setItem('POSTS', JSON.stringify(postArrays)).then((res) => {
                console.log("Salvou")
                console.log(postArrays)
                this.props.navigation.navigate("Home", {atualiza:true});
            });
        });
    }


    render () {
        const {tipo} = this.state;
        return (<KeyboardAvoidingView 
            style={[geral.container]} 
            keyboardVerticalOffset={60}
            behavior={Platform.select({
                ios: 'padding',
                android: null,
            })}
            enabled
        >
            <StatusBar barStyle="light-content" />
                <SafeAreaView style={geral.container}>
                    <View style={[margin.mt16n, margin.mx16n, geral.flex]}>
                        <View style={[geral.justifyContentBetween, geral.flexRow, geral.alignItemsCenter]}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                                <Icon name="close" size={20} color={variaveis.k5} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[buttons.button, buttons.buttonLineK6]} onPress={() => this.post()}>
                                <Text style={[buttons.textButtonLineK6]}>
                                    {tipo == null ? "Postar" : "Editar"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput 
                            value={this.state.post}
                            onChangeText={(post) => this.setState({post})}
                            placeholder="O que está acontecendo?"
                            placeholderTextColor={variaveis.k2}
                            maxLength={280}
                            style={[margin.mt24n]}
                            autoFocus={true}
                            multiline={true}
                        />
                    </View>
                    
                </SafeAreaView>
            </KeyboardAvoidingView>)
    }
}