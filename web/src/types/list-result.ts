import {Confession} from "./confession";

interface ListResult <EntityType> {
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    after: string,
    before: string,
    startCursor: string,
    endCursor: string,
  }
  items: EntityType[]
}

export type ConfessionsResult = ListResult<Confession>;
