import {string} from "zod";
import GenericForm from "./GenericForm";
import {useCreateConfessionMutation} from "../store/api";
import LANG from "../lang";
import {useHistory} from "../core";

const Confess = () => {
  const history = useHistory();

  return (
    <GenericForm
      useMutation={useCreateConfessionMutation}
      lang={LANG.CONFESSION.SUBMISSION}
      fields={[
        {
          type: 'text', name: 'content', label: 'Content', multiline: true, rows: 8,
          schema: string()
            .nonempty('Content is required')
            .min(5, 'Content too short')
          ,
        },
      ]}
      buildPayload={(input: any) => {
        return {
          content: input.content,
        }
      }}
      onSuccess={(data) => {
        history.push("/");
      }}
    />
  );
};

export default Confess;

