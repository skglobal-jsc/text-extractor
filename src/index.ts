import axios, { AxiosRequestConfig } from 'axios';

import extract from './extractors';

import { detectFileTypeByBuffer } from './utils';

export interface ExtractOption {
  cleanText?: boolean;
}

/**
 * This function is used to clean the text extracted from the pdf file.
 * @param text
 */
const cleanText = (text: string): string => {
  return text
    .replace(/ /g, '') // remove all spaces
    .replace(/\t/g, '') // remove all tabs
    .replace(/\r|\r\n/g, '\n') // remove all carriage returns and line feeds and replace with \n only
    .replace(/\n{3,}/g, '\n\n') // remove all multiple new lines and replace with 2 new lines
    .replace(/(?<=[^\n。！？])\n(?=[^\n。！？])/g, '') // remove all new lines between characters
    .replace(/、\n/g, '、'); // remove all new lines between characters and replace with comma only
};

const fromBufferWithMimeType = async (
  data: Buffer,
  mimeType: string,
  opt: ExtractOption = {}
): Promise<string> => {
  let text = await extract(data, mimeType, opt);
  if (opt.cleanText) {
    text = cleanText(text);
  }
  return text;
};

const fromBuffer = async (data: Buffer, opt: ExtractOption = {}): Promise<string> => {
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
  option?: ExtractOption;
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
