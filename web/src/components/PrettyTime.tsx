import * as React from 'react';

import TimeAgo from 'react-timeago'
import he from 'react-timeago/lib/language-strings/he'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'


export default function PrettyTime(props) {
  const {date} = props;

  const formatter = buildFormatter(he)


  return <TimeAgo date={date} formatter={formatter} />

}
