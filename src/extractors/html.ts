import { htmlToText, HtmlToTextOptions } from 'html-to-text';
import { encodingExists, decode } from 'iconv-lite';
import { parse } from 'content-type';

const default_html_to_text_options: HtmlToTextOptions = {
  baseElements: {
    selectors: ['.wb-contents'],
  },
  selectors: [
    {
      selector: 'table',
      format: 'dataTable',
      options: { uppercaseHeaderCells: false },
    },
  ],
  wordwrap: false,
  ignoreImage: true,
  preserveNewlines: true,
  hideLinkHrefIfSameAsText: true,
  ignoreHref: true,

  uppercaseHeadings: false,
  formatters: {},
};

const decodeBufferIfNecessary = (data: Buffer, mimeType: string) => {
  let charset = 'none';
  const typeObj = parse(mimeType);

  if (typeof typeObj.parameters['charset'] !== 'undefined') {
    charset = typeObj.parameters['charset'].toLowerCase();
  }

  if (
    charset == 'utf-8' ||
    charset == 'ascii' ||
    charset == 'none' ||
    !encodingExists(charset)
  ) {
    return data.toString();
  } else {
    return decode(data, charset);
  }
};

const extractText = async (data: Buffer, mimeType: string, opt: any = {}) => {
  const html = decodeBufferIfNecessary(data, mimeType);

  const options: HtmlToTextOptions = {
    ...default_html_to_text_options,
    ...opt,
  };
  return htmlToText(html, options);
};

export default {
  name: 'html',
  extract: extractText,
  types: ['text/html'],
};
