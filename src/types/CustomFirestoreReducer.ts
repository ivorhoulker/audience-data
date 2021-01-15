import {
  Data,
  Dictionary,
  Listeners,
  ReduxFirestoreQuerySetting,
} from "react-redux-firebase";

export interface CustomFirestoreReducer<
  Schema extends Record<string, any> = {}
> {
  composite?: Data<any | Dictionary<any>>;
  data: {
    [T in keyof Schema]: Record<string, Schema[T]>;
  };
  errors: {
    allIds: string[];
    byQuery: any[];
  };
  listeners: Listeners;
  ordered: {
    [T in keyof Schema]: Array<{ key: string; value: Schema[T] }>;
  };
  queries: Data<ReduxFirestoreQuerySetting & (Dictionary<any> | any)>;
  status: {
    requested: Dictionary<boolean>;
    requesting: Dictionary<boolean>;
    timestamps: Dictionary<number>;
  };
}
