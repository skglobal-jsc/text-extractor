const extractText = async (
  data: Buffer,
  _mimeType: string,
  options: any = {}
) => {
  // TODO: implement this
  return data.toString();
};

export default {
  name: 'doc',
  extract: extractText,
  types: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};
