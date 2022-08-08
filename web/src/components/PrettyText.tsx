import Typography from "@mui/material/Typography";

interface Props {
  text: string;
  variant?: string;
  component?: string;
}

function PrettyText(props: Props): JSX.Element {
  const {text, variant, component} = props;
  return (
    <>
      {text && text.split("\n").map((line: string) =>
        <Typography variant={variant || "body1"} component={component || "div"} gutterBottom>{line}</Typography>)
      }
    </>
  );
}

export default PrettyText;
export type ConfessionContent = typeof PrettyText;
