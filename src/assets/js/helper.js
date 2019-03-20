import {
  noteStorage
} from "./Storage";

// Helper
export const $ = selector => document.querySelector(selector)

export const domElements = {
  addNoteInput: $("#add-note"),
  addNoteButton: $("#add-note-button"),
  noteContainer: $("#notes"),
  // noteDiv: $(".note")
  noteDiv: null
}
const titleOfPage = "QWEDF - Your friendly next door supermarket ";
const defaultEntry = "Need to go shopping? Write down, what you need, so you don't forget, Silly";
document.querySelector("label").textContent = titleOfPage;
document.querySelector("#add-note").placeholder = defaultEntry;

export const renderNotes = notes => {
  domElements.noteContainer.innerHTML = notes
    .map((note, index) => {
      let turnAround = Math.floor(10 * Math.random() - 5) + "deg";
      // let topicPicPath = $(".reminderPicture").style.background - image = `url("https://source.unsplash.com/random?beer")`
      // console.log(topicPicPath);
      // console.log($(".reminderPicture img").src);
      console.log(turnAround);
      return `
        <div class="note col-lg-4" id="${index}" title="Click here to delete entry" style="transform:rotate(${turnAround})">
          ${note}
        </div>
      `
    })
    .join("")
  // Only if I have the  notes I can  target them
  domElements.noteDiv = document.querySelectorAll(".note")
  targetNotes();
}
const targetNotes = () => {
  const noteDiv = document.querySelectorAll(".note");
  if (noteDiv !== null) {
    noteDiv.forEach((oneDiv, index) => {
      oneDiv.addEventListener("click", () => {
        noteStorage.emit("removeItem", oneDiv.id);

      });
    });

  }
};