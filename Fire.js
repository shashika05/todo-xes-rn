import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJeHSOHg9ZMquoQDN12cQ9N5woKAJYAmM",
  authDomain: "todobyxes.firebaseapp.com",
  projectId: "todobyxes",
  storageBucket: "todobyxes.appspot.com",
  messagingSenderId: "1025157338504",
  appId: "1:1025157338504:web:abb3663d6993af11cfd63d",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = this.ref.orderBy("name");
    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  deleteList(list) {
    let ref = this.ref;

    ref.doc(list.id).delete();
  }

  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;

    ref.doc(list.id).update(list);
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
