import Typography from "@mui/material/Typography";
import {Confession} from "../../types/confession";

interface Props {
  confession: Confession;
}

function ConfessionContent(props: Props): JSX.Element {
  const text = props?.confession?.content;
  return (
    <>
      {text && text.split("\n").map((line: string) => <Typography variant="body1" gutterBottom component="div">{line}</Typography>)}
    </>
  );
}

export default ConfessionContent;
export type ConfessionContent = typeof ConfessionContent;
