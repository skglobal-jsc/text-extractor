import axios, { AxiosRequestConfig } from 'axios';

import extract from './extractors';

import { detectFileTypeByBuffer } from './utils';

const fromBufferWithMimeType = async (
  data: Buffer,
  mimeType: string,
  opt: any = {}
): Promise<string> => {
  const text = await extract(data, mimeType, opt);
  return text;
};

const fromBuffer = async (data: Buffer, opt: any = {}): Promise<string> => {
  const mimeType = await detectFileTypeByBuffer(data);
  const text = await fromBufferWithMimeType(data, mimeType.mime, opt);
  return text;
};

const fromUrl = async (
  current_url: string,
  opt?: AxiosRequestConfig
): Promise<string> => {
  const instance = axios.create();

  let requestConfig: AxiosRequestConfig = {
    url: current_url,
    method: 'get',
    baseURL: '',
    transformResponse: [
      async (data: any, headers: any) => {
        const typeStr = headers['content-type'];
        const text = await fromBufferWithMimeType(data, typeStr);
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
    ...opt,
    responseType: 'arraybuffer', //'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    maxContentLength: 20000000,
  };

  return instance.request(requestConfig).then((res) => {
    return res.data;
  });
};

export { fromUrl, fromBuffer, fromBufferWithMimeType };
