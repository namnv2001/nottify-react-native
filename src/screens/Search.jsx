import AudioListItem from 'components/AudioListItem'
import SearchBar from 'components/SearchBar'
import { zing } from 'helpers/services'
import { useState } from 'react'
import { View } from 'react-native'
import tw from 'style/tailwind'

function Search() {
  const [songList, setSongList] = useState([])

  const onSearch = async (event) => {
    const keyValue = event.nativeEvent.text
    const res = await zing({ action: 'search', param: keyValue })
    if (res) setSongList(res.data.songs)
  }

  const getSong = async (key) => {
    const res = await zing({ action: 'get-song', param: key })
    if (res) {
      try {
        console.log('fuck this app')
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <View style={tw`px-8 bg-secondary h-full`}>
      <SearchBar {...{ onSubmit: onSearch }} />
      {songList &&
        songList.map((song) => (
          <AudioListItem
            {...{
              key: song.encodeId,
              name: song.title,
              duration: song.duration,
              optionPressed: () => {},
              onAudioPressed: () => getSong(song.encodeId),
            }}
          />
        ))}
    </View>
  )
}

export default Search
