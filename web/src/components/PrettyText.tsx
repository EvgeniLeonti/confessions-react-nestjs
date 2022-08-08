import Typography from "@mui/material/Typography";

interface Props {
  text: string;
  variant?: string;
  component?: string;
  query?: string;
}

function PrettyText(props: Props): JSX.Element {
  const {text, variant, component, query} = props;
  // todo hightlight query
  const typographyComponents = text ? text.split("\n").map((line: string, index  ) =>
    <Typography key={`${line.replace(' ', '').substring(0, 30)}-${index}`} variant={variant || "body1"} component={component || "div"} gutterBottom>{line}</Typography>)
   : [];

  return (
    <>
      {typographyComponents}
    </>
  );
}

export default PrettyText;
export type ConfessionContent = typeof PrettyText;
