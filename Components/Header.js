import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title
} from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class HomeHeader extends Component {

    render() {
        return (
            <Header  androidStatusBarColor={false} style={{
                backgroundColor: '#fff',
            }}>
                <Right style={{paddingLeft:350}} >
                    <Button>
                        <Icon
                            
                            name="md-menu"
                            style={{
                            color: '#333'
                        }}/>
                    </Button>
                </Right>
                <Body>
                    <Title style={style.bodyFont}></Title>
                </Body>
                <Right>
                    {/* <Button transparent onPress={()=>Actions.MakeRide()}>
                        <Icon style={{color:Colors.primaryColor,marginRight:5}} name="car" type="AntDesign"/>
                        <Text
                            style={{
                            color: Colors.primaryColor,
                            fontSize:16,
                        }}>Make a Ride</Text>
                    </Button> */}
                </Right>
            </Header>
        )
    }
}
const style = StyleSheet.create({
    primaryColor: {
        color: '#D61067'
    },
    bodyFont: {
        color: '#333'
    }
});
