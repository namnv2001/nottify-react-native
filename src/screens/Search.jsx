import AudioListItem from 'components/AudioListItem'
import SearchBar from 'components/SearchBar'
import { AudioContext } from 'context/AudioProvider'
import { zing } from 'helpers/services'
import { selectAudio } from 'misc/audioController'
import { useContext, useState } from 'react'
import { View } from 'react-native'
import tw from 'style/tailwind'

let resultSongsArray = []
function Search() {
  const [songList, setSongList] = useState([])
  const context = useContext(AudioContext)

  const onSearch = async (event) => {
    resultSongsArray = []
    const keyValue = event.nativeEvent.text
    const res = await zing({ action: 'search', param: keyValue })
    if (res) setSongList(res.data.songs)
    // setup to link the selected audio to the player screen
    res.data.songs.map((song) => {
      resultSongsArray.push({
        name: song.title,
        encodeId: song.encodeId,
        id: song.radioId,
      })
    })
  }

  const getSong = async (key) => {
    const res = await zing({ action: 'get-song', param: key })
    if (res) {
      try {
        const audio = {
          filename: resultSongsArray.find((song) => song.encodeId === key).name,
          id: resultSongsArray.find((song) => song.encodeId === key).id,
          duration: res.duration,
          uri: res.data['128'],
        }
        await selectAudio(audio, context)
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
              optionPressed: () => {
                console.log('this feature is in progress')
              },
              onAudioPressed: () => getSong(song.encodeId),
            }}
          />
        ))}
    </View>
  )
}

export default Search
