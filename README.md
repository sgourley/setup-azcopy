
# setup-azcopy

This action downloads and installs [azcopy](https://docs.microsoft.com/en-us/azure/storage/common/storage-ref-azcopy). This is a simplified version of [install-azcopy-action](https://github.com/kheiakiyama/install-azcopy-action).

## Usage

Just reference this action as in `uses:` below in order to use `azcopy` in subsequent steps.

```yaml
steps:
- uses: sgourley/setup-azcopy@v10
- run: azcopy --help
```
