var React = require("react-native");
const COLORS = require("./constants/theme");
var { StyleSheet } = React;
module.exports = StyleSheet.create({
  centerVH:{flex: 1, justifyContent: 'center', alignItems: 'center'},
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF',
    padding: 4,
    width: '100%',
  },
  boxShadow: {
     shadowColor: '#00000082',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 8
  },
  button:{
    backgroundColor: '#5B58AD',
    borderRadius: 50,
    padding: 15,
    minWidth: 120,
  },

});
