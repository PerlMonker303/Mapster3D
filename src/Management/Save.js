export const saveFile = (data, date) => {
    localStorage.setItem("save", data);
    localStorage.setItem("save_date", date);
}