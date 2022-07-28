import {useEffect, useState} from 'react'
import './App.css'
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "./Card";

function App() {
    const posts = [
        {
            content: `עד כמה אני פתטית?

יש איזשהו ג׳קט שהוא ממש אהב, ראינו אותו לפני חצי שנה באיזשהי סדרה וחיפשנו מלא זמן משהו דומה ולא מצאנו כלום ..

שאלתי את סבתא שלי כמה קשה לתפור אותו לבד והתחלתי לברר וללמוד את הגזרה והכל
נסעתי שעה וחצי כדי לקנות את הבד אחרי שחיפשתי בכמה מקומות ולא היה
שבועות עד שיצא מושלם (בכל זאת, פריט ראשון שתפרתי לבד)
תכננתי להכין לו ארוחת ערב משוקעת (אפילו הדפסתי תפריט) לכבוד יום האהבה ולהביא לו בסוף את הגקט
אבל הוא נפרד ממני. אמר שבחיים לא אהב אותי ושהוא מצטער שככה הוליך אןתי שולל.
בכיתי והוא פשוט הלך מבלי להביט לאחור.
אז ניצחתי?
יום האהבה שמח חברים. אל תתאהבו לא שווה את זה.`
        },
        {
            content: `נמאס לי מלהיות שמאלי בעולם של ימינים. השפה בנויה בצורה שמוציאה אותנו רע (קם על רגל שמאל, שני ידיים שמאליות) בזמן שאתם 'צודקים' (right) כל הכלים בנויים עבורכם, אם יש כלים מותאמים ליד שמאל אז זה בדרך כלל מוצרים נבחרים, שיקרים יותר ובאיכות פחותה. הרבה אנשים לא מבינים למה אני מתעצבן על משהו שלא מותאם ליד ימין ולא קולטים שזה לא רק המוצר הספציפי, אלא הכל. תסתכלו על הפלאפון שלכם איפה כפתורי הנעילה ועוצמת קול? תחפשו עכברים ארגונומים איכותיים ותראו שרובם קיימים רק ליד ימין ואלו שזמינים לשמאליים עולים יותר. מצלמות כלי נגינה כלי עבודה. זה נורא מעצבן כשכמעט כל דבר שאתה אוחז בו מהונדס בכוונה בצורה שמעדיפה קבוצה מסויימת של אנשים ומזכיר לך שאתה לא בקבוצה הזאת אלא האחרת.
`
        },
        {
            content: `אני הולך לרשום משהו שיחשב בעיני המון דיי רדוד ואף מגעיל אבל מקווה שזה יפורסם בכל זאת.

אני רזה, אפילו מאוד. על גבול ה bmi וכנל גם המשפחה שלי (גרעינית ומורחבת) ואני לא מצליח לפתח משיכה מינית לבנות מלאות+.

זה דיי מתסכל ולא נעים לדחות מישהי ככ נחמדה ומגניבה בגלל שהיא מלאה, אבל עם כל הרצון לא לצאת מגעיל, אני לא מרגיש משיכה....`
        }
    ];

    const [count, setCount] = useState(0)
    const [swipeable, setSwipeable] = useState(true);

    const carouselSettings = {
        showArrows: false,
        interval: 3500,
        dynamicHeight: false,
        stopOnHover: false,
        infiniteLoop: true,
        showStatus: false,
        transitionTime: 500,
        showThumbs: false,
        showIndicators: false,
        swipeable,
        emulateTouch: true,
        autoPlay: false,
        // axis: 'vertical',
        // verticalSwipe: 'natural',
        preventMovementUntilSwipeScrollTolerance: true,
        swipeScrollTolerance: 50, // todo 1/3 of user height

        // onSwipeStart: (event) => {
        //     console.log('onSwipeStart', event);
        //     // event.preventDefault();
        // },
        // onSwipeEnd: (event) => {
        //     console.log('onSwipeEnd', event);
        // },


    };

    // useEffect(() => {
    //     console.log('swipeable', swipeable)
    // }, [swipeable])

    return (
        <div className="h-full w-full">
            <Carousel {...carouselSettings}>
                {posts.map((post, index) =>
                    <div key={`post-${index}`} className="m-auto w-4/5 h-full">
                        <Card content={post.content}/>
                    </div>)}
            </Carousel>


        </div>
    )
}

export default App
