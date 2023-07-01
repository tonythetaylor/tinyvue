import React from 'react'
import {
  Text, View, StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView
} from 'react-native'
import styled from 'styled-components/native'

import { Colors, Images, Metrics } from 'Constants'
import { McText, McImage, PlayButton } from 'Components'
import { Dimensions } from 'react-native'

import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';

import { dummyData } from 'Mock'
import BottomBar from './BottomBar'

const Library = ({ navigation }) => {
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <View style={{
          marginTop: 16,
          marginLeft: index == 0 ? 24 : 0,
          marginRight: index == dummyData.Playlists.length - 1 ? 0 : 24,
        }}>
          {/* <McImage
            key={index}
            source={item.thumbnail}
            style={{
              marginBottom: 12,
              width: 140,
              height: 140,
            }} /> */}

          <Entypo key={index} name="folder-music" size={120} color={Colors.grey5} style={{
            marginBottom: 12,
            width: 140,
            height: 140,
          }} />

          <McText semi size={16} color={Colors.grey5}>{item.name}</McText>
          <McText medium size={12} color={Colors.grey3}
            style={{
              marginTop: 4
            }}>
            {item.songs} songs
          </McText>
        </View>
      </View>
    )
  }

  return (
    <Container>
      <StatusBar barStyle='light-content' />
      {/* Header Section */}
      <McText
        bold size={28}
        color={Colors.primary}
        style={{
          marginLeft: Metrics.padding,
          marginTop: 12
        }}>Library</McText>

      {/* Search Section */}
      <SearchSection>
        <AntDesign
          name="search1"
          size={24}
          color={Colors.grey3}
          style={{ marginLeft: 16, marginRight: 12 }}
        />
        <TextInput
          placeholder='Song or artist'
          placeholderTextColor={Colors.grey3}
          style={{
            color: Colors.grey4
          }}
        ></TextInput>
      </SearchSection>

      {/* Playlist Section */}
      <TitleSection>
        <McText medium size={20} color={Colors.grey4}>Playlists</McText>
        <TouchableWithoutFeedback onPress={() => {
          console.log('Go to Playlist list page')
        }}>
          <AntDesign name="right" size={20} color={Colors.grey3} />
        </TouchableWithoutFeedback>
      </TitleSection>
      <View>
        <FlatList
          keyExtractor={(item) => 'playlist_' + item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          data={dummyData.Playlists}
          renderItem={_renderItem}
        />
      </View>
      {/* Favorite Section */}
      <TitleSection>
        <McText medium size={20} color={Colors.grey4}>
          Favorites
        </McText>
        <TouchableWithoutFeedback onPress={() => {
          console.log('Go to Playlist list page')
        }}>
          <AntDesign name="right" size={20} color={Colors.grey3} />
        </TouchableWithoutFeedback>
      </TitleSection>
      <View>
        <ScrollView
          contentContainerStyle={{
            marginTop: 14,
            height: 200
          }}
          style={{}}
        >
          {
            dummyData.Favorites.map((item, index) => {
              return (
                <FavoriteItemView key={index}>
                  <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('Player', { selectedMusic: item })
                  }}>
                    <View style={{ flexDirection: 'row' }}>
                      <MusicCircle>
                        {!item?.artwork
                          ? <FontAwesome5 name="music" size={16} color={Colors.grey5} />
                          : <McImage 
                          source={item.artwork} 
                          style={{
                            width: 42, 
                            height: 42, 
                            borderRadius: 15
                          }} />
                        }
                      </MusicCircle>
                      <View style={{
                        marginLeft: 12
                      }}>
                        <McText semi size={14} color={Colors.grey5}>
                          {item.title}
                        </McText>
                        <McText medium size={12} color={Colors.grey3} style={{
                          marginTop: 4
                        }}>{item.artist}</McText>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  {/* <McImage source={Images.like} /> */}
                  <Entypo name="heart-outlined" size={24} color={Colors.grey3} style={{
                    width: 38,
                    height: 38
                  }} />
                </FavoriteItemView>
              )
            })
          }
        </ScrollView>
      </View>

      {/*  Bottom Section */}
      <BottomSection>
        <BottomBar>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginHorizontal: 16,
            marginVertical: 24
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FontAwesome5 name="music" size={36} color={Colors.grey5} />
              {/* <McImage source={Images.like}
                style={{
                  width: 38,
                  height: 38
                }}></McImage> */}
              <View style={{ marginLeft: 12 }}>
                <McText bold size={16} color={Colors.grey5}>Thunder</McText>
                <McText medium size={12} color={Colors.grey3} style={{
                  marginTop: 4
                }}>Imagine Dragon</McText>
              </View>
            </View>
            <PlayButton size={46} circle={41.28} icon={'pause'}></PlayButton>
          </View>
        </BottomBar>
      </BottomSection>
    </Container>
  )
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.background};
  `;

const SearchSection = styled.View`
  width:  378px;
  height: 52px;
  border-radius: 30px;
  background-color: ${Colors.secondary};
  margin: 20px 24px 0px; 
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  `;

const TitleSection = styled.View`
  margin: 20px 24px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  `;

const FavoriteItemView = styled.View`
  margin: 10px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  `;

const MusicCircle = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  background-color:  ${Colors.secondary};
  justify-content: center;
  align-items: center;
  `;

const BottomSection = styled.View`
  margin: 12px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  bottom: 50px;
  left: 0px;
  z-index: 1;  
  `;
export default Library;
