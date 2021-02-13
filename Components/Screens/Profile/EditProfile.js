import React, { Component } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	Text,
	AsyncStorage,
	ImageBackground,
	Image,
	TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import { asin } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { batch } from 'react-redux';
import axios from 'axios';
import { base_url, urlUpdateProfile } from '../../API/types';
import { Actions } from 'react-native-gifted-chat';
import { Alert } from 'react-native';
export default class EditProfile extends Component {

	constructor() {
		super();
		this.state = {
			name: '',
			father_name: '',
			email: '',
			username: '',
			registration_no: '',
			school: '',
			department: '',
			batch: '',
			phone_number: '',
			education: '',
			work_history: '',
			token: '',
			token_type: '',

			image: null,

			base64string: null,

			PostArray: []
		};
  }
  
	UNSAFE_componentWillMount() {
		this.retriveData();
	}

	componentDidMount() {
		this.getPermissionAsync();
		console.log('hi');
	}
	retriveData = async () => {
		this.setState({
			name: await AsyncStorage.getItem('name'),
			email: await AsyncStorage.getItem('email'),
			username: await AsyncStorage.getItem('username'),
			father_name: await AsyncStorage.getItem('father_name'),
			department: await AsyncStorage.getItem('department'),
			registration_no: await AsyncStorage.getItem('regNo'),
			batch: await AsyncStorage.getItem('batch'),
			school: await AsyncStorage.getItem('school'),
			token: await AsyncStorage.getItem('token'),
			token_type: await AsyncStorage.getItem('token_type'),
			phone_number: await AsyncStorage.getItem('phone_number')

		});
	};

	storeData = async (data) => {
		try {
			AsyncStorage.setItem('name', data.user.name);
			AsyncStorage.setItem('id', JSON.stringify(data.user.id));
			AsyncStorage.setItem('father_name', data.user.father_name);
			AsyncStorage.setItem('regNo', data.user.registration_no);
			AsyncStorage.setItem('school', data.user.school);
			AsyncStorage.setItem('department', data.user.department);
			AsyncStorage.setItem('batch', data.user.betch);
			AsyncStorage.setItem('phone_number', data.user.phone_number);
			AsyncStorage.setItem('education', data.user.education);
			AsyncStorage.setItem('work_history', data.user.work_history);
			AsyncStorage.setItem('username', data.user.username);
			AsyncStorage.setItem('email', data.user.email);
			AsyncStorage.setItem('photo', data.user.photo);
			AsyncStorage.setItem('role', data.user.role);
			AsyncStorage.setItem('status', data.user.status);
			AsyncStorage.setItem('token', data.access_token);
			AsyncStorage.setItem('token_type', data.token_type);
		} catch (err) {
			ToastAndroid.show(err, ToastAndroid.SHORT);
		}
	};

	PostData2 = async () => {
    //   if(this.state.name==''){
	// 	  Alert.alert("Name cannot be empty");
	//   }else{
		this.state.PostArray.push({
			name: this.state.name,
			username: this.state.username,
			email: this.state.email,
			phone_number: this.state.phone_number,
			education: this.state.education,
			work_history: this.state.work_history,
		    photo: this.state.base64string
		});

		fetch(urlUpdateProfile, {
			method: 'post',
			headers: {
				Authorization: this.state.token_type + ' ' + this.state.token,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},

			body: JSON.stringify(this.state.PostArray[0])
		})
			.then((Response) => Response.json())
			.then((responseData) => {
				// alert('Updated Successfully!', responseData);
        console.log('Hai', responseData);
        // Actions.
			})
			.catch((error) => console.log(error));
	//   }
		
		// console.log("haii")
	};


