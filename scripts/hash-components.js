const { hashElement } = require('folder-hash');

module.exports.hashComponents = async () => {
  const hashes = await hashElement('./components', {
    folders: { exclude: ['.*'] },
  });
  return hashes.children.reduce(
    (acc, { name, hash }) => ({ ...acc, [name]: hash }),
    {},
  );
};
