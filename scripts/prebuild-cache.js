const fs = require('fs');
const path = require('path');

const { hashComponents } = require('./hash-components');

const BUILD_CACHE_PATH = path.resolve(__dirname, '../build-cache.json');

(async () => {
  const buildCache = fs.existsSync(BUILD_CACHE_PATH)
    ? require(BUILD_CACHE_PATH)
    : {};

  const newHashes = await hashComponents();
  const oldHashes = buildCache.old || {};

  const diff = [];

  // Calculate diff
  Object.keys(newHashes).forEach(compName => {
    const newHash = newHashes[compName];
    const oldHash = oldHashes[compName];
    if (newHash !== oldHash) diff.push(compName);
  });

  const newBuildCache = {
    new: newHashes,
    old: oldHashes,
    diff,
  };

  fs.writeFileSync(BUILD_CACHE_PATH, JSON.stringify(newBuildCache));
})();