	PostData = async () => {

		// console.log(this.state.base64string)

		this.state.PostArray.push({
			name: this.state.name,
			username: this.state.username,
			email: this.state.email,
			education: this.state.education,
			phone_number: this.state.phone_number,
			work_history: this.state.work_history,
	        photo: this.state.base64string
		});

		fetch( base_url +'/api/user/update-profile', {
			method: 'post',
			headers: {
				Authorization: this.state.token_type + ' ' + this.state.token,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},

			body: JSON.stringify(this.state.PostArray[0])
		})
			.then((Response) => Response.json())
			.then((responseData) => {
				alert('Updated Successfully!', responseData);
        console.log('Hai', responseData);
        // Actions.
			})
			.catch((error) => console.log(error));
		// console.log("haii")
	};

	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	};

	_pickImage = async () => {

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images, //All,Images,Videos
			allowsEditing: true,
			aspect: [ 4, 3 ],
			maxWidth: 500,
			maxHeight: 500,
			quality: 0.5,
			base64: true
		});
		// console.log('URI', result.base64);
		this.setState({ base64string: result.base64 });
		// console.log('ye ha' + this.state.base64string);

		if (!result.cancelled) {
			this.setState({ image: result.uri });
			// console.log('Image ka console' + this.state.Image);
		}
	
	};

	render() {
		let { image } = this.state;
		return (
			<View style={{ flex: 1, backgroundColor: '#f5f4f9' }}>
				<View
					style={{
						backgroundColor: '#737373',
						height: 470,
						borderBottomStartRadius: 20,
						borderBottomEndRadius: 20
					}}
				>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: '15%',
							borderRadius: 30
						}}
					>
						<ImageBackground
							source={require('../../../icons/userpic.png')}
							style={{
								width: 100,
								height: 100,
								alignItems: 'center',
								justifyContent: 'center',
								marginBottom: '10%',
								borderRadius: 50
							}}
						>
							<TouchableOpacity onPress={this._pickImage}>
								<View
									style={{
										// borderWidth: 1,
										alignItems: 'center',
										justifyContent: 'center',
										width: 150,
										height: 150,
										backgroundColor: 'rgba(0,0,0,0.0)',
										borderRadius: 80
									}}
								>
									{image && (
										<Image
											source={{ uri: image }}
											style={{
												borderWidth: 1,
												borderColor: 'rgba(0,0,0,0.2)',
												alignItems: 'center',
												justifyContent: 'center',
												width: 150,
												height: 150,
												backgroundColor: '#fff',
												borderRadius: 80
											}}
										/>
									)}
								</View>
							</TouchableOpacity>
						</ImageBackground>
					</View>
					{/* <View style={{ backgroundColor: "#000", width: 104, height: 104, borderRadius: 50, alignSelf: "center", marginTop: 30, borderWidth: 3, borderColor: "#fff" }} /> */}
					<View style={{ marginTop: 10 }}>
						<TextInput
							style={styles.loginFormTextInput}
							autoCapitalize="none"
                            onChangeText={(text)=>{
								this.setState({
									name:text
								})
							}}
							value={this.state.name}
							editable={true}
							placeholderTextColor="grey"
						/>
						<TextInput
							style={styles.loginFormTextInput}
							autoCapitalize="none"
							keyboardType="email-address"
							editable={false}
							placeholder={this.state.username}
							placeholderTextColor="grey"
						/>
						<TextInput
							style={styles.loginFormTextInput}
							autoCapitalize="none"
							keyboardType="email-address"
							editable={false}
							placeholder={this.state.email}
							placeholderTextColor="grey"
						/>
            
            <TextInput style={styles.loginFormTextInput}
              autoCapitalize="none"
              keyboardType='phone-pad'
			  maxLength={11}
			  value={this.state.phone_number}
              placeholder="Phone Number"
              placeholderTextColor="grey"
              onChangeText = {(text)=>this.setState({phone_number:text})}
              />

						<TextInput
							style={styles.loginFormTextInput}
							autoCapitalize="none"
							keyboardType="default"
							placeholder= "Education"
							value={this.state.education}
							placeholderTextColor="grey"
							
							onChangeText={(text) => this.setState({ education: text })}
						/>
						<TextInput
							style={styles.loginFormTextInput}
							autoCapitalize="none"
							keyboardType="default"
							placeholder="Work History"
							placeholderTextColor="grey"
							value={this.state.work_history}
							onChangeText={(text) => this.setState({ work_history: text })}
						/>
					</View>
				</View>
				<Button buttonStyle={[ styles.loginButton ]} title="Save" onPress={() => this.PostData()} />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	loginFormTextInput: {
		height: 43,
		fontSize: 14,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#eaeaea',
		backgroundColor: '#fafafa',
		paddingLeft: 10,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		marginBottom: 5
	},
	loginButton: {
		backgroundColor: '#737373',
		borderRadius: 5,
		height: 45,
		marginTop: 10,
		marginLeft: 15,
		marginRight: 15,
		width: 112,
		alignSelf: 'center'
	}
});
