/**
 * Define and export the dummy data.
 */
export const sampleObject1 = {
  id: '001',
  title: 'this is a title',
  desc: 'Do elit pariatur aliqua laborum dolore qui.',
};
export const sampleObject2 = {
  firstName: 'John',
  lastName: 'Doe',
};

export const Playlists = [{
  id: '001',
  name: 'Stargroves',
  songs: 20,
  thumbnail: require('../../assets/images/musicoding.png')
},
{
  id: '002',
  name: 'So it goes',
  songs: 5,
  thumbnail: require('../../assets/images/musicoding.png')
},
{
  id: '003',
  name: 'Playlist 003',
  songs: 5,
  thumbnail: require('../../assets/images/musicoding.png')
},
{
  id: '004',
  name: 'Playlist 004',
  songs: 5,
  thumbnail: require('../../assets/images/musicoding.png')
}];

export const Favorites = [{
  id: ' 001',
  url: '',
  title: 'The Warm Up',
  artist: 'J. Cole',
  artwork: require('../../assets/tracks/The_Warm_Up/the_warm_up.jpg'),
  thumbnail: require('../../assets/tracks/The_Warm_Up/the_warm_up.jpg'),
}, {
  id: '002',
  url: '',
  title: 'Thunder',
  album: 'Imagine Dragon',
  artist: 'Imagine Dragon',
  thumbnail: require('../../assets/images/musicoding.png')
}, 
{
  id: '003',
  url: '',
  title: 'Favorite 003',
  album: 'Favorite 003',
  artist: 'Favorite 003',
  thumbnail: require('../../assets/images/musicoding.png')
},
]

const music = [{
  title: 'death bed',
  artist: 'Powfu',
  artwork: 'https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._AC_SX425_.jpg',
  url: 'https://sample-music.netlify.app/death%20bed.mp3',
  duration: 2 * 60 + 53,
  id: '1',
},{
  title: 'bad liar',
  artist: 'Imagine Dragons',
  artwork: 'https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._AC_SX425_.jpg',
  url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
  duration: 2 * 60,
  id: '2',
  track_number: '2'
}
]

const dummyData = { Playlists, Favorites, music };

export default dummyData;
