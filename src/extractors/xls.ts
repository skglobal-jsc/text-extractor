const extractText = async (
  data: Buffer,
  _mimeType: string,
  options: any = {}
) => {
  // TODO: implement this
  return data.toString();
};

export default {
  name: 'xls',
  extract: extractText,
  types: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.oasis.opendocument.spreadsheet-template',
  ],
};
