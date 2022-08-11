import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import {AutoSizer, CellMeasurer, CellMeasurerCache, List} from 'react-virtualized';
import InfiniteScroll2 from "./InfiniteScroll2";
import {Confession} from "../types/confession";
import { Container } from '@mui/material';







function InfiniteScroll3(props): JSX.Element {
  const {renderItem, useWindow, useLazyGetQuery, triggerParams, limit, uniqueId, renderNoResults, height} = props;

  const _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 50,
  });

  const list = [
    {
      "id": "cl6o1xjq3000709l8obw9sh3h",
      "createdAt": "2022-08-10T20:16:13.083Z",
      "updatedAt": "2022-08-10T20:16:19.982Z",
      "published": true,
      "title": null,
      "content": "קמת בבוקר והבילבל עומד? כל השאר זה בונוס! 🍆",
      "authorId": "cl63m32uv0000eav2tc34kxc3",
      "language": "he",
      "author": {
        "id": "cl63m32uv0000eav2tc34kxc3",
        "createdAt": "2022-07-27T12:57:13.783Z",
        "updatedAt": "2022-07-27T12:57:13.783Z",
        "email": "brizer2@gmail.com",
        "password": "$2b$10$/K8VhDpQezMoB5HVRHeg2.7j4KkHU2.Ogj8UYE9q18y31XTXXnkM6",
        "firstname": null,
        "lastname": null,
        "role": "ADMIN"
      },
      "commentsCount": 1,
      "reactionsCount": 4
    },
    {
      "id": "cl6o1vsz6000509l8caif06d9",
      "createdAt": "2022-08-10T20:14:51.762Z",
      "updatedAt": "2022-08-10T20:15:01.053Z",
      "published": true,
      "title": null,
      "content": "#20867\nמה הייתם עושים אם הייתם נשואים ופתאום ביום בהיר אחד הייתם פוגשים את הנפש התאומה של הבן/בת זוג שלכם? \nאז קרה לי, אני ובעלי הכרנו את הנפש התאומה שלו. בחורה שהיא והוא זה פשוט זיווג מושלם, אני מסתכלת\nעליהם והם פשוט לא רואים כמה הם מתאימים.\nהחיים גם כל פעם מובילים אותם אחד לשני והם עדיין לא רואים את זה\nואני כמו צלע שלישית מהצד כי אף אחד לא רוצה לפגוע בי , הם מפחדים עליי אז לא עושים אפילו לא חצי צעד.\nמה אני אמורה לעשות? להפסיק עם האגוצנטריות שלי ופשוט לשחרר אותו בתקווה שהוא באמת מצא את האהבה הכי גדולה של החיים שלו?\nלהמשיך להחזיק אותו כדי לא להיות לבד?\nאיך מתמודדים בסיטואציה כזו בכלל? ומה איתי? למה לי אין נפש תאומה גם?",
      "authorId": "cl63m32uv0000eav2tc34kxc3",
      "language": "he",
      "author": {
        "id": "cl63m32uv0000eav2tc34kxc3",
        "createdAt": "2022-07-27T12:57:13.783Z",
        "updatedAt": "2022-07-27T12:57:13.783Z",
        "email": "brizer2@gmail.com",
        "password": "$2b$10$/K8VhDpQezMoB5HVRHeg2.7j4KkHU2.Ogj8UYE9q18y31XTXXnkM6",
        "firstname": null,
        "lastname": null,
        "role": "ADMIN"
      },
      "commentsCount": 0,
      "reactionsCount": 2
    },
    {
      "id": "cl6nwi68q000809mk2a6z2qpb",
      "createdAt": "2022-08-10T17:44:17.690Z",
      "updatedAt": "2022-08-10T19:26:32.975Z",
      "published": true,
      "title": null,
      "content": "נשים, עשו את הצעד הראשון מול גברים אם אתן מעוניינות ותפסיקו עם רמזים דרך הבעות פנים זה ממש מבלבל. \n\nישבתי לפני כמה ימים באחד הבארים וממולי ישבה מישהי שעשתה את הדברים הבאים (לא בהכרח באותו הסדר):\nמבט חודר ישירות לעיניים;\nשיחקה בשיער;\nהסתכלה שוב וחייכה;\nנשכה שפתיים;\nליקקה שפתיים;\nזרקה את השיער אחורה;\nצחקה בקול מבלי סיבה נראית לעין;\nקמה וישבה באותה שנייה;\nשתתה בקבוק מים בשלוק תוך כדי שהיא בוחנת את הסביבה;\nומצמצה מהר מאוד למשך כמה שניות.\n\nהחלטתי לגשת אליה ולפני שהוצאתי מילה היא אמרה ״סוף סוף שמת לב״.\n\nלא היה עדיף לה לגשת להגיד ״היי״ מבלי שאקום אליה כי חשבתי שהיא עוברת אירוע מוחי?\n\nדווקא להיפך, אני חושב שהייתי מעריך אותה יותר על האומץ.",
      "authorId": null,
      "language": "he",
      "author": null,
      "commentsCount": 0,
      "reactionsCount": 0
    },
    {
      "id": "cl6nwhim1000609mk31zl41yd",
      "createdAt": "2022-08-10T17:43:47.065Z",
      "updatedAt": "2022-08-10T19:26:37.964Z",
      "published": true,
      "title": null,
      "content": "האם היית יוצאת עם גבר בן 33 שנמצא בין עבודות ובלי השכלה? אני נראה טוב, מצחיק, אופי טוב, ערכים ואני בטוח שאין לי מה \"למכור\" לבת הזוג העתידית...\nאני כבר חודשיים בדיכאון וחרדות, מאז היומולדת שקיבלתי כאפה על החיים.. שכבתי עם מעל 200 נשים כי הייתי בטוח שאלו החיים הטובים, מעולם לא הייתי בזוגיות ולא הבנתי כמה אני זקוק לזה. על הדרך ניסיתי להקים סטארטאפ שנכשל.\nהייתי מר ביטחון שבטוח שכולן רוצות אותו ובשניה הפכתי לסמרטוט שאובססיבי לזוגיות ומרגיש לא שווה.\nאז ניהלתי בעבר, ויש דירה על שמי, ויש לי מוצר שאני עובד עליו, הרצאה שאני כותב על סיפור חיי ותמיד שואף גבוה.. ועדיין.. אני כרגע בדיכאון, בלי זוגיות ובלי ביטחון כלכלי או תעסקותי. אני זקוק לזוגיות טובה שתרים אותי לטרוף את העולם שוב, כי כרגע אני נטול אנרגיות..\nאז לשאלתי, הייתן יוצאות עם גבר רק על סמך אופי וחיבור למרות שהוא בלי השכלה והוא כרגע לא מצליח במיוחד? אני אשכרה בדיכאון מזה שהתעוררתי מאוחר לזוגיות ושאני מרגיש לא ראוי..",
      "authorId": null,
      "language": "he",
      "author": null,
      "commentsCount": 0,
      "reactionsCount": 0
    },
    {
      "id": "cl6nwhigw000409mk61zdqdg4",
      "createdAt": "2022-08-10T17:43:46.880Z",
      "updatedAt": "2022-08-10T19:26:29.694Z",
      "published": true,
      "title": null,
      "content": "האם היית יוצאת עם גבר בן 33 שנמצא בין עבודות ובלי השכלה? אני נראה טוב, מצחיק, אופי טוב, ערכים ואני בטוח שאין לי מה \"למכור\" לבת הזוג העתידית...\nאני כבר חודשיים בדיכאון וחרדות, מאז היומולדת שקיבלתי כאפה על החיים.. שכבתי עם מעל 200 נשים כי הייתי בטוח שאלו החיים הטובים, מעולם לא הייתי בזוגיות ולא הבנתי כמה אני זקוק לזה. על הדרך ניסיתי להקים סטארטאפ שנכשל.\nהייתי מר ביטחון שבטוח שכולן רוצות אותו ובשניה הפכתי לסמרטוט שאובססיבי לזוגיות ומרגיש לא שווה.\nאז ניהלתי בעבר, ויש דירה על שמי, ויש לי מוצר שאני עובד עליו, הרצאה שאני כותב על סיפור חיי ותמיד שואף גבוה.. ועדיין.. אני כרגע בדיכאון, בלי זוגיות ובלי ביטחון כלכלי או תעסקותי. אני זקוק לזוגיות טובה שתרים אותי לטרוף את העולם שוב, כי כרגע אני נטול אנרגיות..\nאז לשאלתי, הייתן יוצאות עם גבר רק על סמך אופי וחיבור למרות שהוא בלי השכלה והוא כרגע לא מצליח במיוחד? אני אשכרה בדיכאון מזה שהתעוררתי מאוחר לזוגיות ושאני מרגיש לא ראוי..",
      "authorId": null,
      "language": "he",
      "author": null,
      "commentsCount": 0,
      "reactionsCount": 0
    },
    {
      "id": "cl6o1xjq3000709l8obw9sh3h",
      "createdAt": "2022-08-10T20:16:13.083Z",
      "updatedAt": "2022-08-10T20:16:19.982Z",
      "published": true,
      "title": null,
      "content": "קמת בבוקר והבילבל עומד? כל השאר זה בונוס! 🍆",
      "authorId": "cl63m32uv0000eav2tc34kxc3",
      "language": "he",
      "author": {
        "id": "cl63m32uv0000eav2tc34kxc3",
        "createdAt": "2022-07-27T12:57:13.783Z",
        "updatedAt": "2022-07-27T12:57:13.783Z",
        "email": "brizer2@gmail.com",
        "password": "$2b$10$/K8VhDpQezMoB5HVRHeg2.7j4KkHU2.Ogj8UYE9q18y31XTXXnkM6",
        "firstname": null,
        "lastname": null,
        "role": "ADMIN"
      },
      "commentsCount": 1,
      "reactionsCount": 4
    },
    {
      "id": "cl6o1vsz6000509l8caif06d9",
      "createdAt": "2022-08-10T20:14:51.762Z",
      "updatedAt": "2022-08-10T20:15:01.053Z",
      "published": true,
      "title": null,
      "content": "#20867\nמה הייתם עושים אם הייתם נשואים ופתאום ביום בהיר אחד הייתם פוגשים את הנפש התאומה של הבן/בת זוג שלכם? \nאז קרה לי, אני ובעלי הכרנו את הנפש התאומה שלו. בחורה שהיא והוא זה פשוט זיווג מושלם, אני מסתכלת\nעליהם והם פשוט לא רואים כמה הם מתאימים.\nהחיים גם כל פעם מובילים אותם אחד לשני והם עדיין לא רואים את זה\nואני כמו צלע שלישית מהצד כי אף אחד לא רוצה לפגוע בי , הם מפחדים עליי אז לא עושים אפילו לא חצי צעד.\nמה אני אמורה לעשות? להפסיק עם האגוצנטריות שלי ופשוט לשחרר אותו בתקווה שהוא באמת מצא את האהבה הכי גדולה של החיים שלו?\nלהמשיך להחזיק אותו כדי לא להיות לבד?\nאיך מתמודדים בסיטואציה כזו בכלל? ומה איתי? למה לי אין נפש תאומה גם?",
      "authorId": "cl63m32uv0000eav2tc34kxc3",
      "language": "he",
      "author": {
        "id": "cl63m32uv0000eav2tc34kxc3",
        "createdAt": "2022-07-27T12:57:13.783Z",
        "updatedAt": "2022-07-27T12:57:13.783Z",
        "email": "brizer2@gmail.com",
        "password": "$2b$10$/K8VhDpQezMoB5HVRHeg2.7j4KkHU2.Ogj8UYE9q18y31XTXXnkM6",
        "firstname": null,
        "lastname": null,
        "role": "ADMIN"
      },
      "commentsCount": 0,
      "reactionsCount": 2
    },
    {
      "id": "cl6nwi68q000809mk2a6z2qpb",
      "createdAt": "2022-08-10T17:44:17.690Z",
      "updatedAt": "2022-08-10T19:26:32.975Z",
      "published": true,
      "title": null,
      "content": "נשים, עשו את הצעד הראשון מול גברים אם אתן מעוניינות ותפסיקו עם רמזים דרך הבעות פנים זה ממש מבלבל. \n\nישבתי לפני כמה ימים באחד הבארים וממולי ישבה מישהי שעשתה את הדברים הבאים (לא בהכרח באותו הסדר):\nמבט חודר ישירות לעיניים;\nשיחקה בשיער;\nהסתכלה שוב וחייכה;\nנשכה שפתיים;\nליקקה שפתיים;\nזרקה את השיער אחורה;\nצחקה בקול מבלי סיבה נראית לעין;\nקמה וישבה באותה שנייה;\nשתתה בקבוק מים בשלוק תוך כדי שהיא בוחנת את הסביבה;\nומצמצה מהר מאוד למשך כמה שניות.\n\nהחלטתי לגשת אליה ולפני שהוצאתי מילה היא אמרה ״סוף סוף שמת לב״.\n\nלא היה עדיף לה לגשת להגיד ״היי״ מבלי שאקום אליה כי חשבתי שהיא עוברת אירוע מוחי?\n\nדווקא להיפך, אני חושב שהייתי מעריך אותה יותר על האומץ.",
      "authorId": null,
      "language": "he",
      "author": null,
      "commentsCount": 0,
      "reactionsCount": 0
    },
    {
      "id": "cl6nwhim1000609mk31zl41yd",
      "createdAt": "2022-08-10T17:43:47.065Z",
      "updatedAt": "2022-08-10T19:26:37.964Z",
      "published": true,
      "title": null,
      "content": "האם היית יוצאת עם גבר בן 33 שנמצא בין עבודות ובלי השכלה? אני נראה טוב, מצחיק, אופי טוב, ערכים ואני בטוח שאין לי מה \"למכור\" לבת הזוג העתידית...\nאני כבר חודשיים בדיכאון וחרדות, מאז היומולדת שקיבלתי כאפה על החיים.. שכבתי עם מעל 200 נשים כי הייתי בטוח שאלו החיים הטובים, מעולם לא הייתי בזוגיות ולא הבנתי כמה אני זקוק לזה. על הדרך ניסיתי להקים סטארטאפ שנכשל.\nהייתי מר ביטחון שבטוח שכולן רוצות אותו ובשניה הפכתי לסמרטוט שאובססיבי לזוגיות ומרגיש לא שווה.\nאז ניהלתי בעבר, ויש דירה על שמי, ויש לי מוצר שאני עובד עליו, הרצאה שאני כותב על סיפור חיי ותמיד שואף גבוה.. ועדיין.. אני כרגע בדיכאון, בלי זוגיות ובלי ביטחון כלכלי או תעסקותי. אני זקוק לזוגיות טובה שתרים אותי לטרוף את העולם שוב, כי כרגע אני נטול אנרגיות..\nאז לשאלתי, הייתן יוצאות עם גבר רק על סמך אופי וחיבור למרות שהוא בלי השכלה והוא כרגע לא מצליח במיוחד? אני אשכרה בדיכאון מזה שהתעוררתי מאוחר לזוגיות ושאני מרגיש לא ראוי..",
      "authorId": null,
      "language": "he",
      "author": null,
      "commentsCount": 0,
      "reactionsCount": 0
    },
    {
      "id": "cl6nwhigw000409mk61zdqdg4",
      "createdAt": "2022-08-10T17:43:46.880Z",
      "updatedAt": "2022-08-10T19:26:29.694Z",
      "published": true,
      "title": null,
      "content": "האם היית יוצאת עם גבר בן 33 שנמצא בין עבודות ובלי השכלה? אני נראה טוב, מצחיק, אופי טוב, ערכים ואני בטוח שאין לי מה \"למכור\" לבת הזוג העתידית...\nאני כבר חודשיים בדיכאון וחרדות, מאז היומולדת שקיבלתי כאפה על החיים.. שכבתי עם מעל 200 נשים כי הייתי בטוח שאלו החיים הטובים, מעולם לא הייתי בזוגיות ולא הבנתי כמה אני זקוק לזה. על הדרך ניסיתי להקים סטארטאפ שנכשל.\nהייתי מר ביטחון שבטוח שכולן רוצות אותו ובשניה הפכתי לסמרטוט שאובססיבי לזוגיות ומרגיש לא שווה.\nאז ניהלתי בעבר, ויש דירה על שמי, ויש לי מוצר שאני עובד עליו, הרצאה שאני כותב על סיפור חיי ותמיד שואף גבוה.. ועדיין.. אני כרגע בדיכאון, בלי זוגיות ובלי ביטחון כלכלי או תעסקותי. אני זקוק לזוגיות טובה שתרים אותי לטרוף את העולם שוב, כי כרגע אני נטול אנרגיות..\nאז לשאלתי, הייתן יוצאות עם גבר רק על סמך אופי וחיבור למרות שהוא בלי השכלה והוא כרגע לא מצליח במיוחד? אני אשכרה בדיכאון מזה שהתעוררתי מאוחר לזוגיות ושאני מרגיש לא ראוי..",
      "authorId": null,
      "language": "he",
      "author": null,
      "commentsCount": 0,
      "reactionsCount": 0
    },
    {
      "id": "cl6o1xjq3000709l8obw9sh3h",
      "createdAt": "2022-08-10T20:16:13.083Z",
      "updatedAt": "2022-08-10T20:16:19.982Z",
      "published": true,
      "title": null,
      "content": "קמת בבוקר והבילבל עומד? כל השאר זה בונוס! 🍆",
      "authorId": "cl63m32uv0000eav2tc34kxc3",
      "language": "he",
      "author": {
        "id": "cl63m32uv0000eav2tc34kxc3",
        "createdAt": "2022-07-27T12:57:13.783Z",
        "updatedAt": "2022-07-27T12:57:13.783Z",
        "email": "brizer2@gmail.com",
        "password": "$2b$10$/K8VhDpQezMoB5HVRHeg2.7j4KkHU2.Ogj8UYE9q18y31XTXXnkM6",
        "firstname": null,
        "lastname": null,
        "role": "ADMIN"
      },
      "commentsCount": 1,
      "reactionsCount": 4
    },
    {
      "id": "cl6o1vsz6000509l8caif06d9",
      "createdAt": "2022-08-10T20:14:51.762Z",
      "updatedAt": "2022-08-10T20:15:01.053Z",
      "published": true,
      "title": null,
      "content": "#20867\nמה הייתם עושים אם הייתם נשואים ופתאום ביום בהיר אחד הייתם פוגשים את הנפש התאומה של הבן/בת זוג שלכם? \nאז קרה לי, אני ובעלי הכרנו את הנפש התאומה שלו. בחורה שהיא והוא זה פשוט זיווג מושלם, אני מסתכלת\nעליהם והם פשוט לא רואים כמה הם מתאימים.\nהחיים גם כל פעם מובילים אותם אחד לשני והם עדיין לא רואים את זה\nואני כמו צלע שלישית מהצד כי אף אחד לא רוצה לפגוע בי , הם מפחדים עליי אז לא עושים אפילו לא חצי צעד.\nמה אני אמורה לעשות? להפסיק עם האגוצנטריות שלי ופשוט לשחרר אותו בתקווה שהוא באמת מצא את האהבה הכי גדולה של החיים שלו?\nלהמשיך להחזיק אותו כדי לא להיות לבד?\nאיך מתמודדים בסיטואציה כזו בכלל? ומה איתי? למה לי אין נפש תאומה גם?",
      "authorId": "cl63m32uv0000eav2tc34kxc3",
      "language": "he",
      "author": {
        "id": "cl63m32uv0000eav2tc34kxc3",
        "createdAt": "2022-07-27T12:57:13.783Z",
        "updatedAt": "2022-07-27T12:57:13.783Z",
        "email": "brizer2@gmail.com",
        "password": "$2b$10$/K8VhDpQezMoB5HVRHeg2.7j4KkHU2.Ogj8UYE9q18y31XTXXnkM6",
        "firstname": null,
        "lastname": null,
        "role": "ADMIN"
      },
      "commentsCount": 0,
      "reactionsCount": 2
    },
    {
      "id": "cl6nwi68q000809mk2a6z2qpb",
      "createdAt": "2022-08-10T17:44:17.690Z",
      "updatedAt": "2022-08-10T19:26:32.975Z",
      "published": true,
      "title": null,
      "content": "נשים, עשו את הצעד הראשון מול גברים אם אתן מעוניינות ותפסיקו עם רמזים דרך הבעות פנים זה ממש מבלבל. \n\nישבתי לפני כמה ימים באחד הבארים וממולי ישבה מישהי שעשתה את הדברים הבאים (לא בהכרח באותו הסדר):\nמבט חודר ישירות לעיניים;\nשיחקה בשיער;\nהסתכלה שוב וחייכה;\nנשכה שפתיים;\nליקקה שפתיים;\nזרקה את השיער אחורה;\nצחקה בקול מבלי סיבה נראית לעין;\nקמה וישבה באותה שנייה;\nשתתה בקבוק מים בשלוק תוך כדי שהיא בוחנת את הסביבה;\nומצמצה מהר מאוד למשך כמה שניות.\n\nהחלטתי לגשת אליה ולפני שהוצאתי מילה היא אמרה ״סוף סוף שמת לב״.\n\nלא היה עדיף לה לגשת להגיד ״היי״ מבלי שאקום אליה כי חשבתי שהיא עוברת אירוע מוחי?\n\nדווקא להיפך, אני חושב שהייתי מעריך אותה יותר על האומץ.",
      "authorId": null,
      "language": "he",
      "author": null,
      "commentsCount": 0,
      "reactionsCount": 0
    },
    {
      "id": "cl6nwhim1000609mk31zl41yd",
      "createdAt": "2022-08-10T17:43:47.065Z",
      "updatedAt": "2022-08-10T19:26:37.964Z",
      "published": true,
      "title": null,
      "content": "האם היית יוצאת עם גבר בן 33 שנמצא בין עבודות ובלי השכלה? אני נראה טוב, מצחיק, אופי טוב, ערכים ואני בטוח שאין לי מה \"למכור\" לבת הזוג העתידית...\nאני כבר חודשיים בדיכאון וחרדות, מאז היומולדת שקיבלתי כאפה על החיים.. שכבתי עם מעל 200 נשים כי הייתי בטוח שאלו החיים הטובים, מעולם לא הייתי בזוגיות ולא הבנתי כמה אני זקוק לזה. על הדרך ניסיתי להקים סטארטאפ שנכשל.\nהייתי מר ביטחון שבטוח שכולן רוצות אותו ובשניה הפכתי לסמרטוט שאובססיבי לזוגיות ומרגיש לא שווה.\nאז ניהלתי בעבר, ויש דירה על שמי, ויש לי מוצר שאני עובד עליו, הרצאה שאני כותב על סיפור חיי ותמיד שואף גבוה.. ועדיין.. אני כרגע בדיכאון, בלי זוגיות ובלי ביטחון כלכלי או תעסקותי. אני זקוק לזוגיות טובה שתרים אותי לטרוף את העולם שוב, כי כרגע אני נטול אנרגיות..\nאז לשאלתי, הייתן יוצאות עם גבר רק על סמך אופי וחיבור למרות שהוא בלי השכלה והוא כרגע לא מצליח במיוחד? אני אשכרה בדיכאון מזה שהתעוררתי מאוחר לזוגיות ושאני מרגיש לא ראוי..",
      "authorId": null,
      "language": "he",
      "author": null,
      "commentsCount": 0,
      "reactionsCount": 0
    },
    {
      "id": "cl6nwhigw000409mk61zdqdg4",
      "createdAt": "2022-08-10T17:43:46.880Z",
      "updatedAt": "2022-08-10T19:26:29.694Z",
      "published": true,
      "title": null,
      "content": "האם היית יוצאת עם גבר בן 33 שנמצא בין עבודות ובלי השכלה? אני נראה טוב, מצחיק, אופי טוב, ערכים ואני בטוח שאין לי מה \"למכור\" לבת הזוג העתידית...\nאני כבר חודשיים בדיכאון וחרדות, מאז היומולדת שקיבלתי כאפה על החיים.. שכבתי עם מעל 200 נשים כי הייתי בטוח שאלו החיים הטובים, מעולם לא הייתי בזוגיות ולא הבנתי כמה אני זקוק לזה. על הדרך ניסיתי להקים סטארטאפ שנכשל.\nהייתי מר ביטחון שבטוח שכולן רוצות אותו ובשניה הפכתי לסמרטוט שאובססיבי לזוגיות ומרגיש לא שווה.\nאז ניהלתי בעבר, ויש דירה על שמי, ויש לי מוצר שאני עובד עליו, הרצאה שאני כותב על סיפור חיי ותמיד שואף גבוה.. ועדיין.. אני כרגע בדיכאון, בלי זוגיות ובלי ביטחון כלכלי או תעסקותי. אני זקוק לזוגיות טובה שתרים אותי לטרוף את העולם שוב, כי כרגע אני נטול אנרגיות..\nאז לשאלתי, הייתן יוצאות עם גבר רק על סמך אופי וחיבור למרות שהוא בלי השכלה והוא כרגע לא מצליח במיוחד? אני אשכרה בדיכאון מזה שהתעוררתי מאוחר לזוגיות ושאני מרגיש לא ראוי..",
      "authorId": null,
      "language": "he",
      "author": null,
      "commentsCount": 0,
      "reactionsCount": 0
    },
  ];

  const rowRenderer = ({index, key, parent, style}) => {
    const datum = list[index];

    return (
      <CellMeasurer
        cache={_cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}>
        {({measure, registerChild}) => (
          <div ref={registerChild} style={style}>
            {datum && renderItem(datum)}
          </div>
        )}
      </CellMeasurer>
    );
  }


  return (
    // <Container
    //   sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(10) }}
    //   maxWidth="sm"
    //   style={{width:'100%', backgroundColor: 'green'}}
    // >
      <AutoSizer id="auto-sizer">

        {({width}) => (
          <div style={{width}}>
            <List
              deferredMeasurementCache={_cache}
              height={400}
              overscanRowCount={0}
              rowCount={45}
              rowHeight={_cache.rowHeight}
              rowRenderer={rowRenderer}
              width={width}
            />

          </div>
        )}
      </AutoSizer>

    // </Container>
  );

}

export default InfiniteScroll3;
export type InfiniteScroll3 = typeof InfiniteScroll3;
