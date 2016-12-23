import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import ViewContainer from '../components/ViewContainer';

const styles = StyleSheet.create({
  map: { flex: 5 },
  coordinates: { flex: 1 }
});

const TOP_BOUNDS = 28.606;
const RIGHT_BOUNDS = -81.197;
const LEFT_BOUNDS = -81.205;
const BOTTOM_BOUNDS = 28.594;
const MIN_ZOOM = 0.025;

class Map extends Component {

  static isInBounds(region) {
    if (region.latitudeDelta >= MIN_ZOOM) {
      return false;
    } else if (region.longitude >= RIGHT_BOUNDS) {
      return false;
    } else if (region.latitude >= TOP_BOUNDS) {
      return false;
    } else if (region.longitude <= LEFT_BOUNDS) {
      return false;
    } else if (region.latitude <= BOTTOM_BOUNDS) {
      return false;
    }
    return true;
  }

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 28.601660,
        longitude: -81.200788,
        latitudeDelta: 0.014,
        longitudeDelta: 0.014
      }
    };

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });

    if (!Map.isInBounds(region)) {
      this.setState({
        region: this.props.map.initialRegion
      });
    }
  }

  render() {
    return (
      <ViewContainer>
        <StatusBar
          hidden
        />
        <MapView
          region={this.state.region}
          style={styles.map}
          provider="google"
          rotateEnabled={false}
          pitchEnabled={false}
          showsCompass={false}
          loadingEnabled
          onRegionChange={this.onRegionChange}
        />
        {/* <Text style={styles.coordinates}>
          Latitude: {this.state.region.latitude}{'\n'}
          Longitude: {this.state.region.longitude}{'\n'}
          Latitude Delta: {this.state.region.latitudeDelta}{'\n'}
          Longitude Delta: {this.state.region.longitudeDelta}{'\n'}
        </Text> */}
      </ViewContainer>
    );
  }
}

Map.propTypes = {
  map: React.PropTypes.objectOf(React.PropTypes.object),
  initialRegion: React.PropTypes.shape({
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number,
    latitudeDelta: React.PropTypes.number,
    longitudeDelta: React.PropTypes.number
  })
};

export default Map;
