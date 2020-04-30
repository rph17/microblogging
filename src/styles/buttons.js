import {StyleSheet} from "react-native";
import fonts from "./fonts";
import variaveis from "./variaveis";

const buttons = StyleSheet.create({
    button: {
        justifyContent:"flex-start",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:24,
        paddingRight:24,
    },
    textButton: {
        ...fonts.tituloBold(variaveis.tamanho14, variaveis.k1, variaveis.tamanho14)
    },
    buttonPost: {
        borderRadius:200,
        backgroundColor: variaveis.k6,
        padding:20
    },
    buttonK6: {
        backgroundColor: variaveis.k6,
    },
    textButtonK6: {
        textAlign:"center",
        ...fonts.tituloBold(variaveis.tamanho16, variaveis.k0, variaveis.tamanho20)
    },
    buttonLineK6:{
        borderColor: variaveis.k6,
        borderWidth: 2
    },
    textButtonLineK6: {
        textAlign:"center",
        ...fonts.tituloBold(variaveis.tamanho16, variaveis.k6, variaveis.tamanho20)
    }
});

export default buttons;