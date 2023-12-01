export interface RequestKardex {
  id: number;
  date: string;
  status: string;
  detail: DetailRequestKardex;

}

export interface DetailRequestKardex {
  reason: string;
  image: string;
  deliverDate: string
}
