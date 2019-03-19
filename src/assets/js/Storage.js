// LocalStorage Wrapper
// save Array -> transform: String -> localStorage.setItem
// get Array -> localStorage.getItem -> transform: Array

import MyNiceEvents from "./Events"

import {
  renderNotes
} from "./helper"

export default class Storage extends MyNiceEvents {
  constructor(localStorageKey) {
    super()
    this.key = localStorageKey
    this.data = this.get()
  }

  addDataSet(dataParameter) {
    this.data.push(dataParameter)
    this.emit("updated", this.data)
    this.save()
  }
  removeDataSet(dataParameter) {

    // remove from this.data
    this.data = this.data.filter((dummyName, index) => {
      return index != dataParameter;
    })
    // console.log(`${index}`);
    // console.log(this.data);
    console.log(`remove it ${dataParameter}`);

    // update the ui
    this.emit("updated", this.data)
    this.save()
  }
  save() {
    // have access to current data
    const data = this.data
    // transform to string
    const stringified = JSON.stringify(data)
    // save to locaStorage
    window.localStorage.setItem(this.key, stringified)
  }

  get() {
    const localStorageValue = window.localStorage.getItem(this.key)
    this.data = JSON.parse(localStorageValue) || []
    this.emit("updated", this.data)
    return this.data
  }

  initFinished() {
    this.emit("updated", this.data)
  }
}

export const noteStorage = new Storage("myAwesomeNote")

noteStorage.on("addItem", note => {
  noteStorage.addDataSet(note)
})

noteStorage.on("updated", notes => {
  renderNotes(notes)
})
noteStorage.on("removeItem",
  note => {
    noteStorage.removeDataSet(note)
  });

noteStorage.initFinished();