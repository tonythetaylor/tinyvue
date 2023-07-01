import React from 'react'
import { Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, F, Path } from 'react-native-svg';

import { Colors, Images, Metrics } from 'Constants'
import { McText, McImage } from 'Components'
const BottomBar = ({ children }) => (
    <View style={{
        width: 378,
        height: 84,
        borderRadius: 84,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }}>
        <View style={{ width: 42, height: 88 }}></View>
        <View style={{ height: 102.5, justifyContent: 'space-between' }}>
            <LinearGradient
                colors={Colors.linearGradient2}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    width: 378 - 103,
                    height: 3,
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                }}
            />
            <View style={{
                flexDirection: 'row',
                alignSelf: 'flex-end'
            }}>
                <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 6,
                    position: 'relative',
                    bottom: -1.5,
                    backgroundColor: '#536552'
                }}></View>
                <View style={{
                    width: 378 - 103 - 150,
                    height: 3,
                    borderRadius: 3,
                    alignSelf: 'flex-end',
                    backgroundColor: '#344233'
                }}></View>

            </View>
        </View>
        <Svg height="103" width="88">
            <Circle
                cx="0"
                cy="51"
                r="50"
                stroke="#344233"
                strokeWidth="3"
                fill="transparent"
            >

            </Circle>
        </Svg>
        <View style={{
            marginVertical: 7,
            marginHorizontal: 7,
            width: 378 - 103 + 80,
            height: 88,
            borderRadius: 90,
            backgroundColor: Colors.secondary,
            position: 'absolute',
            top: 0,
            left: 0

        }}>
            {children}
        </View>
    </View>
);

export default BottomBar;
