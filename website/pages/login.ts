import { send } from "../utilities"  // מייבא את הפונקציה send מקובץ utilities

// מקבל את שדות הקלט עבור שם משתמש וסיסמה, ומוודא שהן לא null או undefined
let usernameInput = document.querySelector("#usernameInput")! as HTMLInputElement;  // שדה קלט שם משתמש
let passwordInput = document.querySelector("#passwordInput")! as HTMLInputElement;  // שדה קלט סיסמה
let loginbutton = document.querySelector("#loginButton")! as HTMLInputElement;  // כפתור התחברות

// כאשר נלחץ כפתור ההתחברות
loginbutton.onclick = async function () {
    // שולח את שם המשתמש והסיסמה לפונקציית ה-send וממתין לתוצאה
    let userId = await send("login", [usernameInput.value, passwordInput.value]) as string | null;

    // אם קיבלנו מזהה משתמש לא null
    if (userId != null){
        localStorage.setItem("userId", userId);  // שומר את מזהה המשתמש ב-localStorage
        location.href ="index.html";  // מעביר את המשתמש לדף הבית
    }
}
