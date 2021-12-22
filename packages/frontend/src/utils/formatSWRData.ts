const formatSWRData = (data: Record<number, Record<any, any>>[]) =>
  Object.keys(data).map((k) => data[+k]);

export default formatSWRData;
