import { firebaseDb} from "./firebase";

export class FirebaseList {
  constructor(path = null) {
    this._path = path;
  }

  get path() {
    return this._path;
  }

  get database() {
    return firebaseDb.ref().child(this.path)
  }

  set path(value) {
    this._path = value;
  }

  databaseSnapshot(path) {
    return firebaseDb.ref(path).once('value')
  }

  db() {
    return firebaseDb;
  }

  push(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this._path)
        .push(value, error => error ? reject(error) : resolve());
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .remove(error => error ? reject(error) : resolve());
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .set(value, error => error ? reject(error) : resolve());
    });
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .update(value, error => error ? reject(error) : resolve());
    });
  }






}