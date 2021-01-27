export interface BookSchema {
    _id: { $oid: string };
    title: string;
    author: string;
    press: string;
    number: Number;
    type: string;
  }