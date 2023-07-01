import React from 'react'
import { Text, View, StatusBar } from 'react-native'
import styled from 'styled-components/native'

import { FontAwesome5 } from '@expo/vector-icons'; 

import { Colors, Images, Metrics } from 'Constants'
import { McText, McImage, PlayButton } from 'Components'

const Onboarding = ({ navigation }) => (
  <Container>
    <StatusBar barStyle='light-content' />
    <FontAwesome5 
    name="music" 
    size={120} 
    style={{ marginTop: 204 - 40 }}
    color={Colors.accent}
    />
    <McText color={Colors.primary} size={24} black style={{
      marginTop: 28,
    }}>Tiny Vue</McText>
    <McText color={Colors.grey4} size={14} medium align='center' style={{
      marginHorizontal: 51,
      marginTop: 8
    }}>
      Transforming the way you experience live music/events from the palm of your hands!
    </McText>
    <View style={{ marginTop: 202 }}>
      <PlayButton size={78} circle={70} icon={'arrowright'}
        onPress={() => { navigation.navigate('Library') }}
      />
    </View>
  </Container>
);

const Container = styled.SafeAreaView`
  flex: 1;
  background-color:  ${Colors.background};
  justify-content: flex-start;
  align-items: center;
  `;
export default Onboarding;
