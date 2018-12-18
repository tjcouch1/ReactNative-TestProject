import React, { Component } from 'react';
import StyleSheet from 'react-native';

export default styles;
export const styles = StyleSheet.create({
	topView: {
		backgroundColor: '#F5FCFF',
		justifyContent: 'center',
		alignItems: 'center'
	},
	background: {
		width: 400,
		height: 600,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	welcome: {
		fontSize: 28,
		textAlign: 'center',
		color: '#FFFFFF',
		margin: 10
	},
	instructions: {
		fontSize: 16,
		textAlign: 'center',
		color: '#FFFFFF',
		marginBottom: 5
	},
	clickable: {
		width: 200,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
