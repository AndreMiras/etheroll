# How to release

This is documenting the release process.


## Git flow & CHANGELOG.md

Make sure the CHANGELOG.md is up to date and follows the http://keepachangelog.com guidelines.
Start the release with git flow:
```sh
git flow release start YYYY.MM.DD
```
Now update the <CHANGELOG.md> `[Unreleased]` section to match the new release version.
Also update the `version` from <package.json>.
Then commit and finish release.
```sh
git commit -a -m "YYYY.MM.DD"
git flow release finish
```
Push everything, make sure tags are also pushed:
```sh
git push
git push origin master:master
git push --tags
```

## Publish to GitHub Pages
Publish to https://andremiras.github.io/etheroll via:
```sh
yarn deploy
```

## Update GitHub release
Got to GitHub [Release/Tags](https://github.com/AndreMiras/etheroll/tags), click "Add release notes" for the tag just created.
Add the tag name in the "Release title" field and the relevant CHANGELOG.md section in the "Describe this release" textarea field.
Click "Publish release".
