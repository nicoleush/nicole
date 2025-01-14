let signupButton = document.querySelector("#signupButton") as HTMLButtonElement;  // כפתור הרשמה
let loginButton = document.querySelector("#loginButton") as HTMLButtonElement;    // כפתור התחברות
let r1 = document.querySelector("#r1") as HTMLButtonElement;  // כפתור דירוג 1
let r2 = document.querySelector("#r2") as HTMLButtonElement;  // כפתור דירוג 2
let r3 = document.querySelector("#r3") as HTMLButtonElement;  // כפתור דירוג 3
let r4 = document.querySelector("#r4") as HTMLButtonElement;  // כפתור דירוג 4
let r5 = document.querySelector("#r5") as HTMLButtonElement;  // כפתור דירוג 5
let r6 = document.querySelector("#r6") as HTMLButtonElement;  // כפתור דירוג 6

// הפניית המשתמש לדף ההרשמה כאשר לוחצים על כפתור ההרשמה
signupButton.onclick = function() {
    location.href = "signup.html";
}

// הפניית המשתמש לדף ההתחברות כאשר לוחצים על כפתור ההתחברות
loginButton.onclick = function() {
    location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    // איסוף כל כפתורי הדירוג בעזרת querySelectorAll
    const ratingButtons = document.querySelectorAll('.rating-btn') as NodeListOf<HTMLButtonElement>;
    
    // פונקציה לטעינת הדירוגים ששמרנו ב-localStorage
    function loadRatings() {
        // עבור כל מאמר (במקרה הזה, 2 מאמרים)
        for (let i = 1; i <= 2; i++) {
            // נטען את הדירוגים ששמרנו במקומי ב-localStorage
            const ratings = JSON.parse(localStorage.getItem(`ratings-article-${i}`) || '[]');
            const average = calculateAverage(ratings);  // חישוב הדירוג הממוצע
            const avgElement = document.getElementById(`rating-avg-${i}`);  // אלמנט בו יוצג הדירוג הממוצע
            if (avgElement) {
                // הצגת הדירוג הממוצע עם 2 ספרות אחרי הנקודה, אם אין דירוגים מוצג "N/A"
                avgElement.textContent = `Average Rating: ${isNaN(average) ? 'N/A' : average.toFixed(2)}`;
            }
        }
    }

    // פונקציה לחישוב הדירוג הממוצע של מאמר
    function calculateAverage(ratings: number[]): number {
        const sum = ratings.reduce((a, b) => a + b, 0);  // חישוב סכום הדירוגים
        return ratings.length > 0 ? sum / ratings.length : NaN;  // חישוב ממוצע הדירוגים, אם אין דירוגים מחזירים NaN
    }

    // הוספת אירועים לכל כפתורי הדירוג
    ratingButtons.forEach(button => {
        button.addEventListener('click', function () {
            const articleId = this.getAttribute('data-article');  // קבלת מזהה המאמר
            const ratingValue = parseInt(this.getAttribute('data-rating') || '0');  // קבלת הדירוג שנבחר

            if (articleId) {
                // נטען את הדירוגים עבור המאמר הספציפי
                const ratings = JSON.parse(localStorage.getItem(`ratings-article-${articleId}`) || '[]');
                ratings.push(ratingValue);  // הוספת הדירוג החדש למערך הדירוגים
                localStorage.setItem(`ratings-article-${articleId}`, JSON.stringify(ratings));  // שמירת הדירוגים ב-localStorage
                loadRatings();  // טוענים מחדש את הדירוגים
            }
        });
    });

    loadRatings();  // טעינה ראשונית של הדירוגים ברגע שהדף נטען
});
