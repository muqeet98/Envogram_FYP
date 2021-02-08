import { Assets } from '@react-navigation/stack';
import React, { useState, useCallback, useEffect, Component } from 'react'
import { render } from 'react-dom';
import { AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

export default class Chat1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages:[]   }
      this.onSend = this.onSend.bind(this);
  }

  componentWillMount(){
    this.setState({
      messages: [
        {
          _id: 1,
          text: '',
          createdAt: '',
          user: {
            _id: 2,
            name: '',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
render(){
  return (
    <GiftedChat
      messages={this.state.messages}
      onSend={this.onSend}
      user={{
        _id: 1,
      }}
    />
  )
}}