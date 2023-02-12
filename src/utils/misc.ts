export const getResponseFormat = (
  code: number,
  message: string,
  data: any = null,
  error: any = null,
) => ({
  code,
  message,
  data,
  error,
});
