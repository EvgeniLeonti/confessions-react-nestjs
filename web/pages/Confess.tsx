import {string} from "zod";
import GenericForm from "./GenericForm";
import {useCreateConfessionMutation} from "../store/api";
import LANG from "../lang";
import {useHistory} from "../core";
import {useTranslation} from "react-i18next";

const Confess = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <GenericForm
      useMutation={useCreateConfessionMutation}
      lang={{
        TITLE: t('confession.submission.title'),
        SUCCESS: t('confession.submission.success'),
        FAILURE: t('confession.submission.failure'),
        SUBMIT: t('confession.submission.submit'),
      }}
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

