import { send } from "../utilities";

// בוחר את האלמנטים מהדף ומוודא שהם מאותו סוג (HTMLInputElement)
let usernameInput = document.querySelector("#usernameInput")! as HTMLInputElement;
let passwordInput = document.querySelector("#passwordInput")! as HTMLInputElement;
let signupButton = document.querySelector("#signupButton")! as HTMLInputElement;

// כאשר כפתור ההרשמה נלחץ, הפעולה הבאה מתבצעת
signupButton.onclick = async function () {
    // שולח את שם המשתמש והסיסמא לשרת על מנת לבצע את ההרשמה
    let userId = await send("signup", [usernameInput.value, passwordInput.value]) as string;
    
    // שומר את מזהה המשתמש ב-localStorage למטרה עתידית
    localStorage.setItem("userId", userId);
    
    // מעביר את המשתמש לדף הבית
    location.href = "index.html";
};
