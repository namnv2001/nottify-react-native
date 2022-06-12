# Nottify-React-Native

This is a simple music app for android using React-Native

## Features

- User authentication
- Load songs from the device
- Play / Pause / Stop / Next / Previous / Shuffle / Loop / Time navigate
- Remember the last played song from the previous run
- Playlist: Add / Remove / Play / Pause songs from playlist
- Search and play online songs
- Background playback


## Local Deployment

* You need to run the BE to deploy this app https://github.com/namnv2001/nottify-node
 
* Need a env file to start this app
```
    LOCAL_URL=http://{Your IpV4 Address}:5000
``` 

* To run this app locally, clone the project, navigate to the root directory with a command prompt or terminal(where the package.json file is located), and run this below code to download the neccesary dependencies onto your local machine (You can use npm instead of yarn).

```
    yarn install
```


* Inside the root directory, you can run some built-in commands:
```
    yarn start
```
* Run the app in the development mode. Open http://localhost:19002 to view it in the browser, you can use Android devices or web browser to deploy the project.

## Libraries and Framework

* `react-native`
* `expo`
* `expo-av`
* `expo-media-library`
* `react-native-async-storage`
* `react-native-permission`
* `recyclerlistview`
* `twrnc`

## Contributors

* [Nguyễn Văn Nam](https://github.com/namnv2001)
* [Trần Hải Ninh](https://github.com/NinhTH01)

## Screenshots

* Login/Register

    ![285989673_712886166494953_8648264107661064629_n](https://user-images.githubusercontent.com/79095365/173221558-d782d77e-98bc-4fee-b8fc-dd64b2cc889c.jpg)
    ![287016917_748813699591023_3837031497143208563_n](https://user-images.githubusercontent.com/79095365/173221563-8932ec3c-161e-4898-bfb1-6a5bea17cdba.jpg)
    
* Albums

    ![285006384_734989424589888_3322114743658358002_n](https://user-images.githubusercontent.com/79095365/173221567-d5c3549e-b6ae-4792-ae78-518402512f79.jpg)
    
* Online songs

    ![285000794_438564434777564_6549413786263044286_n](https://user-images.githubusercontent.com/79095365/173221565-029a3cd2-0fca-4846-9a77-d3d8ca10797c.jpg)
    ![286442603_778410896494384_5544034704061008716_n](https://user-images.githubusercontent.com/79095365/173221560-d15ad123-08a3-4ae7-a4c8-93e630649a27.jpg)
    
* Play/Pause/Next/Previous/Suffle

    ![286256268_590628632336342_4443988053601027299_n](https://user-images.githubusercontent.com/79095365/173221559-096a2368-874a-4e46-a638-f1cc371ecfa2.jpg)
    ![286726065_348427810710227_4405807415278118739_n](https://user-images.githubusercontent.com/79095365/173221561-e656e23c-e75a-4598-b1c2-005122a6d4e7.jpg)
    ![285749510_772106687123143_5105982126514711741_n](https://user-images.githubusercontent.com/79095365/173221556-7dc90a4d-0586-4fac-ad99-75c2549dadc4.jpg)

* Playlist
 
    ![287058301_320854433568698_1436434379890051741_n](https://user-images.githubusercontent.com/79095365/173221564-9e3e28d2-1001-430b-bbe9-237942c22aac.jpg)
    ![285937137_554889189475815_2819102957067712949_n](https://user-images.githubusercontent.com/79095365/173221557-9661eca3-fba7-469f-9603-da4e770e06ba.jpg)
    ![287006421_2151674921660328_6299194676660206297_n](https://user-images.githubusercontent.com/79095365/173221562-2040f0be-7c87-49df-a882-a49212e113ec.jpg)

* Play in playlist

    ![285460407_731267834976597_8016958896075496386_n](https://user-images.githubusercontent.com/79095365/173221553-d97d8cf2-af9b-4a4e-a028-76669c677f07.jpg)
    ![285722032_358314496220503_5237688955381099004_n](https://user-images.githubusercontent.com/79095365/173221555-cf3e990a-a623-4792-91b6-c1810a27af49.jpg)
    
* Logout

    ![285127520_562361525490670_4483604606731846593_n](https://user-images.githubusercontent.com/79095365/173221552-a233f40b-8da5-41a2-976e-06f891a48106.jpg)
