import {StyleSheet} from "react-native";
// import variaveis from "./variaveis";
import fonts from "./fonts";
import variaveis from "./variaveis";

const geral = StyleSheet.create({
container: {
    backgroundColor: variaveis.k0,
    flex:1
},
logo: {
    width: 200,
    height:150
},
label: {
    ...fonts.tituloMedium(16, variaveis.k6, 18)
},
lineK3: {
    borderColor: variaveis.k3, 
    borderWidth: 0.5
},
viewFooter: {
    position: "absolute",
    bottom:50,
    alignSelf:"flex-end",
    paddingRight:16
},
textCenter: {
    textAlign: "center"
},
textLeft: {
    textAlign: "left"
},
w100pc: {
    width: "100%"
},
flex: {
    flex:1,
},
flexRow: {
    flexDirection:"row"
},
flexRowReverse: {
    flexDirection: "row-reverse"
},
flexColumn: {
    flexDirection: "column"
},
alignItemsCenter: {
    alignItems: "center"
},
alignItemsStart: {
    alignItems: "flex-start"
},
alignItemsEnd: {
    alignItems: "flex-end"
},
justifyContentBetween: {
    justifyContent: "space-between"
},
justifyContentCenter: {
    justifyContent: "center"
},
justifyContentStart: {
    justifyContent: "flex-start"
},
justifyContentEnd: {
    justifyContent: "flex-end"
},
flexWrap: {
    flexWrap:"wrap"
}
});

export default geral;