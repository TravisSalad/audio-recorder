/**
 * This file serves as a wrapper around firebase storage and database.
 * It contains utility funcitons for create/read/update/delete.
 */

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: `${process.env.REACT_APP_FIREBASE_PROJECTID}.firebaseapp.com`,
    databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECTID}.firebaseio.com`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECTID}.appspot.com`,
};

firebase.initializeApp(config);

const storage = firebase.storage();
const database = firebase.database();

const handleErr = (err) => {
    const message = err.message ? err.message : 'Unknown error occurred.';
    console.error('messagehandler: ', message);
};

/**
 * Reads a value from the FB database.
 * @param {string} path database url path.
 * @param {function} cb callback function; called on success.
 */
export function read (path, cb) {
    firebase.database().ref(path).once('value')
    .then((success) => {
        cb(success.val());
    })
    .catch(handleErr);
}

/**
 * Creates or replaces data at the specified path in the database.
 * @param {string} path the relative object path in the database.
 * @param {object} dataObj the data object to be saved.
 * @param {function} cb callback function; called on success.
 */
export async function create(path, file, dataObj) {
    try {
        // Add file to storage
        const snapshot = await storage.ref(path).put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        const data = { ...dataObj, downloadURL };
        await database.ref(path).set({ ...dataObj, downloadURL })
        return data;
    } catch(err) {
        handleErr(err);
    }
}

/**
 * Updates data at the specified path in database.
 * @param {string} path the relative object path in the database.
 * @param {object} dataObj the data object to be updated.
 * @param {function} cb callback function; called on success.
 */
export function update(path, dataObj, cb) {
    database.ref(path).update(dataObj)
    .then(cb)
    .catch(handleErr);
}

/**
 * Removes data at the specified path in database and removes file from firebase storage.
 * @param {string} path the relative object path in the database.
 * @param {function} cb callback function; called on success.
 */
export async function remove(path) {
    try {
        await storage.ref(path).delete();
        await database.ref(path).remove();
    } catch(err) {
        handleErr(err);
    }
}

export const Database = {
    create,
    read,
    update,
    remove
}

export {
    storage,
    database,
    firebase
}