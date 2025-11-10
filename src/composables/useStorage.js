import { ref } from 'vue';
import { projectStorage } from '../firebase/config JBSPA';
import useLocalAuth from './useLocalAuth';
import { jukebox } from '../assets/jukebox.json';

const { currentUser: user } = useLocalAuth();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);
  const juke = jukebox;

  const uploadImage = async (file) => {
    filePath.value = 'Jukebox/';
    const storageRef = projectStorage.ref(filePath.value);

    const res = await storageRef.put(file);
    url.value = await res.ref.getDownloadURL();

    //var i;

    //for(i=0;i<juke.length;i++) {
    //for(i=0;i<1;i++) {
    //for(i=0;i<50;i++) {
    for (i = 0; i < 1; i++) {
      //for (i = 0; i < juke.length; i++) {
      //console.log(juke[i].Languages)
      //filePath.value = `covers/${user.value.uid}/${file.name}`
      filePath.value =
        'Jukebox/' +
        juke[i].Languages +
        '/' +
        juke[i].Genres +
        '/' +
        juke[i].SubGenres +
        '/' +
        juke[i].Artists +
        '/' +
        juke[i].Albums +
        '/' +
        `${file.name}`;
      const storageRef = projectStorage.ref(filePath.value);

      //filePath.value = 'Jukebox/'+juke[i].Languages+'/'+juke[i].Genres+'/'+juke[i].SubGenres+'/'+juke[i].Artists+'/'+juke[i].Albums+'/album.jpg'

      try {
        //const res = await storageRef.put(file);
        //url.value = await res.ref.getDownloadURL();
      } catch (err) {
        console.log(err.message);
        error.value = err.message;
      }
    }

    //try {
    //const storageRef = projectStorage.ref(filePath.value);
    //const res = await storageRef.put(file);
    //url.value = res.ref.getDownloadURL();
    //} catch (err) {
    //console.log(err.message);
    //error.value = err.message;
    //}

    /*
    var remoteimageurl = "https://d05c-2600-1700-a020-7870-49a1-f3ce-875f-e681.ngrok-free.app/album.jpg"
    var filename = "Jukebox/"
    
    fetch(remoteimageurl, { mode:'no-cors'}).then(res => {          
      return res.blob();
    }).then(blob => {
        //uploading blob to firebase storage
        projectStorage.ref().child(filename).put(blob).then(function(snapshot) {
        return snapshot.ref.getDownloadURL()
      }).then(url => {
        console.log("Firebase storage image uploaded : ", url); 
      }) 
    }).catch(error => {
      console.error(error);
    });
    */

    //filePath.value = `covers/${user.value.uid}/${file.name}`
    //filePath.value = `Jukebox/Spanish/Mexicana/Ranchera/Vicente Fernandez/El Tahur/${file.name}`
    //filePath.value = `Jukebox/Spanish/Mexicana/Ranchera/Vicente Fernandez/Entre El Amor y Yo/${file.name}`

    //const juke = jukebox;
    var filename =
      '/Jukebox/English/Rock/Decades/Various Artists/The Best of the 50s/album.jpg';

    //console.log('juke.length: ' + juke.length)
    //var i;

    //var file = convertImageToBase64('https://d05c-2600-1700-a020-7870-49a1-f3ce-875f-e681.ngrok-free.app/Albums/English/Rock/Decades/Various%20Artists/The%20Best%20of%20the%2050s/album.jpg', { mode: 'no-cors' }, console.log)

    //const imagePath = ('https://d05c-2600-1700-a020-7870-49a1-f3ce-875f-e681.ngrok-free.app/Albums/English/Rock/Decades/Various%20Artists/The%20Best%20of%20the%2050s/album.jpg', { mode: 'no-cors' })
    //const album = convertImageToBase64(imagePath)

    /*
    var image = new Image();
    image.src =  ('https://d05c-2600-1700-a020-7870-49a1-f3ce-875f-e681.ngrok-free.app/Albums/English/Rock/Decades/Various%20Artists/The%20Best%20of%20the%2050s/album.jpg', { mode: 'no-cors' });
    document.body.appendChild(image);

    //var file = "https://d05c-2600-1700-a020-7870-49a1-f3ce-875f-e681.ngrok-free.app/Albums/English/Rock/Decades/Various%20Artists/The%20Best%20of%20the%2050s/album.jpg"
    fetch('https://d05c-2600-1700-a020-7870-49a1-f3ce-875f-e681.ngrok-free.app/Albums/English/Rock/Decades/Various%20Artists/The%20Best%20of%20the%2050s/album.jpg', { mode: 'no-cors' })
    .then
      projectStorage.ref().child(filename).put(image)
      .then(function(snapshot) {
      return snapshot.ref.getDownloadURL()
    }).then(url => {
      //console.log("Firebase storage image uploaded : ", url); 
    })
    */
  };

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path);

    try {
      //await storageRef.delete()
      //alert("Delete Image is currently disabled")
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };
  return { url, filePath, error, uploadImage, deleteImage };
};

export default useStorage;
