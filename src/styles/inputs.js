import {StyleSheet} from "react-native";
import variaveis from "./variaveis";
import fonts from "./fonts";

const inputs = StyleSheet.create({
iconAtencao: {
    marginRight:16,
    width:18, 
    height:18,
    tintColor: variaveis.a2
},
inputFormLine: {
    borderColor: variaveis.k3,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    marginTop:4,
},
inputForm: {
    backgroundColor: variaveis.k0,
    borderColor: variaveis.k2,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    // borderRadius: 4,
    marginTop:4,
},
input: {
    flex:1,
    ...fonts.tituloMedium(16, variaveis.k1, 20),
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 12,
    paddingBottom: 12,
},
inputErro: {
    borderColor: variaveis.a2,
},
});

export default inputs;