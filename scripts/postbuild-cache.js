const fs = require('fs');
const path = require('path');

const { hashComponents } = require('./hash-components');

const BUILD_CACHE_PATH = path.resolve(__dirname, '../build-cache.json');

(async () => {
  const buildCache = fs.existsSync(BUILD_CACHE_PATH)
    ? require(BUILD_CACHE_PATH)
    : {};
  buildCache.old = await hashComponents();

  fs.writeFileSync(BUILD_CACHE_PATH, JSON.stringify(buildCache));
})();
