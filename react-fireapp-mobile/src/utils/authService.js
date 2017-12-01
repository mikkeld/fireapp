import {firebaseAuth} from "./firebase/firebase";

export const logout = () => {
  firebaseAuth.signOut().then(() => {
    console.log("You signed out")
  }).catch(function(error) {
    console.log("could not sign out", error)
  });
};
