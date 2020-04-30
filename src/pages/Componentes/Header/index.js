import React, { Component } from "react";
import { StatusBar, View, Image, Text, TextInput,TouchableOpacity } from "react-native";
import { geral, variaveis, margin, imgs, fonts, colors, buttons } from "../../../styles";
import { Icon } from 'react-native-elements';

export function MenuStack ({navigation}) {
    console.log(navigation.state.params);
    let params = navigation.state.params;
    let goBack = false;
    let logout = false;
    if (params != undefined && params.goBack != undefined && params.goBack) {
        goBack = true;
    }
    if (params != undefined && params.logout != undefined && params.logout) {
        logout = true;
    }
    return {
        // title: "Cadastre-se ao Microblogging",
        headerTintColor: variaveis.k0,
        headerLeft:() => goBack ? 
                    <TouchableOpacity onPress={()=> navigation.goBack()} style={[margin.ml16n]}>
                      {/* <Image source={imgs.voltar} style={[geral.iconVoltar, margin.mt8n, margin.mb8n]} /> */}
                      <Icon name="keyboard-backspace" size={30}  color={variaveis.k0}/>
                   </TouchableOpacity>
                   :
                   null,
        headerRight:() => logout ? 
                   <TouchableOpacity onPress={navigation.getParam('logoutButton')} style={[margin.mr16n]}>
                        {/* <Image source={imgs.voltar} style={[geral.iconVoltar, margin.mt8n, margin.mb8n]} /> */}
                        <Icon name="exit-to-app" size={30}  color={variaveis.k0}/>
                    </TouchableOpacity>
                    :
                    null,
        headerStyle: {
          backgroundColor: variaveis.k6,
        //   color: variaveis.k0,
          borderBottomWidth: 0,
          elevation:0
    
        }
    }
  }