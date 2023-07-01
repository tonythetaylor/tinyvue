import React, { useState, useEffect } from 'react'
import { Text, View, StatusBar, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import styled from 'styled-components'
import Slider from '@react-native-community/slider'

import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign, Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Colors, Images, Metrics } from 'Constants'
import { McText, McImage, PlayButton } from 'Components'
import { dummyDatat } from 'Mock'

import TrackPlayer, {
  Capability,
  State,
  Event,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { setupPlayer, addTracks } from '../../../service';

const tracks = [
  {
    id: '1',
    url: require('../../../assets/tracks/The_Warm_Up/01.mp3'),
    title: 'Intro (The Warm Up)',
    artist: 'J. Cole',
    artwork: require('../../../assets/tracks/The_Warm_Up/the_warm_up.jpg'),
    thumbnail: require('../../../assets/tracks/The_Warm_Up/the_warm_up.jpg'),
  },
  {
    id: '2',
    url: require('../../../assets/tracks/The_Warm_Up/02.mp3'),
    title: 'Welcome',
    artist: 'J. Cole',
    artwork: require('../../../assets/tracks/The_Warm_Up/the_warm_up.jpg'),
    thumbnail: require('../../../assets/tracks/The_Warm_Up/the_warm_up.jpg'),
  },
  {
    id: '3',
    url: require('../../../assets/tracks/The_Warm_Up/03.mp3'),
    title: 'Can I Live',
    artist: 'J. Cole',
    artwork: require('../../../assets/tracks/The_Warm_Up/the_warm_up.jpg'),
    thumbnail: require('../../../assets/tracks/The_Warm_Up/the_warm_up.jpg'),
  },
  // {
  //   id: '3',
  //   url: require('../../../assets/tracks/The Warm Up/01 Intro (The Warm Up).mp3'),
  //   title: 'The Warm Up',
  //   artist: 'J. Cole',
  //   artwork: '',
  //   duration: 60,
  // }
];

const Player = ({ navigation, route }) => {
  const [selectedMusic, setSelectedMusic] = useState(null);
  const podcastsCount = tracks.length;
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();

   //state to manage whether track player is initialized or not
 const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);

  const playBackState = usePlaybackState();
  const progress = useProgress();

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious
        ],
      });
      await TrackPlayer.add(tracks);
      await gettrackdata();
      await TrackPlayer.play();
      return true
    } catch (error) { console.log(error); }
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artwork, artist } = track;
      console.log(event.nextTrack);
      setTrackIndex(event.nextTrack);
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  const gettrackdata = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    console.log(trackIndex);
    setTrackIndex(trackIndex);
    setTrackTitle(trackObject.title);
    setTrackArtist(trackObject.artist);
    setTrackArtwork(trackObject.artwork);
  };

  const togglePlayBack = async (playBackState) => {
    console.log("DEBUG ", playBackState)
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      if (await TrackPlayer.getState() == State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    }
  };

  const nexttrack = async () => {
    if (trackIndex < podcastsCount - 1) {
      await TrackPlayer.skipToNext();
      gettrackdata();
    };
  };

  const previoustrack = async () => {
    if (trackIndex > 0) {
      await TrackPlayer.skipToPrevious();
      gettrackdata();
    };
  };

//   useEffect(() => {

// //      // set up the player if it is not set up yet
// // TrackPlayer.getState().then(async (state) => {
// //   if (state === State.None) {
// //       // The player is not set up
// //       await TrackPlayer.setupPlayer();
// //   }
// // });
// setupPlayer();

