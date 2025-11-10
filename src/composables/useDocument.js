import { ref } from 'vue';
import { projectFirestore } from '../firebase/config JBSPA';
import { jukebox } from '../assets/jukeboxnew.json';

const useDocument = (collection, id) => {
  let error = ref(null);
  let isPending = ref(false);

  const juke = jukebox;

  let docRef = projectFirestore.collection(collection).doc(id);
  //const { updateDoc } = useDocument('playlists', 'ehNVrL1CflApYqmmMm5P')

  projectFirestore
    .collection('playlists')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        //console.log(doc.data().language + "/" + doc.data().genre + "/" + doc.data().subgenre + "/" + doc.data().artist + "/" + doc.data().album);
        //console.log(doc.id);
        //for(var i=0;i<juke[8].Songs.length;i++) {
        //    updateDoc({
        //        songs: [juke[8].Songs[i]]
        //    })
        //}
      });
    });

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;
    try {
      const res = await docRef.delete();
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = 'could not delete the document';
    }
  };

  const updateDoc = async (updates) => {
    //console.log("updates: " + updates.toString())
    isPending.value = true;
    error.value = null;
    try {
      const res = await docRef.update(updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = 'could not update the document';
    }
  };

  return { error, isPending, deleteDoc, updateDoc };
};

export default useDocument;
