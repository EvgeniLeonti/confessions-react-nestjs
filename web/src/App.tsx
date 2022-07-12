import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="flex h-screen">
        <div className="m-auto w-4/5 h-4/5">
          <div
              className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4">
              <button id="dropdownButton" data-dropdown-toggle="dropdown"
                      className="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                      type="button">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </button>
              <div id="dropdown"
                   className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                <ul className="py-1" aria-labelledby="dropdownButton">
                  <li>
                    <a href="#"
                       className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                  </li>
                  <li>
                    <a href="#"
                       className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export
                      Data</a>
                  </li>
                  <li>
                    <a href="#"
                       className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center pb-10 h-full">
              <div className="flex h-full">
                <div className="m-auto">
                  <p className="mx-5 my-5 text-2xl">
                    אמלק- אני מתוסכל מינית
                    <br />
                    אשתי בחודש שישי (היריון ראשון שלנו) וכבר בחודש השלישי הרופא אבחן אצלה תסמונת שקשורה למנח הרחם והשליה, לא משהו חלילה מסכן חיים או כואב - אבל הוא המליץ לא לקיים יחסי מין כדי לא לגרום לסיבוכים.
                    <br />
                    כשחשבתי שאצטרך ״להחזיק מעמד״ עד סוף ההיריון, שמעתי מחברים על מקרים שבהם לאישה לא היה חשק גם כמה חודשים אחרי הלידה ואפילו חצי שנה (!) אחרי.
                    <br />
                    אני כבר עכשיו מטפס על הקירות ואני לא יכול לדמיין מצב של בלי סקס עם אשתי למשך שנה, אני פשוט לא יודע איך שורדים דבר כזה, במיוחד בתור זוג שרגיל לסקס בתדירות גבוהה יחסית.
                    <br />
                    ברור שאנחנו קרובים והרבה ביחד ואפשר להגיע לאינטימיות בדרכים אחרות אבל זה ממש חסר לי.
                    <br />
                    זה מביך מדי לחלוק עם חברים וכמובן שהייתי מעדיף לדבר איתה אבל יש לה מספיק דברים לדאוג להם סביב ההיריון ולא הייתי רוצה ״להפיל״ עליה גם את הבעיות שלי, על אחת כמה וכמה שאין ממש פתרונות שאני יכול להציע ואני חושש שהיא תהיה עצובה מזה שאין לה איך לעזור לי.
                    <br />
                    אבל כן הייתי רוצה לדעת איך זה אצל אחרים ומה עושים...
                  </p>
                </div>
              </div>
              {/*<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>*/}
              {/*<span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>*/}
              {/*<div className="flex mt-4 space-x-3 lg:mt-6">*/}
              {/*  <a href="#"*/}
              {/*     className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add*/}
              {/*    friend</a>*/}
              {/*  <a href="#"*/}
              {/*     className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
  )
}

export default App
