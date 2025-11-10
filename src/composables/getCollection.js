import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config JBSPA';

const getCollection = (collection, query) => {
  const documents = ref(null);
  const error = ref(null);

  //const artistArray = curArtist.value.split(',')
  //alert(artistArray[0])
  //alert(artistArray[1])

  // register the firestore collection reference
  let collectionRef = projectFirestore.collection(collection);
  //.where('songs', 'array-contains', 'Big Mountain - Baby I Love Your Way.mp3').get()
  //.where('songs', 'array-contains', 'Big Mountain - Baby I Love Your Way.mp3').get()
  //.where('artist', '>=', curArtist.value)
  //.where("songs", "array-contains", { Song: "Berlin - Take My Breath Away.mp3", isFave: false })
  //.limit(5)
  //.where('artist', '>=', artistArray[0])
  //.orderBy('createdAt')
  //.orderBy('artist')

  if (query) {
    collectionRef = collectionRef.where(...query);
  }

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        // must wait for the server to create the timestamp & send it back
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      // update values
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = 'could not fetch the data';
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
