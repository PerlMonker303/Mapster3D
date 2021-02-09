
export const loadFile = (event) => {
    // redundant, done in App.js
    console.log("Loaded");
    const data = JSON.parse(localStorage.getItem("save"));
    console.log(data);
    //console.log(event.target.files[0]);
}