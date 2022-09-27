// import * as pdf from 'pdf-parse';
const pdf = require('pdf-parse');

const extractText = async (data: Buffer, _mimeType: string, opt: any = {}) => {
  const res = await pdf(data);
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
