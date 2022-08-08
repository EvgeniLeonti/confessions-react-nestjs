import * as React from "react";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const RecaptchaDisclaimer = (props) => {
  const {t} = useTranslation();

  return <Typography {...props}>
    {t('recaptcha.disclaimer').split(" ").map((word, index) => {
      switch (word) {
        case "{privacyUrl}":
          return <><a key={index} href="https://policies.google.com/privacy" target="_blank">{t('recaptcha.privacy')}</a> {' '}</>
        case "{termsUrl}":
          return <><a key={index} href="https://policies.google.com/terms" target="_blank">{t('recaptcha.terms')}</a> {' '}</>
        default:
          return <span key={index}>{word} </span>
      }
    })}
  </Typography>

}

export default RecaptchaDisclaimer;
export type RecaptchaDisclaimer = typeof RecaptchaDisclaimer;
