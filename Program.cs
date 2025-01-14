using System.Reflection.Metadata;

class Program
{
  static void Main()
  {
    // מערך של משתמשים, כרגע הוא ריק
    User[] users = [];

    // יצירת אובייקט Server והגדרת פורט
    int port = 5000;

    // יצירת שרת חדש על הפורט הנתון
    var server = new Server(port);

    Console.WriteLine("The server is running");
    // הצגת כתובת האתר הראשי של השרת
    Console.WriteLine($"Main Page: http://localhost:{port}/website/pages/index.html");

    // לולאת חיכוי לבקשות מהלקוחות
    while (true)
    {
      // ממתין לבקשה מהלקוח ומקבל גם את התגובה
      (var request, var response) = server.WaitForRequest();

      // מציג את נתיב הבקשה שהתקבלה
      Console.WriteLine($"Recieved a request with the path: {request.Path}");

      // אם קיים קובץ על הנתיב שנשלח, שולחים את הקובץ חזרה ללקוח
      if (File.Exists(request.Path))
      {
        var file = new File(request.Path);
        response.Send(file);
      }
      // אם הבקשה מצפה לדף HTML ומעלה, שולחים דף 404
      else if (request.ExpectsHtml())
      {
        var file = new File("website/pages/404.html");
        response.SetStatusCode(404);  // קוד סטטוס 404 - לא נמצא
        response.Send(file);
      }
      else
      {
        try
        {
          // אם הנתיב הוא "signup" (הרשמה), מטפל בהרשמה של משתמשים חדשים
          if (request.Path == "signup")
          {
            // מקבל את פרטי המשתמש (שם משתמש וסיסמא) מתוך גוף הבקשה
            (string username, string password) = request.GetBody<(string, string)>();
            string userId = Guid.NewGuid().ToString();  // יצירת מזהה ייחודי למשתמש
            // מוסיף את המשתמש החדש למערך המשתמשים
            users = [.. users, new User(username, password, userId)];
            // שולח את מזהה המשתמש חזרה ללקוח
            response.Send(userId);
          }
          // אם הנתיב הוא "login" (התחברות), מטפל בהתחברות של משתמשים
          if (request.Path == "login")
          {
            // מקבל את פרטי המשתמש (שם משתמש וסיסמא) מתוך גוף הבקשה
            (string username, string password) = request.GetBody<(string, string)>();
            string? userId = null;  // ברירת מחדל של null למזהה
            // מחפש את המשתמש במערך המשתמשים
            for (int i = 0; i < users.Length; i++)
            {
              // אם נמצא התאמה בין שם המשתמש והסיסמא
              if (username == users[i].username && password == users[i].password)
              {
                userId = users[i].id;  // מחזיר את המזהה של המשתמש
                Console.WriteLine("id: " + userId);
              }
            }
            // שולח את מזהה המשתמש או null אם לא נמצא
            response.Send(userId);
          }

          // אם הנתיב לא תואם אף אחד מהתנאים, שולח קוד שגיאה 405 (שיטה לא מורשית)
          response.SetStatusCode(405);
        }
        catch (Exception exception)
        {
          // לוג של שגיאה אם קרתה
          Log.WriteException(exception);
        }
      }

      // סגירת התגובה לאחר סיום טיפול בבקשה
      response.Close();
    }
  }
}

// מחלקה שמייצגת משתמש
class User
{
  public string username;
  public string password;
  public string id;

  // בנאי שמאתחל את מאפייני המשתמש
  public User(string username, string password, string id)
  {
    this.username = username;
    this.password = password;
    this.id = id;
  }
}