//   }, [playBackState]);

  useEffect(() => {
    const startPlayer = async () => {
       let isInit =  await setupPlayer();
       setIsTrackPlayerInit(isInit);
    }
    startPlayer();

  }, []);

  useEffect(() => {
    let { selectedMusic } = route.params;
    setSelectedMusic(selectedMusic);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <StatusBar barStyle='light-content'></StatusBar>
        {/*  Header Section */}
        <HeaderSection>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
            {/* <McImage source={Images.left} /> */}
            <AntDesign name="left" size={24} color={Colors.grey3} />
          </TouchableOpacity>
          <AntDesign name="ellipsis1" size={24} color={Colors.grey3} />

        </HeaderSection>
        {/* Music Detail Section */}
        <MusicDetailSection>

          {selectedMusic?.artwork
            ?
            <McImage source={selectedMusic?.artwork}
              style={{
                marginBottom: 12,
                width: 140,
                height: 140,
                marginHorizontal: 81,
                marginVertical: 60
              }} />
            :
            <FontAwesome5
              name="music"
              size={120}
              color={Colors.grey5}
              style={{
                marginBottom: 12,
                width: 140,
                height: 140,
                marginHorizontal: 81,
                marginVertical: 60
              }} />
          }
          <View style={{
            marginTop: 16,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <McText semi size={24} color={Colors.grey5} align='center'>{trackTitle}</McText>
            <McText medium size={14} color={Colors.grey3} style={{ marginTop: 8 }} align='center'>{trackArtist}</McText>
          </View>
        </MusicDetailSection>
        {/* Slider Section */}
        <SliderSection>
          <Slider
            minimumValue={0}
            maximumValue={progress.duration}
            value={progress.position}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor={Colors.grey3}
            color={Colors.grey3}
            thumbTintColor={Colors.primary}
            onSlidingComplete={async value => await TrackPlayer.seekTo(value)}
          // thumbImage={() => {
          //   return (
          //     <Entypo name="dot-single" size={24} color={Colors.grey3}  />
          //   )
          // }}
          >
          </Slider>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <McText size={12} color={Colors.grey4}>{new Date(progress.position * 1000)
              .toLocaleTimeString()
              .substring(3, 7)}</McText>
            <McText size={12} color={Colors.grey4}>{new Date((progress.duration - progress.position) * 1000)
              .toLocaleTimeString()
              .substring(3, 7)}</McText>
          </View>
        </SliderSection>
        {/* Control button section */}
        <ControlSection>
          <FontAwesome name="refresh" size={24} color={Colors.grey3} />
          <View style={{
            width: 231,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              width: 231,
              height: 54,
              borderRadius: 54,
              backgroundColor: Colors.secondary,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>

              <TouchableOpacity
                onPress={previoustrack}>
                <Entypo name="controller-fast-backward" size={24} color={Colors.grey3} style={{ marginLeft: 24 }} />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => togglePlayBack(playBackState)}> */}
              <View style={{
                width: 88,
                height: 88,
                borderRadius: 88,
                backgroundColor: Colors.background,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1
              }}>
                {/* <AntDesign name={ playBackState == State.Playing
                      ? 'pause'
                      : playBackState == State.Connecting
                        ? 'loading1'
                        : 'play'} size={32} color={Colors.grey3} style={{position: 'relative', zIndex: 1}}  /> */}
                <PlayButton size={64} circle={62.82} icon={
                  playBackState == State.Playing
                    ? 'pause'
                    : playBackState == State.Connecting
                      ? 'loading1'
                      : 'play'
                } onPress={() => togglePlayBack(playBackState)}></PlayButton>
              </View>
              {/* <PlayButton size={64} circle={62.82} icon={
                    playBackState === State.Playing
                      ? 'pause'
                      : playBackState === State.Connecting
                        ? 'loading1'
                        : 'play'
                  } style={{zIndex: 1}}></PlayButton> */}
              {/* </TouchableOpacity> */}

              <TouchableOpacity
                onPress={nexttrack}>
                <Entypo name="controller-fast-forward" size={24} color={Colors.grey3} style={{ marginRight: 24 }} />
              </TouchableOpacity>
            </View>
          </View>
          <Entypo name="sound-mix" size={24} color={Colors.grey3} />
        </ControlSection>
        {/* Lyrics Section */}
        <LyricsSection>
          <AntDesign name="up" size={24} color={Colors.grey3} />
          <McText medium size={14} color={Colors.accent}>Lyrics</McText>
        </LyricsSection>
      </Container>
    </SafeAreaView>
  )
};

const Container = styled.View`
flex: 1;
background-color: ${Colors.background}
`;

const HeaderSection = styled.View`
margin: 12px 24px 0px;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const MusicDetailSection = styled.View`
margin: 32px 24px;
justify-content: center;
align-items: center;
`

const SliderSection = styled.View` 
margin: 32px 24px;
`;

const ControlSection = styled.View`
margin: 32px 24px;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const LyricsSection = styled.View`
margin: 14px 0px;
align-items: center;
justify-content: center;
position: absolute;
bottom: 50px;
left: 0px;
right: 0px;
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  }
});
export default Player;
