const extractText = async (
  data: Buffer,
  _mimeType: string,
  options: any = {}
) => {
  // TODO: implement this
  return data.toString();
};

export default {
  name: 'ppt',
  extract: extractText,
  types: [
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.presentationml.template'
  ],
};
