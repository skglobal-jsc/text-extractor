# @sk-global/text-extractor

A text extractor for extracting text from HTML, PDF, Image and other files.

## Currently supported types ...

* HTML, use [html-to-text](https://www.npmjs.com/package/html-to-text)
* PDF, use [pdf-parse](https://gitlab.com/autokent/pdf-parse)
* Image (PNG, JPEG, GIF, BMP, TIFF, ICO, SVG). Use [tesseract.js](https://github.com/naptha/tesseract.js#tesseractjs) for OCR.
* ... and more to come

## Installation

```bash
npm install @sk-global/text-extractor
```

## Usage

CommonJS

```js
const { fromUrl, fromBufferWithMimeType, fromBuffer } = require('@sk-global/text-extractor');

// fromUrl
const text = await fromUrl('https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/d6cfdcdd-75e4-460c-9ec0-af4f952e03d5/20210906_meeting_promoting_01.pdf');

// fromBufferWithMimeType
const text = await fromBufferWithMimeType(buffer, 'image/png');

// fromBuffer
const text = await fromBuffer(buffer);
```

ES6

```js
import { fromUrl, fromBufferWithMimeType, fromBuffer } from '@sk-global/text-extractor';

```

## Roadmap

* [ ] Add support for more file types
* [ ] Add support for options passed to the underlying libraries
