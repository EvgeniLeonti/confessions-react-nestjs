/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import Typography from "@mui/material/Typography";
function ConfessionContent({text}: {text: string}): JSX.Element {

  return (
    <>
      {text && text.split("\n").map((line: string) => <Typography variant="body1" gutterBottom component="div">{line}</Typography>)}
    </>
  );
}

export default ConfessionContent;
export type ConfessionContent = typeof ConfessionContent;
