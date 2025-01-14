export async function send(path: string, body: any): Promise<any> {
  // שולח בקשה לשרת עם הנתיב שנמסר והגוף שנמסר (body)
  let response = await fetch(
    `/${path}`, // פונה לנתיב שנמסר כפרמטר
    {
      method: "POST", // צורת הבקשה היא POST
      body: JSON.stringify(body), // ממיר את הגוף (body) לאובייקט JSON לפני שליחתו
      headers: {
        "X-Is-Custom": "true" // שולח כותרת מותאמת אישית עם ערך "true"
      }
    }
  );

  try {
    // ממתין לתגובה מהשרת וממיר אותה לאובייקט JSON
    let obj = await response.json();
    
    // מנסה לשלוף את השדה 'data' מתוך התגובה. אם לא קיים, מחזיר null
    let data = obj.data ?? null;
    
    return data; // מחזיר את הנתונים שהתקבלו אם קיימים
  }
  catch {
    // אם קרתה שגיאה בהמרת התגובה או בנתונים, מחזיר null
    return null;
  }
};
