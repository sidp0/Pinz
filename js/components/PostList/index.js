import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  InteractionManager,
  View,
  ActivityIndicator
} from 'react-native';
import Post from './Post';

import { COLORS } from '../../constant';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.LIGHT_GRAY,
    marginTop: 54
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class PostList extends Component {

  static renderPlaceholderView() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          style={{ marginBottom: 100 }}
          size={50}
          color={COLORS.LIGHT_GREEN}
          animating
        />
      </View>
    );
  }

  constructor() {
    super();

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,
        <Post />,

      ]),
      renderPlaceholderOnly: true
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderPlaceholderOnly: false });
    });
  }

  render() {
    if (this.state.renderPlaceholderOnly) {
      return PostList.renderPlaceholderView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={rowData => rowData}
        style={styles.listContainer}

        // Ratio of initial render to how many rendered
        // per frame.
        initialListSize={10}
        pageSize={10}
        // scrollRenderAheadDistance={400}
      />
    );
  }
}

export default PostList;
