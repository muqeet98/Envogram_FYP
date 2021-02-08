import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ToastAndroid, AsyncStorage } from 'react-native';
import { Textarea } from 'native-base';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import { urlPost } from '../API/types';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
var date = new Date();
//import { FadeInFromBottomAndroidSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs'
export default class UserRequests extends Component {
	openModal = () => {
		this.setState({
			isModalVisible: true
		});
	};
	toggleModal = () => {
		this.setState({
			isModalVisible: !this.state.isModalVisible
		});
	};

	closeModal = () => {
		this.setState({
			isModalVisible: false
		});
	};

	render() {
		return (
			<View>
				<View style={{ marginTop: 30, justifyContent: 'center' }}>
					<TouchableOpacity onPress={() => this.openModal()}>
						<Text style={{ textAlign: 'center' }}>Click to Add new Post</Text>
					</TouchableOpacity>
					<Modal
						animationIn="slideInUp"
						animationOut="slideOutDown"
						onSwipeComplete={() => this.closeModal()}
						swipeDirection="right"
						isVisible={this.state.isModalVisible}
						style={{ backgroundColor: '#f5f4f9', maxHeight: 400, marginTop: 50, borderRadius: 20 }}
					>
						<View style={styles.postContainer}>
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ left: 65, top: 25 }}>{this.state.name} </Text>
								<Text style={{ left: 110, top: 25, color: 'grey' }}> </Text>
							</View>
							<View style={styles.profileContainer} />
							<View style={styles.innerContainer}>
								<Textarea
									placeholder={'Write Post'}
									style={{
										paddingLeft: 10,
										borderRadius: 20,
										height: 100
									}}
									rowSpan={5}
									onChangeText={(text) => this.setState({ postText: text })}
								/>
							</View>
						</View>

						<DropDownPicker
							selectedLabelStyle={{ color: '#00000' }}
							arrowColor={'#000000'}
							labelStyle={{ color: '#fff' }}
							placeholder="Visibility"
							placeholderStyle={{ fontSize: 14, color: 'grey', alignSelf: 'center' }}
							dropDownStyle={{ width: 120, marginLeft: 15, backgroundColor: '#258CD8' }}
							style={[ styles.loginFormTextInput, { borderRadius: 10 } ]}
							containerStyle={{ height: 48 }}
							itemStyle={{
								justifyContent: 'center'
							}}
							items={[
								{ label: 'Public', value: 'Public', selected: true },
								{ label: 'School', value: 'School' },
								{ label: 'Department', value: 'Department' }
							]}
							onChangeItem={(item) => this.setState({ Visibility: item.value })}
						/>

						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								position: 'relative',
								top: 58,
								borderRadius: 20
							}}
						>
							<View style={{ flexDirection: 'row' }}>
								<TouchableOpacity
									style={{
										backgroundColor: '#4c98cf',
										width: '50%',
										borderWidth: 1,
										borderRadius: 6,
										borderColor: '#fff'
									}}
									onPress={() => this.post()}
								>
									<Text
										style={{
											color: 'white',
											textAlign: 'center',
											padding: 10
										}}
									>
										Post
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										backgroundColor: '#4c98cf',
										width: '50%',
										borderWidth: 1,
										borderRadius: 6,
										borderColor: '#fff'
									}}
									onPress={() => this.closeModal()}
								>
									<Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>Cancel</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	profileContainer: {
		width: 39,
		height: 39,
		borderRadius: 50,
		backgroundColor: '#000',
		marginLeft: 20,
		top: 20,
		position: 'absolute'
	},
	postContainer: {
		alignSelf: 'center',
		flexDirection: 'column',
		backgroundColor: '#fff',
		height: 175,
		width: 290,
		borderRadius: 20,
		marginTop: 20
	},
	innerContainer: {
		justifyContent: 'center',
		alignSelf: 'center',
		flexDirection: 'column',
		backgroundColor: '#f5f4f9',
		position: 'absolute',
		height: 100,
		width: 250,
		borderRadius: 20,
		bottom: 10
	},
	loginFormTextInput: {
		height: 43,
		fontSize: 14,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#eaeaea',
		backgroundColor: '#4c98cf',
		paddingLeft: 10,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		width: 120
	}
});
