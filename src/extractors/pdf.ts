// import * as pdf from 'pdf-parse';
const pdf = require('pdf-parse');

interface PdfParseOptions {
  max?: number;
}

const extractText = async (
  data: Buffer,
  _mimeType: string,
  opt: PdfParseOptions = {
    max: 0, // 0 means no limit
  }
) => {
  const res = await pdf(data, opt);
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
