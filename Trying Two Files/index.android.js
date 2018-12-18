/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  TextInput
} from 'react-native';
import Tts from 'react-native-tts';
import {styles} from './style';

export default class AwesomeProject extends Component {
	readText = function(text){
		Tts.stop();
		Tts.speak(text);
	}

  render() {
    return (
		<View style={styles.topView}>
			<Image style={styles.background} source={{uri:'https://d29vij1s2h2tll.cloudfront.net/~/media/images/taco-bell/products/default/23732_combos_quesarito_combo_300x300.jpg?w=300&h=300'}}>
				<View style={styles.container}>
					<View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
						<Text style={styles.welcome}>
						Welcome to
						</Text>
						<TouchableOpacity onPress={() => this.readText("TB Saga")}>
							<Text style={styles.welcome}>
							TB Saga
							</Text>
						</TouchableOpacity>
						<Text style={styles.welcome}>
						!
						</Text>
					</View>
					<Text style={styles.instructions}>
					  My challeewwwuuuupaaaahh
					</Text>
					<TouchableOpacity onPress={() => this.readText("My Chalupa")}>
						<Image style={styles.clickable} source={{uri:'https://d29vij1s2h2tll.cloudfront.net/~/media/images/taco-bell/products/default/22850_specialties_chalupasupreme_300x300.jpg?w=300&h=300'}}>
							<Text style={styles.instructions}>
								USAAAHHHDEUDs
							</Text>
						</Image>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.readText("beef n cheese")}>
						<Image style={styles.clickable} source={{uri:'https://d29vij1s2h2tll.cloudfront.net/~/media/images/taco-bell/products/default/22362_specialties_crunchwrapsupreme_300x300.jpg?w=300&h=300'}}>
							<Text style={styles.instructions}>
								CHERTOWEII
							</Text>
						</Image>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.readText("We don't serve big macs here")}>
						<Image style={styles.clickable} source={{uri:'http://az616578.vo.msecnd.net/files/2017/01/29/636212580226462285689332119_taco%20bell.jpg'}}>
							<Text style={styles.instructions}>
								CAN I HAVE A BIG MAC AND A PEPSI
							</Text>
						</Image>
					</TouchableOpacity>
					<Text style={styles.instructions}>
					  N LETTAEEUUSS
					</Text>
					<View style={{flexDirection: 'row', justifyContent: 'center'}}>
						<TextInput style={{height: 40, width: 150}} placeholder="Enter Text to Speak" onSubmitEditing={(event) => this.readText(event.nativeEvent.text)}/>
						<Button title="Stop Speaking" onPress={() => Tts.stop()} />
					</View>
				</View>
			</Image>
		</View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
