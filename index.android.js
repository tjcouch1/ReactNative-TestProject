/**
 * TJ Couch's sample application demonstrating a few of React Native's capabilities
 * 7/6/17
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  TextInput,
  StyleSheet,
  StatusBar
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Camera from 'react-native-camera';
import SketchView from 'react-native-sketch-view';
import Tts from 'react-native-tts';
import Realm from 'realm';

function readText(text){
	Tts.stop();
	Tts.speak(text);
}

class ClickableImage extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => readText(this.props.speak)}>
        <Image style={styles.clickable} source={{uri:this.props.uri}}>
          <Text style={styles.instructions}>
            {this.props.text}
          </Text>
        </Image>
      </TouchableOpacity>
    );
  }
}

class NavigationButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.navFunction}>
        <Image style={styles.clickableSmall} source={{uri:this.props.uri}}>
          <Text style={styles.instructions}>
            {this.props.text}
          </Text>
        </Image>
      </TouchableOpacity>
    );
  }
}

class HomePage extends Component {

  static navigationOptions = {
    title: "TJ's Project",
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerStyle: {
      backgroundColor: '#373c3e'
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
		<View style={styles.topView}>
			<Image style={styles.background} source={{uri:'https://blog.jscrambler.com/content/images/2016/12/react_native_banner-min.png'}}>
				<View style={styles.container}>
					<View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
						<Text style={styles.welcome}>
						Welcome to TJ{"'"}s{'\n'}React Native App!
						</Text>
					</View>
					<Text style={styles.instructions}>
					  Click a page to get started!
					</Text>
					<NavigationButton
            navFunction = {() => navigate('Cam')}
            uri = 'http://cdn.digital-photo-secrets.com/images/mobile-phone-camera-close.jpg'
            text = 'Camera'
          />
          <NavigationButton
            navFunction = {() => navigate('Tts')}
            uri = 'http://www.techtricksforum.org/wp-content/uploads/2016/02/text-to-audi.jpg'
            text = 'Text to Speech'
            goto = 'Tts'
          />
          <NavigationButton
            navFunction = {() => navigate('Draw')}
            uri = 'https://s-media-cache-ak0.pinimg.com/736x/57/3c/ce/573cce70f2eaa08c67f3eb6712168533--sketches-disney-pencil-disney-drawing-ideas-pencil.jpg'
            text = 'Drawing'
          />
          <NavigationButton
            navFunction = {() => navigate('Data')}
            uri = 'http://web.eecs.umich.edu/~dkoutra/courses/W16_484/database.jpg'
            text = 'Databases'
          />
				</View>
			</Image>
		</View>
    );
  }
}

class CameraPage extends Component {

  static navigationOptions = {
    title: 'Camera Record',
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerStyle: {
      backgroundColor: '#373c3e'
    }
  };

  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false
    };
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    }
  }

  startRecording = () => {
    if (this.camera) {
      this.camera.capture({mode: Camera.constants.CaptureMode.video})
          .then((data) => console.log(data))
          .catch(err => console.error(err));
      this.setState({
        isRecording: true
      });
    }
  }

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
    }
  }

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('./assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('./assets/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('./assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('./assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('./assets/ic_flash_off_white.png');
    }

    return icon;
  }

  render() {
    return (
      <View style={camStyles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={camStyles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[camStyles.overlay, camStyles.topOverlay]}>
          <TouchableOpacity
            style={camStyles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={camStyles.flashButton}
            onPress={this.switchFlash}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={[camStyles.overlay, camStyles.bottomOverlay]}>
          {
            !this.state.isRecording
            &&
            <TouchableOpacity
                style={camStyles.captureButton}
                onPress={this.takePicture}
            >
              <Image
                  source={require('./assets/ic_photo_camera_36pt.png')}
              />
            </TouchableOpacity>
            ||
            null
          }
          <View style={camStyles.buttonsSpace} />
          {
              !this.state.isRecording
              &&
              <TouchableOpacity
                  style={camStyles.captureButton}
                  onPress={this.startRecording}
              >
                <Image
                    source={require('./assets/ic_videocam_36pt.png')}
                />
              </TouchableOpacity>
              ||
              <TouchableOpacity
                  style={camStyles.captureButton}
                  onPress={this.stopRecording}
              >
                <Image
                    source={require('./assets/ic_stop_36pt.png')}
                />
              </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

class TtsPage extends Component {

  static navigationOptions = {
    title: 'Text to Speech',
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerStyle: {
      backgroundColor: '#373c3e'
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
		<View style={styles.topView}>
			<Image style={styles.background} source={{uri:'https://d29vij1s2h2tll.cloudfront.net/~/media/images/taco-bell/products/default/23732_combos_quesarito_combo_300x300.jpg?w=300&h=300'}}>
				<View style={styles.container}>
					<View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
						<Text style={styles.welcome}>
						Welcome to{' '}
						</Text>
						<TouchableOpacity onPress={() => readText("TB Saga")}>
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
					<ClickableImage
            speak = 'My Chalupa'
            uri = 'https://d29vij1s2h2tll.cloudfront.net/~/media/images/taco-bell/products/default/22850_specialties_chalupasupreme_300x300.jpg?w=300&h=300'
            text = 'USAAAHHHDEUD'
          />
          <ClickableImage
            speak = 'beef n cheese'
            uri = 'https://d29vij1s2h2tll.cloudfront.net/~/media/images/taco-bell/products/default/22362_specialties_crunchwrapsupreme_300x300.jpg?w=300&h=300'
            text = 'CHERTOWEII'
          />
					<Text style={styles.instructions}>
					  N LETTAEEUUSS
					</Text>
          <ClickableImage
            speak = "We don't serve big macs here"
            uri = 'http://az616578.vo.msecnd.net/files/2017/01/29/636212580226462285689332119_taco%20bell.jpg'
            text = 'CAN I HAVE A BIG MAC AND A PEPSI'
          />
					<View style={{flexDirection: 'row', justifyContent: 'center'}}>
						<TextInput style={{height: 40, width: 150}} placeholder="Enter Text to Speak" onSubmitEditing={(event) => readText(event.nativeEvent.text)}/>
						<Button title="Stop Speaking" onPress={() => Tts.stop()} />
					</View>
				</View>
			</Image>
		</View>
    );
  }
}

/*for drawing*/
const sketchViewConstants = SketchView.constants;

