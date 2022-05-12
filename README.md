# Crowdin Pretranslate Action

This is a very simple action which triggers a [Crowdin Pre-Translate](https://support.crowdin.com/enterprise/pre-translation/)
against all files/languages in a project using [Translation Memory](https://support.crowdin.com/enterprise/translation-memory/).
It is primarily intended for use with the Crowdin project for [starship](https://crowdin.com/project/starship-prompt),
though with some tweaks, it could be used for several other use cases (PRs are welcome!).

## Example Usage

Place the following in `.github/workflows/pretranslate.yml`:

```yaml
# Run pre-translate with translation memory, all files/langs, at midnight daily.
name: Crowdin Updates
on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  trigger_crowdin_tm:
    name: Crowdin Translation Memory Trigger
    runs-on: ubuntu-latest
    steps:
      - uses: starship/crowdin-pretranslate-action@main
        with:
          project_id: <YOUR PROJECT ID>
          api_key: ${{ secrets.CROWDIN_API_KEY }}
```

You will need to place your project ID in the arguments, and upload a
[secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
containing your Crowdin API key.

### Local Development

You should never need to run the code locally, as it depends on GitHub Actions
libraries which are only meaningful in the GitHub Actions environment. However,
if you want to develop the action, you should run the following commands after
checkout:

```
npm install
npm run all
```

This will compile the action. Note that `dist/index.js` is the file which users
will run to execute this action, so that file needs to be updated in a commit
if the action is to be changed! (There is an action on this repo that will
block any PRs where this doesn't happen).
