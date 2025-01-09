import qs from "query-string";

interface UpdateURLQueryParams {
  params: string;
  key: string;
  value: string;
}

export const updateURLQuery = ({
  params,
  key,
  value,
}: UpdateURLQueryParams) => {
  console.log("params: ", params);

  const queryString = qs.parse(params);
  queryString[key] = value;
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

interface RemoveKeysFromUpdateURLQueryParams {
  params: string;
  removeKeys: [string];
}
export const removeKeysFromUpdateURLQuery = ({
  params,
  removeKeys,
}: RemoveKeysFromUpdateURLQueryParams) => {
  console.log("params: ", params);

  const queryString = qs.parse(params);
  removeKeys.map((key: string) => delete queryString[key]);

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};
