import pdf from './pdf';
import html from './html';
import doc from './doc';
import ppt from './ppt';
import xls from './xls';
import image from './image';

const extractors = [pdf, html, doc, ppt, xls, image];

const extract = async (data: Buffer, type: string, opt: any = {}) => {
  const extractor = extractors.find((e) => e.types.includes(type));
  if (extractor) {
    return extractor.extract(data, type, opt);
  }
  return '';
};

export default extract;
