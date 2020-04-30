const fonts = {
    tituloMedium: function (tamFont, cor, line) {
        line = line == undefined ? tamFont : line;
        let styles = {
        fontSize: tamFont,
        color: cor,
        lineHeight: line,
        // fontFamily: "Arial",
        margin:0,
        padding:0
        };
        return styles;
    },
    tituloBold: function (tamFont, cor, line) {
        line = line == undefined ? tamFont : line;
        let styles = {
        fontSize: tamFont,
        color: cor,
        lineHeight: line,
        // fontFamily: "Arial",
        fontWeight:"bold",
        margin:0,
        padding:0,
        };
        return styles;
    },
}

export default fonts;