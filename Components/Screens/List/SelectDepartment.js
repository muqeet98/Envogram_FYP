import React, { Component } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Image, StyleSheet, AsyncStorage, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { render } from 'react-dom';
import { userByDepartment } from '../../API/types';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { Actions } from 'react-native-router-flux';
export default class SelectDepartment extends Component {
	constructor() {
		super();
		this.state = {
			token: '',
			token_type: '',
			department: '',
			dataSource: [],
			id: ''
		};
	}
	UNSAFE_componentWillMount() {
		this.getToken();
	}
	getToken = async () => {
		this.setState({ token: await AsyncStorage.getItem('token') });
		this.setState({ token_type: await AsyncStorage.getItem('token_type') });
	};
	search() {
		axios({
			method: 'get',
			url: userByDepartment + this.props.schoolname + '/' + this.state.department,
			headers: {
				Authorization: this.state.token_type + ' ' + this.state.token,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})
			.then((res) => {
				let temp = JSON.stringify(res.data.data);
				if (temp.includes('id')) {
					this.setState({
						dataSource: res.data.data
					});
				} else {
					console.warn('API RESPONSE EMPTY');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	renderList = ({ item }) => {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1, backgroundColor: '#f5f4f9' }}>
					<View
						style={styles.postContainer}
						onTouchEnd={() => Actions.UserProfileScreen({ id:item.id })}
					>
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ left: 65, top: 25, fontSize: 20 }}>{item.name}</Text>
						</View>
						<View style={styles.profileContainer}>
							<Image source={{ uri: item.photo }} />
						</View>
					</View>
				</View>
			</SafeAreaView>
		);
	};

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#f5f4f9' }}>
				<Text>Hello {this.props.schoolname}</Text>

				<DropDownPicker
					placeholder="Select Department"
					placeholderStyle={{ fontSize: 14, color: 'grey' }}
					dropDownStyle={{ width: 330, marginLeft: 15 }}
					style={styles.loginFormTextInput}
					containerStyle={{ height: 60, marginTop: 50 }}
					itemStyle={{
						justifyContent: 'flex-start'
					}}
					items={[
						{ label: 'Select Department', value: '', selected: true },
						{
							label: 'Computer Science and Software Engineering',
							value: 'Computer Science and Software Engineering'
						},
						{ label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
						{ label: 'Electrical Engineering', value: 'Electrical Engineering' },
						{ label: 'Physics', value: 'Physics' },
						{ label: 'Shariah & Law', value: 'Shariah & Law' }
					]}
					onChangeItem={(item) => this.setState({ department: item.value })}
				/>
				<Button buttonStyle={[ styles.loginButton ]} title="Search" onPress={() => this.search()} />
				<FlatList
					data={this.state.dataSource}
					style={{ marginTop: 1, marginStart: 1 }}
					renderItem={this.renderList}
					numColumns={1}
					indicatorStyle={'black'}
					showsVerticalScrollIndicator={true}
				/>

				<StatusBar />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	loginFormTextInput: {
		height: 43,
		fontSize: 14,
		borderWidth: 1,
		borderColor: '#eaeaea',
		backgroundColor: '#fff',
		paddingLeft: 10,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		marginBottom: 0
	},
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
		height: 85,
		width: 350,
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
	loginButton: {
		backgroundColor: '#4c98cf',
		borderRadius: 6,
		height: 37,
		width: 81,
		marginTop: 20,
		marginLeft: 15,
		marginRight: 15,
		alignSelf: 'center'
	}
});
