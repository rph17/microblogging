import React, { Component } from 'react';
import { SafeAreaView, View, Text, FlatList, KeyboardAvoidingView, StatusBar, Alert } from 'react-native';
import {geral, margin, inputs, variaveis, buttons, imgs, fonts} from '../../styles'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { MenuStack, LoadingPage } from '../Componentes';
import { Icon } from 'react-native-elements';

export default class Login extends Component {
    static navigationOptions = MenuStack;

    constructor(props) {
        super(props);
        this.dadosFake = [
                            {
                                nome: "Chico",
                                data: "29/04/2020",
                                msg: "O dia das mães esta próximo, e a boticário tem muitas novidades.",
                                email: ""
                            },{
                                nome: "Alan",
                                data: "29/04/2020",
                                msg: "O dia das mães esta próximo, e a boticário tem muitas novidades.",
                                email: ""
                            },{
                                nome: "Rose",
                                data: "29/04/2020",
                                msg: "O dia das mães esta próximo, e a boticário tem muitas novidades.",
                                email: ""
                            },{
                                nome: "Josefá",
                                data: "29/04/2020",
                                msg: "O dia das mães esta próximo, e a boticário tem muitas novidades.",
                                email: ""
                            }
                        ];
        this.state = {
            loading: true,
            user: null,
            posts: this.dadosFake
        }

        
    }

    componentDidMount() {
        this.props.navigation.setParams({logout: true});
        this.props.navigation.setParams({ logoutButton: this.logout }); //initialize your function

        this.posts();
    }

    componentDidUpdate() {
        if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.atualiza) {
            this.props.navigation.state.params.atualiza =false;
            this.posts();
        }
    }
    

    posts = () => {
        this.setState({loading: true});
        AsyncStorage.getItem('USER').then((us) => {
            let user = JSON.parse(us);
            AsyncStorage.getItem('POSTS').then((arrayPosts) => {
                arrayPosts = JSON.parse(arrayPosts);
                // console.log("post", posts)
                
                let posts = null;
                if (arrayPosts != null) {
                    posts = [...arrayPosts, ...this.dadosFake];
                } else {
                    posts = this.dadosFake;
                }
                this.setState({user, posts, loading: false});
            })
            console.log("Login", user)
        });
    }

    excluir = (id_post, post) => {
        Alert.alert("Atenção!", 
                                "Deseja realmente excluir o post #" + (this.state.posts.length - id_post) + "?", 
                                [{text:"Sim", onPress: () => this.deletarPost(id_post, post)},
                                 {text:"Não", onPress: () => true}])
    }

    deletarPost = (id_post, post) => {
        this.setState({loading: true});
        AsyncStorage.getItem('POSTS').then((arrayPosts) => {
            arrayPosts = JSON.parse(arrayPosts);
            console.log("post", arrayPosts);
            arrayPosts.splice(id_post, 1);

            AsyncStorage.setItem('POSTS', JSON.stringify(arrayPosts)).then((res) => {
                console.log("Salvou")
                console.log(arrayPosts)
                this.posts();
            });

        })
    }

    logout = () => {
        AsyncStorage.removeItem('USER').then((re) => {
            this.props.navigation.navigate("Login");
        });
    }


    renderItem = ({item, index}) => {
        console.log("Response", item)
        const {user} = this.state;
        // console.log("USER", user)
        return (<View key={index+item.nome}>
                    <Text style={[fonts.tituloBold(14, variaveis.k6, 16)]}>
                        #{this.state.posts.length - index} {item.nome} - {item.data}
                    </Text>
                    <Text style={[fonts.tituloMedium(14, variaveis.k6, 16), margin.mt4n]}>
                        {item.msg}
                    </Text>
                    {user != null && user.email == item.email ? 
                    <View style={[geral.alignItemsCenter, geral.justifyContentBetween, geral.flexRow, margin.mt8n]}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Post", {id_post: index, item, tipo:"edit"})}>
                            <Icon name="edit" size={15} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.excluir(index, item)}>
                            <Icon name="remove-circle" size={15} color={variaveis.a2} />
                        </TouchableOpacity>
                    </View>
                        : null}

                </View>);
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
                console.log("ERroemail", arrayUsers[email])
                if (arrayUsers[email] != undefined) {
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
        const {loading} = this.state;
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
                        <StatusBar barStyle="light-content" />
                        <SafeAreaView style={geral.container}>
                            {/* <View style={[margin.mt16n, margin.mx16n, geral.flex]}>
                                
                            </View> */}
                            <FlatList 
                                keyExtractor={(item,index) => index+item.email}
                                data={this.state.posts}
                                renderItem={this.renderItem}
                                ItemSeparatorComponent={() => <View style={[geral.lineK3, margin.mt8n, margin.mb8n]} />}
                                style={[margin.mx16n, margin.mt16n]}
                            />
                            <View style={[geral.viewFooter]}>
                                <TouchableOpacity style={[buttons.buttonPost]} onPress={() => this.props.navigation.navigate("Post")}>
                                    <Icon name="email" size={20} color={variaveis.k0} />
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </KeyboardAvoidingView>);
        }
    }
}