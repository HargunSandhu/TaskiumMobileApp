import { StyleSheet } from "react-native";

const AuthenticationStyles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins',
    fontSize: 42,
    color: '#fff',
    fontWeight: '800',
    marginBottom: 60,
  },
  main: {
    backgroundColor: '#0b0b0f',
    height: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#16161D',
    borderColor: '#23232B',
    borderRadius: 8,
    borderWidth: 1,
    width: '90%',
    height: 50,
    color: '#fff',
    marginBottom: 20,
    fontSize: 20,
    paddingLeft: 14,
  },
  text: {
    color: '#9A9A9F',
    textAlign: 'center',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: '#9B7CF9',
    fontSize: 20,
  },
});

export default AuthenticationStyles