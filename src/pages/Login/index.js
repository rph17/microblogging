import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, StatusBar, Alert } from 'react-native';
import {geral, margin, inputs, variaveis, buttons, imgs, fonts} from '../../styles'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingButton, LoadingPage } from '../Componentes';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
    static navigationOptions = {headerShown: false};

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            senha: null,
            erroLogin: false,
            erroSenha: false,
            loadingButton: false,
            loading: true,
        }
    }

    async componentDidMount() {
        await AsyncStorage.getItem('USER').then((us) => {
            let user = JSON.parse(us);
            if (user != null && user.email != undefined) {
                this.props.navigation.navigate("Home");
            } else {
                this.setState({loading: false})
            }
        });
    }

    verificaLogin = async() => {
        this.setState({loadingButton: true});

        const {email, senha} = this.state;
        let erroLogin = false;
        let erroSenha = false;
        if (email == "" || email == null) {
            erroLogin = true
        }

        if (senha == "" || senha == null) {
            erroSenha = true
        }
        this.setState({erroLogin, erroSenha})

        if (!erroLogin && !erroSenha) {
            await AsyncStorage.getItem('DADOS_USER').then((users) => {
                let arrayUsers = JSON.parse(users);
                console.log("ERroemail", arrayUsers)
                if (arrayUsers == null || arrayUsers[email] == undefined) {
                    Alert.alert("Ops!", 
                                "E-mail não cadastrado. Faça o seu cadastro.", 
                                [{text:"OK", onPress: () => this.props.navigation.navigate("Cadastro")}]);
                    return false;
                } else {
                    console.log("USER", arrayUsers[email]);
                    if (arrayUsers[email].senha == senha) {
                        AsyncStorage.setItem('USER', JSON.stringify(arrayUsers[email])).then((ret) => {
                            this.props.navigation.navigate("Home");
                        }).catch((e) => {
                            Alert.alert("Ops!", 
                                    "Erro ao tentar realizar login");
                        })
                    } else {
                        Alert.alert("Ops!", 
                                    "Senha incorreta.");
                    }
                        
                }
            });
            this.setState({loadingButton: false});

        } else {
            erroLogin ? this.inputLogin.focus() : this.inputSenha.focus();
            this.setState({loadingButton: false});
        }


    }

    render () {
        const {email, senha, erroLogin, erroSenha, loadingButton, loading} = this.state;
        if (loading) {
            return <LoadingPage />;
        } else {
            return (<KeyboardAvoidingView 
                        style={[geral.container]} 
                        keyboardVerticalOffset={60}
                        behavior={Platform.select({
                            ios: 'padding',
                            android: null,
                        })}
                        enabled
                    >
                        <StatusBar barStyle="dark-content" />
                        <SafeAreaView style={geral.container}>
                            <View style={[margin.mt16n, margin.mx16n, geral.flex, geral.justifyContentCenter]}>
                                <View style={[geral.alignItemsCenter]}>
                                    <Image source={imgs.logo} style={[geral.logo]} resizeMode="contain" />
                                    <Text style={[fonts.tituloMedium(18, variaveis.k6, 20), margin.mt24n]}>
                                        Bem-vindo(a) ao Microblogging
                                    </Text>
                                </View>
                                <Text style={[geral.label, margin.mt24n]}>
                                    E-mail
                                </Text>
                                <View style={[inputs.inputForm, (erroLogin) ? inputs.inputErro : null]}>
                                    <TextInput  
                                        ref={(input) => { this.inputLogin = input; }}
                                        style={inputs.input}
                                        placeholderTextColor={variaveis.k3}
                                        placeholder="Preencha aqui o email"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        returnKeyLabel=""
                                        onChangeText={(email) => this.setState({email})}
                                        value={this.state.email}
                                        onSubmitEditing={() => this.inputSenha.focus()}
                                    />
                                    {erroLogin ? 
                                        <Image source={imgs.atencao} style={inputs.iconAtencao} />
                                    : 
                                    null}
                                </View>
                                <Text style={[geral.label, margin.mt16n
                                ]}>
                                    Senha
                                </Text>
                                <View style={[inputs.inputForm, (erroSenha) ? inputs.inputErro : null]}>
                                    <TextInput  
                                        ref={(input) => { this.inputSenha = input; }}
                                        style={inputs.input}
                                        placeholderTextColor={variaveis.k3}
                                        returnKeyType="done"
                                        autoCapitalize="none"
                                        returnKeyLabel=""
                                        placeholder="******"
                                        secureTextEntry={true}
                                        textContentType={'newPassword'}
                                        onChangeText={(senha) => this.setState({senha})}
                                        value={this.state.senha}
                                        onSubmitEditing={() => this.verificaLogin()}
                                    />
                                    {erroSenha ? 
                                        <Image source={imgs.atencao} style={inputs.iconAtencao} />
                                    : 
                                    null}
                                </View>

                                <View style={[margin.mt24n]}>
                                    <TouchableOpacity style={[buttons.button, buttons.buttonLineK6]} onPress={() => this.verificaLogin()} disabled={loadingButton}>
                                        {loadingButton ? 
                                            <LoadingButton color={variaveis.k6} />
                                        :
                                            <Text style={[buttons.textButtonLineK6]}>
                                                Entrar
                                            </Text>
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[buttons.button, buttons.buttonK6, margin.mt16n]} onPress={() => this.props.navigation.navigate("Cadastro")}>
                                        <Text style={[buttons.textButtonK6]}>
                                            Cadastrar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </SafeAreaView>
                    </KeyboardAvoidingView>)
        }
    }
}