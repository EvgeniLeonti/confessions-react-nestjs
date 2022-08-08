import {string} from "zod";
import GenericForm from "./GenericForm";
import {useCreateConfessionMutation} from "../store/confession-api";
import {useHistory} from "../core";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const Confess = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <>
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
            type: 'text',
            name: 'content',
            label: t('confession.submission.content'),
            multiline: true,
            rows: 8,
            maxRows: Infinity,
            textarea: true,
            schema: string()
              .nonempty(t('confession.submission.content.required'))
              .min(5, t('confession.submission.content.min'))
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

