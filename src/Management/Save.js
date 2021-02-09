export const saveFile = (data) => {
    localStorage.setItem("save",data);
    console.log("Saved");
}