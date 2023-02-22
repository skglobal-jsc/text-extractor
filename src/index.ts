import axios, { AxiosRequestConfig } from 'axios';

import extract from './extractors';

import { detectFileTypeByBuffer } from './utils';

/**
 * This function is used to clean the text extracted from the pdf file.
 * @param text
 */
const cleanText = (text: string): string => {
  return (
    text
      .replace(/ /g, '')
      .replace(/\t/g, '')
      .replace(/\r|\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      // .replace(/(?<=[^\n。！？])\n(?=[^\n。！？])/g, '') // 文章中の改行を削除
      .replace(/([^\n。」])\n([^\n])/g, '$1$2') // 文章中の改行を削除
      .replace(/、\n/g, '、') // 読点の後の改行を削除
  );
};

const fromBufferWithMimeType = async (
  data: Buffer,
  mimeType: string,
  opt: any = {}
): Promise<string> => {
  let text = await extract(data, mimeType, opt);
  // clean text
  text = cleanText(text);
  return text;
};

const fromBuffer = async (data: Buffer, opt: any = {}): Promise<string> => {
  const mimeType = await detectFileTypeByBuffer(data);
  const text = await fromBufferWithMimeType(data, mimeType.mime, opt);
  return text;
};

const fromUrl = async ({
  url,
  option = {}, // text extraction option.
  config = {}, // axios config
}: {
  url: string;
  option?: any;
  config?: AxiosRequestConfig;
}): Promise<string> => {
  const instance = axios.create();

  let requestConfig: AxiosRequestConfig = {
    url: url,
    method: 'get',
    baseURL: '',
    transformResponse: [
      async (data: any, headers: any) => {
        const text = await fromBuffer(data, option);
        return text;
      },
    ],

    // fake user agent, to avoid 403
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
    },
    timeout: 40000,
    withCredentials: false,
    validateStatus: (status: number) => {
      return status >= 200 && status < 300;
    },
    maxRedirects: 5,
    ...config,
    responseType: 'arraybuffer', //'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    maxContentLength: 20000000,
  };

  return instance.request(requestConfig).then((res) => {
    return res.data;
  });
};

export { fromUrl, fromBuffer, fromBufferWithMimeType };
