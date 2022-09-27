# @sk-global/text-extractor

A text extractor for extracting text from HTML, PDF, Image and other files.

## Currently supported types ...

* HTML, use [html-to-text](https://www.npmjs.com/package/html-to-text)
* PDF, use [pdf-parse](https://gitlab.com/autokent/pdf-parse)
* Image (PNG, JPEG, GIF, BMP, TIFF, ICO, SVG). Use tesseract.js for OCR.
* ... and more to come

## Installation

```bash
npm install @sk-global/text-extractor
```

## Usage

```js
const { fromUrl, fromBufferWithMimeType, fromBuffer } = require('@sk-global/text-extractor');

// fromUrl
const text = await fromUrl('https://www.google.com', { timeout: 10000 });

// fromBufferWithMimeType
const text = await fromBufferWithMimeType(buffer, 'image/png');

// fromBuffer
const text = await fromBuffer(buffer);
```

## Roadmap

* [ ] Add support for more file types
* [ ] Add support for options passed to the underlying libraries
