import { Assets } from '@react-navigation/stack';
import React, { useState, useCallback, useEffect, Component } from 'react';
import { render } from 'react-dom';
import { AsyncStorage } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { base_url } from '../../API/types';
import axios from 'axios';
export default class Chats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			text: '',
			token: '',
			token_type: '',
			to: ''
		};
		this.onSend = this.onSend.bind(this);
	}

	// retriveData = async () => {};

	// renderBubble() {
	// 	// if (currentMessage.user._id == this.state.senderData.id) {
    //   if (messages == this.state.senderData.id) {
	// 		<Bubble {...props} wrapperStyle={{ right: { height: 200, backgroundColor: 'blue' } }} />;
	// 	} else {
	// 		<Bubble {...props} wrapperStyle={{ left: { backgroundColor: '#f0f0f0' } }} />;
	// 	}
	// }

	loadMessages() {
		console.log('Authorization', this.props.token_type + ' ' + this.props.token);
		axios({
			method: 'get',
			url: base_url+'/api/user/messages/' + this.state.to,
			headers: {
				Authorization: this.props.token_type + ' ' + this.props.token,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})
			.then((res) => {
				console.log('Hai', res.data);
				res.data.forEach((element) => {
					console.log(element.from_user.id);
					this.state.messages.push({
						_id: element.id,
						text: element.text,
						createdAt: element.created_at,
						user: {
							_id: element.from_user.id,
							 name: element.from_user.name
						}

            
					});
				});

				this.setState({
					messages: this.state.messages
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	sendMessage(text) {
		console.log(this.state.to);
		console.log(this.state.messages);
		fetch(base_url+'/api/user/messages', {
			method: 'post',
			headers: {
				Authorization: this.props.token_type + ' ' + this.props.token,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({
				to: this.state.to,
				text: text
			})
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('Hai', data);
			})
			.catch((error) => console.log(error));
	}

	componentDidMount() {
		this.setState({ to: this.props.to });
		this.retriveData();
		this.loadMessages();

		// this.setState({
		//   messages: [
		//     {
		//       _id: 1,
		//       text: this.props.text,
		//       createdAt: new Date(),
		//       user: {
		//         _id: 2,
		//         name: this.props.from,
		//       },
		//     },
		//   ],
		// });
	}

	onSend(messages = []) {
		this.setState((previousState) => {
			return {
				messages: GiftedChat.append(previousState.messages, messages)
			};
		});
		this.sendMessage(messages[0].text);
	}

	render() {
		return (
			<GiftedChat
				 inverted={false}
				// scrollToBottom={true}
				messages={this.state.messages}
				//alignTop={true}
				onSend={((text) => this.setState({ text: text }), this.onSend)}
				user={{
					_id: this.props.id
				}}
			/>
		);
	}
}
