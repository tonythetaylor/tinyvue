import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Entypo, AntDesign  } from '@expo/vector-icons';
import McImage from '../McImage'
import { Colors } from 'Constants'

const start = { x: 0, y: 0 }
const end = { x: 1, y: 0 }

const PlayButton = ({ size, circle, icon, onPress }) => (
    <Container size={size} onPress={onPress}>
        <AntDesign name={icon} size={32} color={Colors.grey3} style={{position: 'relative', zIndex: 1}}  />
        <Circle 
        colors={Colors.linearGradient1} 
        size={size}
        circle={circle}
        start={start}
        end={end}
        style={{
            opacity: 0.5,
            position: 'absolute',
            left: 0,
            bottom: 0
        }}
        />
                <Circle 
        colors={Colors.linearGradient1} 
        size={size}
        circle={circle}
        start={start}
        end={end}
        style={{
            opacity: 0.5,
            position: 'absolute',
            bottom: 0,
            right: 0,
        }}
        />
        <Circle 
        colors={Colors.linearGradient1} 
        size={size}
        circle={circle}
        start={start}
        end={end}
        style={{
            opacity: 0.5,
            position: 'absolute',
            top: 0
        }}
        />
    </Container>
);

const Container = styled.TouchableOpacity`
    width: ${props => props.size || 78}px;
    height: ${props => props.size || 78}px;
    justify-content: center;
    align-items: center
`;

const Circle = styled(LinearGradient)`
    width: ${props => props.circle || 70}px;
    height: ${props => props.circle || 70}px;
    border-radius:  ${props => props.circle / 2 || 70/2}px;
`;
export default PlayButton;
