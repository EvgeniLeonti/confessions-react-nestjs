import * as React from 'react';

import TimeAgo from 'react-timeago'
import en from 'react-timeago/lib/language-strings/en'
import he from 'react-timeago/lib/language-strings/he'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import i18n from "../i18n/i18n";


export default function PrettyTime(props) {
  const {date} = props;

  let lang;

  switch (i18n.language) {
    case 'he':
      lang = he;
      break;
    case 'en':
    default:
      lang = en;
  }

  const formatter = buildFormatter(lang)


  return <TimeAgo date={date} formatter={formatter} />

}
