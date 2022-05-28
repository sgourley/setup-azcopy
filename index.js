
const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function main() {
    try {
        const sourceUrl = getDownloadUrl();
        core.debug(`Downloading from ${sourceUrl}`);

        const downloadPath = await tc.downloadTool(sourceUrl);
        core.debug(`Downloaded to ${downloadPath}`);

        const extractPath = await (IS_WINDOWS ? tc.extractZip(downloadPath) : tc.extractTar(downloadPath));
        core.debug(`Extracted to ${extractPath}`);

        const cachedPath = await tc.cacheDir(extractPath, 'azcopy', '10');
        core.addPath(cachedPath);
        core.debug(`Cached to ${cachedPath}`);

    } catch (err) {
        core.setFailed(err.toString());
    }
}

const IS_WINDOWS = process.platform === 'win32'
const IS_MAC = process.platform === 'darwin'

function getDownloadUrl() {

    // https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10

    return IS_WINDOWS ? 'https://aka.ms/downloadazcopy-v10-windows'
        : IS_MAC ? 'https://aka.ms/downloadazcopy-v10-mac'
            : 'https://aka.ms/downloadazcopy-v10-linux';
}

main();