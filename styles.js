var React = require("react-native");
const COLORS = require("./src/constants/theme");
var {
  StyleSheet
} = React;
const style = StyleSheet.create({
  wapperScreen: {
    flex: 1,
    padding: 60,
    backgroundColor: 'white'
  },
  centerVH: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF',
    paddingVertical:8,
  },
  boxShadow: {
    shadowColor: '#00000082',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8
  },
  button: {
    backgroundColor: '#5B58AD',
    borderRadius: 50,
    padding: 15,
    minWidth: 120,
  },
  modalInner: {
    position: 'absolute',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 15,
    flexDirection: 'column',
    gap: 50,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.84,

    elevation: 8,
  },

});

export default style