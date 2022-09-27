import { createWorker } from 'tesseract.js';

const extractText = async (
  data: Buffer,
  _mimeType: string,
  options: any = {
    lang: 'eng',
  }
) => {
  const worker = createWorker({
    // logger: (m) => console.log(m),
  });
  await worker.load();
  await worker.loadLanguage(options.lang);
  await worker.initialize(options.lang);
  const {
    data: { text },
  } = await worker.recognize(data);
  console.log(text);
  await worker.terminate();

  return text;
};

export default {
  name: 'image',
  extract: extractText,
  types: [
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/tiff',
    'image/webp',
  ],
};
