import {useHistory, useLocation} from "../core";
import {useTranslation} from "react-i18next";
import {useGetConfessionQuery, useLazyGetConfessionsQuery} from "../store/confession-api";
import ConfessionCard from "../components/confession/Card";
import * as React from "react";

const Confession = () => {
  const location = useLocation();

  const [, , id] = location.pathname.split('/');
  console.log('location id', id)

  const { data, error, isLoading } = useGetConfessionQuery({id});
  console.log('data', data)
  const { t } = useTranslation();

  return (
    data && <ConfessionCard confession={data} />
  );
};

export default Confession;
export type Confession = typeof Confession;


