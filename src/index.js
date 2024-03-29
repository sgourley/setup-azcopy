
const core = require('@actions/core');
const tc = require('@actions/tool-cache');

const IS_WINDOWS = process.platform === 'win32';
const IS_MAC = process.platform === 'darwin';

async function main() {
    try {
        const sourceUrl = IS_WINDOWS ? 'https://aka.ms/downloadazcopy-v10-windows'
            : IS_MAC ? 'https://aka.ms/downloadazcopy-v10-mac'
                : 'https://aka.ms/downloadazcopy-v10-linux';

        core.debug(`Downloading from ${sourceUrl}`);
        const downloadPath = await tc.downloadTool(sourceUrl);
        core.debug(`Downloaded to ${downloadPath}`);

        const extractPath = await (IS_WINDOWS ? tc.extractZip(downloadPath) : tc.extractTar(downloadPath));
        core.debug(`Extracted to ${extractPath}`);

        const cachedPath = await tc.cacheDir(extractPath, 'azcopy', '10');
        core.addPath(cachedPath);
        core.debug(`Cached to ${cachedPath}`);

    } catch (err) {
        core.setFailed(err.message || err.toString());
    }
}

main();