const tools = {};
tools[sketchViewConstants.toolType.pen.id] = {
    id: sketchViewConstants.toolType.pen.id,
    name: sketchViewConstants.toolType.pen.name,
    nextId: sketchViewConstants.toolType.eraser.id
};
tools[sketchViewConstants.toolType.eraser.id] = {
    id: sketchViewConstants.toolType.eraser.id,
    name: sketchViewConstants.toolType.eraser.name,
    nextId: sketchViewConstants.toolType.pen.id
};

class DrawingPage extends Component {

  static navigationOptions = {
    title: 'Drawing',
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerStyle: {
      backgroundColor: '#373c3e'
    }
  };

  constructor(props) {
        super(props);
        this.state = {
            toolSelected: sketchViewConstants.toolType.pen.id
        };
    }

    isEraserToolSelected() {
        return this.state.toolSelected === sketchViewConstants.toolType.eraser.id;
    }

    toolChangeClick() {
        this.setState({toolSelected: tools[this.state.toolSelected].nextId});
    }

    getToolName() {
        return tools[this.state.toolSelected].name;
    }

    onSketchSave(saveEvent) {
        this.props.onSave && this.props.onSave(saveEvent);
    }

    render() {
        return (
          <Image style={[styles.background, {backgroundColor: '#3d4346', flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', width: null, height: null}]} resizeMode='contain' source={require('./assets/map.png')}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <SketchView style={{flex: 1, backgroundColor: 'transparent'}} ref="sketchRef"
                selectedTool={this.state.toolSelected}
                onSaveSketch={this.onSketchSave.bind(this)}
                localSourceImagePath={this.props.localSourceImagePath}
              />

              <View style={{ flexDirection: 'row', backgroundColor: '#373c3e'}}>
                <TouchableHighlight color={"#282c2e"} style={{ flex: 1, alignItems: 'center', paddingVertical:20 }} onPress={() => { this.refs.sketchRef.clearSketch() }}>
                    <Text style={{color:'#FFFFFF',fontWeight:'600'}}>CLEAR</Text>
                </TouchableHighlight>
                <TouchableHighlight color={"#282c2e"} style={{ flex: 1, alignItems: 'center', paddingVertical:20, borderLeftWidth:1, borderRightWidth:1, borderColor:'#292e30' }} onPress={() => { this.refs.sketchRef.saveSketch() }}>
                    <Text style={{color:'#FFFFFF',fontWeight:'600'}}>SAVE</Text>
                </TouchableHighlight>
                <TouchableHighlight color={"#282c2e"} style={{ flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:this.isEraserToolSelected() ? "#232829" : "rgba(0,0,0,0)" }} onPress={this.toolChangeClick.bind(this)}>
                    <Text style={{color:'#FFFFFF',fontWeight:'600'}}>ERASER</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Image>
        );
    }
}

class DatabasePage extends Component {

  static navigationOptions = {
    title: 'Database',
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerStyle: {
      backgroundColor: '#373c3e'
    }
  };

  constructor(props) {
    super(props);
    let realm = new Realm({
      schema: [{name: 'Dog', properties: {name: 'string'}}]
    });
    this.state = {
      countDogs: realm.objects('Dog').length,
      started: false
    };
  }

  updateDogCount(realm)
  {
    this.setState({
      countDogs: realm.objects('Dog').length,
      started: true
    });
  }

  addObject(realm, realmName)
  {
    realm.write(() => {
      realm.create(realmName, {name: 'Doggo'});
    });
    this.updateDogCount(realm);
  }

  clearRealm(realm)
  {
    realm.write(() => {realm.deleteAll()});
    this.updateDogCount(realm);
  }

  render() {
    const { navigate } = this.props.navigation;

    let realm = new Realm({
      schema: [{name: 'Dog', properties: {name: 'string'}}]
    });

    /*realm.write(() => {
      realm.create('Dog', {name: 'Rex'});
    });*/

    return (
  		<View style={styles.topView}>
  			<Image style={styles.background} source={{uri:'https://d29vij1s2h2tll.cloudfront.net/~/media/images/taco-bell/products/default/23732_combos_quesarito_combo_300x300.jpg?w=300&h=300'}}>
  				<View style={styles.container}>
  						<Text style={styles.welcome}>
  						  Welcome to Realm Database!
              </Text>
              <Text style={styles.instructions}>
                Number of dogs you own: {this.state.countDogs}
              </Text>
              <Text>Bark!</Text>
              <Button title='Buy a Dog' onPress={() => this.addObject(realm, 'Dog')}/>
              <Button title='Force dogs into the pound' onPress={() => this.clearRealm(realm)}/>
  				</View>
  			</Image>
  		</View>
    );
  }
}

const camStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});

const styles = StyleSheet.create({
	topView: {
		backgroundColor: '#3d4346',
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
		margin: 10,
    marginLeft: 0,
    marginRight: 0
	},
	instructions: {
		fontSize: 16,
		textAlign: 'center',
		color: '#FFFFFF',
		marginBottom: 5
	},
	clickable: {
		width: 200,
		height: 130,
		justifyContent: 'center',
		alignItems: 'center'
	},
	clickableSmall: {
		width: 200,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
  camContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

const AwesomeProject = StackNavigator({
  Home: { screen: HomePage },
  Cam: { screen: CameraPage },
  Tts: { screen: TtsPage },
  Draw: { screen: DrawingPage },
  Data: { screen: DatabasePage }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
