import * as pdf from 'pdf-parse';

const extractText = async (data: Buffer, _mimeType: string, opt: any = {}) => {
  const options: pdf.Options = {
    ...opt,
  };
  const res = await pdf(data, options);
  if (res) {
    return res.text;
  }
  return '';
};

export default {
  name: 'pdf',
  extract: extractText,
  types: ['application/pdf'],
};
