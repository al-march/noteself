// enum для листа сущностей
enum enumParamsList {
  search = 'q', // internal_name = url_name
  sort = 's',
}
// enum для листа сущностей
enum enumParamsSingle {
  id = 'id',
}
export type ParamsList = keyof typeof enumParamsList;
export type ParamsSingle = keyof typeof enumParamsSingle;

// общий интерфейс
type IParams = {
  [param in ParamsSingle | ParamsList]?: string;
};

export class QueryParams {
  params: IParams = {};

  getParamByName(name: ParamsList | ParamsSingle): string {
    return this.params[name];
  }
  hasParam(name: ParamsList | ParamsSingle): boolean {
    return name in this.params;
  }
}

export class QueryParamsList extends QueryParams {
  constructor(queryParams: IParams) {
    super();
    const enumKeys = Object.keys(enumParamsList);
    for (const enumKey of enumKeys) {
      this.params[enumKey] = queryParams[enumParamsList[enumKey]];
    }
  }
  // fixme: сейчас тут хардпривязка к столбцам БД
  createSort(paramSort: string): { sort: string; order: 'ASC' | 'DESC' } {
    switch (paramSort) {
      case 'za':
        return { sort: 'title', order: 'DESC' };
      case 'upd':
        return { sort: 'updateAt', order: 'ASC' };
      case 'upd-d':
        return { sort: 'updateAt', order: 'DESC' };
      case 'create':
        return { sort: 'createAt', order: 'ASC' };
      case 'create-d':
        return { sort: 'createAt', order: 'DESC' };
      case 'az':
      default:
        return { sort: 'title', order: 'ASC' };
    }
  }
}
export class QueryParamsSingle extends QueryParams {
  constructor(queryParams: IParams) {
    super();
    const enumKeys = Object.keys(enumParamsSingle);

    for (const enumKey of enumKeys) {
      this.params[enumKey] = queryParams[enumParamsSingle[enumKey]];
    }
  }
}