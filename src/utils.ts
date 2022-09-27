import { fromBuffer } from 'detect-file-type';

export const detectFileTypeByBuffer = (
  data: any
): Promise<{ ext: string; mime: string }> => {
  return new Promise((resolve, reject) => {
    fromBuffer(data, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
