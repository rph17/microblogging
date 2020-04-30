import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, StatusBar, Alert, ScrollView } from 'react-native';
import {geral, margin, inputs, variaveis, buttons, imgs, fonts} from '../../styles'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { MenuStack, LoadingButton } from '../Componentes';

export default class Login extends Component {
    static navigationOptions = MenuStack;

    constructor(props) {
        super(props);
        this.state = {
            nome: null,
            email: null,
            senha: null,
            senhaRepeat: null,
            erroNome: false,
            erroLogin: false,
            erroSenha: false,
            erroSenhaRepeat: false,
            loadingButton: false,
        }
        this.props.navigation.setParams({goBack: true});
    }

    componentDidMount() {
        // AsyncStorage.removeItem('DADOS_USER')
    }

    cadastrar = async() => {
        this.setState({loadingButton: true});
        const {nome, email, senha, senhaRepeat} = this.state;
        let erroLogin = false,
            erroSenha = false,
            erroSenhaRepeat = false,
            erroNome = false;
        if (email == "" || email == null) {
            erroLogin = true
        }
        if (senha == "" || senha == null) {
            erroSenha = true
        }
        if (nome == "" || nome == null) {
            erroNome = true
        }
        if (senha != senhaRepeat || senha == "" || senha == null || senhaRepeat == "" || senhaRepeat == null) {
            erroSenha = true
            erroSenhaRepeat = true
        }
        this.setState({erroLogin, erroSenha, erroNome, erroSenhaRepeat});

        if (!erroLogin && !erroSenha && !erroNome && !erroSenhaRepeat) {
            await AsyncStorage.getItem('DADOS_USER').then((users) => {
                let arrayUsers = JSON.parse(users);
                let dados = {};
                console.log("ERroemail", arrayUsers)
                if (arrayUsers != null && arrayUsers[email] != undefined) {
                    Alert.alert("Ops!", 
                                "E-mail já cadastrado. Faça o login.", 
                                [{text:"OK", onPress: () => this.props.navigation.navigate("Login")}]);
                    return false;
                }

                dados[email] = {
                    nome: nome,
                    email: email,
                    senha: senha 
                };
                arrayUsers = {...arrayUsers, ...dados};

                console.log(arrayUsers);
                
                AsyncStorage.setItem('DADOS_USER', JSON.stringify(arrayUsers)).then((res) => {
                    console.log("RetornoCad", res);
                    Alert.alert("Sucesso!", 
                                "Seu cadastro foi efetuado. Faça o login.", 
                                [{text:"Logar", onPress: () => this.props.navigation.navigate("Login")}]);
                });
            });
            this.setState({loadingButton: false});
        } else {
            this.setState({loadingButton: false});
            return false;            
        }


    }

    render () {
        const {email, senha, erroLogin, erroSenha, erroNome, erroSenhaRepeat, loadingButton} = this.state;
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
                <ScrollView 
                    contentInsetAdjustmentBehavior="automatic"
                >
                    <View style={[margin.mt16n, margin.mx16n, geral.flex]}>
                        <Text style={[geral.label]}>
                            Nome
                        </Text>
                        <View style={[inputs.inputForm, (erroNome) ? inputs.inputErro : null]}>
                            <TextInput  
                                ref={(input) => { this.inputNome = input; }}
                                autoFocus={true}
                                style={inputs.input}
                                placeholderTextColor={variaveis.k3}
                                placeholder="Preencha o nome"
                                returnKeyType="next"
                                // autoCapitalize="none"
                                keyboardType="email-address"
                                onChangeText={(nome) => this.setState({nome})}
                                value={this.state.nome}
                                onSubmitEditing={() => this.inputEmail.focus()}
                            />
                            {erroNome ? 
                                <Image source={imgs.atencao} style={inputs.iconAtencao} />
                            : 
                            null}
                        </View>
                        <Text style={[geral.label, margin.mt24n]}>
                            E-mail
                        </Text>
                        <View style={[inputs.inputForm, (erroLogin) ? inputs.inputErro : null]}>
                            <TextInput  
                                ref={(input) => { this.inputEmail = input; }}
                                style={inputs.input}
                                placeholderTextColor={variaveis.k3}
                                placeholder="Preencha o email"
                                returnKeyType="next"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email}
                                onSubmitEditing={() => this.inputSenha.focus()}
                            />
                            {erroLogin ? 
                                <Image source={imgs.atencao} style={inputs.iconAtencao} />
                            : 
                            null}
                        </View>
                        <Text style={[geral.label, margin.mt16n]}>
                            Senha
                        </Text>
                        <View style={[inputs.inputForm, (erroSenha) ? inputs.inputErro : null]}>
                            <TextInput  
                                ref={(input) => { this.inputSenha = input; }}
                                style={inputs.input}
                                placeholderTextColor={variaveis.k3}
                                placeholder="******"
                                secureTextEntry={true}
                                textContentType={'newPassword'}
                                returnKeyType="next"
                                autoCapitalize="none"
                                returnKeyLabel=""
                                onChangeText={(senha) => this.setState({senha})}
                                value={this.state.senha}
                                onSubmitEditing={() => this.inputSenhaRepeat.focus()}
                            />
                            {erroSenha ? 
                                <Image source={imgs.atencao} style={inputs.iconAtencao} />
                            : 
                            null}
                        </View>

                        <Text style={[geral.label, margin.mt16n]}>
                            Confirmar Senha
                        </Text>
                        <View style={[inputs.inputForm, (erroSenhaRepeat) ? inputs.inputErro : null]}>
                            <TextInput  
                                ref={(input) => { this.inputSenhaRepeat = input; }}
                                style={inputs.input}
                                placeholderTextColor={variaveis.k3}
                                placeholder="******"
                                secureTextEntry={true}
                                textContentType={'newPassword'}
                                returnKeyType="done"
                                autoCapitalize="none"
                                returnKeyLabel=""
                                onChangeText={(senhaRepeat) => this.setState({senhaRepeat})}
                                value={this.state.senhaRepeat}
                                onSubmitEditing={() => this.cadastrar()}
                            />
                            {erroSenhaRepeat ? 
                                <Image source={imgs.atencao} style={inputs.iconAtencao} />
                            : 
                            null}
                        </View>

                        <View style={[margin.mt24n]}>
                            <TouchableOpacity style={[buttons.button, buttons.buttonK6]} onPress={() => this.cadastrar()} disabled={loadingButton}>
                                {loadingButton ? 
                                    <LoadingButton />
                                :
                                    <Text style={[buttons.textButtonK6]}>
                                        Cadastrar
                                    </Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>)
    }
}