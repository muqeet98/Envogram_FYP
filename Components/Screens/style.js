const React = require("react-native");

const {StyleSheet} = React;
import * as Color from '../styles/Color'
import {Dimensions} from 'react-native';
export default {

    containerView : {
        flex: 1
    },
    mainContainer : {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        paddingTop: 10
    },
    loginScreenContainer : {
        flex: 1
    },
    logoText : {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center'
    },
    loginFormView : {
        flex: 1
    },
    cardItem : {
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingTop: 0,
        marginBottom: 5,
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.84,

        elevation: 2
    },
    quoteCard : {
        tag: {
            backgroundColor: '#2CCB1A',
            position: 'absolute',
            right: 0,
            top: 0,
            padding: 5,
            paddingHorizontal: 10,
            borderBottomLeftRadius: 5
        },
        tagText: {
            color: '#fff',
            fontSize: 14
        },
        cardBody: {
            width: '90%',
            alignSelf: 'flex-start',
            padding: 10
        },
        cardTitle: {
            fontWeight: 'bold',
            marginBottom: 5
        },
        desc: {
            marginBottom: 10,
            color: 'grey'
        },
        infoGrid: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    },
    gridText : {
        color: 'grey',
        fontSize: 15
    },
    loginFormTextInput : {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5
    },
    loginButton : {
        backgroundColor: Color.primaryColor,
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15
    },
    generalButton : {
        backgroundColor: Color.primaryColor,
        borderRadius: 5,
        height: 45,
        marginTop: 10
    },

    alreadyLoginText : {
        marginTop: 20,
        color: '#fff',
        width: '100%',
        textAlign: 'center'
    },

    outlineButton : {
        backgroundColor: 'transparent',
        borderColor: '#fff'
    },
    fbLoginButton : {
        height: 45,
        marginTop: 10,
        backgroundColor: 'transparent'
    },
    wrapper : {},
    itemIcon : {
        width: 35,
        color: 'grey'
    },
    itemsText : {
        marginLeft: 20,
        fontSize: 15,
        alignSelf: 'center',
        color: 'grey'
    },
    inputStyle : {
        color: Color.SimpleGrey,
        padding: 10,
        paddingLeft: 40,
        margin: 10,
        paddingRight: 30,
        height: 50,
        width: '95%',
        borderRadius: 100,
        backgroundColor: '#fff'
    },
    formLabel : {
        fontSize: 15,
        marginBottom: 8
    },
    formGroup : {
        marginBottom: 10
    },
    infoText : {
        fontSize: 12,
        color: Color.electromegnatic,
        marginBottom: 10
    },
    fab : {
        backgroundColor: Color.primaryColor
    },
    travelInfo : {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 40,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Color.primaryColor
    },
    travelText : {
        color: '#fff'
    },
    tourForm : {
        input: {
            marginLeft: 0,
            height: 40,
            borderRadius: 5
        },
        inputText: {
            fontSize: 13
        },
        textArea: {
            fontSize: 13,
            borderRadius: 5,
            paddingTop: 5,
            paddingLeft: 10,
            height: 80
        }
    },
    tourView : {
        formGroup: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            marginBottom: 5,
            marginTop: 8
        }
    },
    subtitle : {
        fontSize: 18,
        backgroundColor: Color.primaryColor,
        padding: 10,
        color: '#fff'
        // borderBottomWidth:3, borderBottomColor:Color.primaryColor,
    },
    quoteList : {
        listItem: {
            marginLeft: 0,
            backgroundColor: 'whitesmoke'
        },
        price: {
            color: Color.electromegnatic
        },
        desc: {
            marginTop: 10,
            color: Color.electromegnatic
        }
    },
    // Sahulat car
    main : {
        paddingLeft: 3
    },
    mapStyle : {
        width: Dimensions
            .get('window')
            .width,
        height: Dimensions
            .get('window')
            .height
    },
    buttonIcon : {
        color: '#fff',
        fontSize: 22,
        marginLeft: 5
    },
    spinnerWrapper : {
        position: 'absolute',
        top: 0,
        zIndex: 999,
        backgroundColor: '#3339',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinnerStyle : {
        fontSize: 41
    },
    searchIcons : {
        color: Color.electromegnatic,
        fontSize: 22
    },
    driverBackground : {
        paddingLeft: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor:Color.primaryColor
    },
    inactiveStar:{
        color:Color.SimpleGrey,
        paddingHorizontal:4,
        fontSize:36
    },
    activeStar:{
        color:Color.primaryColor,
    },
    startWrapper:{
        flexDirection:'row',
        justifyContent:'center',
    },
    textBox: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10
      }
};
