import AudioListItem from "../components/AudioListItem";
import {TouchableOpacity,FlatList, Text, View} from 'react-native'
import tw from 'twrnc'
import {selectAudio} from "../misc/audioController";
import React, {useContext, useState} from "react";
import { AudioContext } from 'context/AudioProvider'
import  OptionModal from  '../components/OptionModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

function PlaylistDetail(props) {

    const context = useContext(AudioContext)
    const playlist = props.route.params;
    const [modelVisible, setModelVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [audios, setAudios] = useState(playlist.audios)

    const onCloseModal = () => {
        setSelectedItem({})
        setModelVisible(false)
    }
    const removeAudio = async () => {
        let isPlaying = context.isPlaying;
        let isPlayListRunning = context.isPlayListRunning;
        let soundObj = context.soundObj;
        let playbackPosition = context.playbackPosition;
        let activePlayList = context.activePlayList;

        if (
            context.isPlayListRunning &&
            context.currentAudio.id === selectedItem.id
        ) {
            // stop
            await context.playbackObj.stopAsync();
            await context.playbackObj.unloadAsync();
            isPlaying = false;
            isPlayListRunning = false;
            soundObj = null;
            playbackPosition = 0;
            activePlayList = [];
        }

        const newAudios = audios.filter(audio => audio.id !== selectedItem.id);
        const result = await AsyncStorage.getItem('playlist')
        if (result !== null) {
            const oldPlayLists = JSON.parse(result);
            const updatedPlayLists = oldPlayLists.filter(item => {
                if (item.id === playlist.id) {
                    item.audios = newAudios;
                }

                return item;
            });

            AsyncStorage.setItem('playlist', JSON.stringify(updatedPlayLists));
            context.updateState(context, {
                playList: updatedPlayLists,
                isPlayListRunning,
                activePlayList,
                playbackPosition,
                isPlaying,
                soundObj,
            });
        }
        setAudios(newAudios);
        onCloseModal();
    };

    const removePlaylist = async () => {
        let isPlaying = context.isPlaying;
        let isPlayListRunning = context.isPlayListRunning;
        let soundObj = context.soundObj;
        let playbackPosition = context.playbackPosition;
        let activePlayList = context.activePlayList;

        if (context.isPlayListRunning && activePlayList.id === playList.id) {
            // stop
            await context.playbackObj.stopAsync();
            await context.playbackObj.unloadAsync();
            isPlaying = false;
            isPlayListRunning = false;
            soundObj = null;
            playbackPosition = 0;
            activePlayList = [];
        }

        const result = await AsyncStorage.getItem('playlist');
        if (result !== null) {
            const oldPlayLists = JSON.parse(result);
            const updatedPlayLists = oldPlayLists.filter(
                item => item.id !== playlist.id
            );

            AsyncStorage.setItem('playlist', JSON.stringify(updatedPlayLists));
            context.updateState(context, {
                playList: updatedPlayLists,
                isPlayListRunning,
                activePlayList,
                playbackPosition,
                isPlaying,
                soundObj,
            });
        }

        props.navigation.goBack();
    };


    const playAudio = async (audio, context) => {
        console.log(playlist)
        await selectAudio(audio, context, {activePlayList:  playlist, isPlayListRunning: true})
    }
    return (
    <><View
                style={tw`bg-neutral-400 z-50 h-96 absolute bottom-0 left-0 right-0 rounded-t-3xl pt-4 mx-2`}
            >
        <View>
                <Text
                    style={tw`text-white text-center ml-4 capitalize text-3xl font-bold`}
                >
                    {playlist.title}
                </Text>
                <TouchableOpacity onPress={removePlaylist}>
                    <Text
                        style={tw`text-white text-center ml-4 capitalize text-3xl font-bold`}
                    > Delete </Text>
                </TouchableOpacity>
            </View>
                <FlatList
                    data={audios}
                    style={tw`mx-4`}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <AudioListItem
                            {...{
                                name: item.filename,
                                duration: item.duration,
                                isPlaying: context.isPlaying,
                                activeListItem: item.id === context.currentAudio.id,
                                onAudioPressed: () => playAudio(item, context),
                                activeItem: context.currentAudioIndex === index,
                                optionPressed: () => {
                                    setSelectedItem(item)
                                    setModelVisible(true)}
                            }}
                        />
                    )}
                />
            </View>
            <OptionModal
                visible={modelVisible}
                onClose={onCloseModal}
                options={[
                    {
                        title: 'Remove from playlist',
                        onPress: removeAudio,
                        iconName: 'albums-outline'
                    }
                ]}
                currentItem={selectedItem}
            />
        </>
        );
    };

export default PlaylistDetail
