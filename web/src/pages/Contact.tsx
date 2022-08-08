import {string} from "zod";
import GenericForm from "./GenericForm";
import {useCreateConfessionMutation} from "../store/confession-api";
import {useHistory} from "../core";
import {useTranslation} from "react-i18next";
import {TextareaAutosize, TextField} from "@mui/material";
import {useState} from "react";

const Confess = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const [value, setValue] = useState("");


  return (
    <>
      <GenericForm
        useMutation={useCreateConfessionMutation}
        lang={{
          TITLE: t('contact.submission.title'),
          SUCCESS: t('contact.submission.success'),
          FAILURE: t('contact.submission.failure'),
          SUBMIT: t('contact.submission.submit'),
        }}
        fields={[
          {
            type: 'email', name: 'email', label: t('contact.submission.email'),
            schema: string().nonempty(t('email-is-required')).email(t('email-is-invalid')),
          },
          {
            type: 'text',
            name: 'content',
            label: t('contact.submission.content'),
            multiline: true,
            rows: 8,
            maxRows: Infinity,
            textarea: true,
            schema: string()
              .nonempty(t('contact.submission.content.required'))
              .min(5, t('contact.submission.content.min').replace('{min}', '5'))
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
    </>
  );
};

export default Confess;

