import AudioListItem from "../AudioListItem";
import { FlatList, Modal, Text, View } from 'react-native'
import tw from 'twrnc'
import {selectAudio} from "../../misc/audioController";

function PlaylistDetail(props) {
  const { visible, playlist, onClose } = props

  const playAudio = (audio) => {
    selectAudio(audio)
  }
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View
        style={tw`bg-neutral-400 z-50 h-96 absolute bottom-0 left-0 right-0 rounded-t-3xl pt-4 mx-2`}
      >
        <Text
          style={tw`text-white text-center ml-4 capitalize text-3xl font-bold`}
        >
          {playlist.title}
        </Text>
        <FlatList
          data={playlist.audios}
          style={tw`mx-4`}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AudioListItem
              {...{
                name: item.filename,
                duration: item.duration,
                onPress: () => playAudio(item)
              }}
            />
          )}
        />
      </View>
    </Modal>
  )
}

export default PlaylistDetail
