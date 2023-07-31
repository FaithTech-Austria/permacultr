# PermaCultr

An online tool to create and view Permaculture maps

## Development

This app is created with (Qwik & QwikCity)[https://qwik.builder.io/docs/].
QwikCity is just a set of modules that are used also in the codebase.

- npm install
- npm run dev

## Deployment

The builds are automatically pushed to the docs folder as a GitHub pages site.
Live: https://faithtech-austria.github.io/permacultr/

- npm run build
- git push origin master

## Design values

- The end user might have flaky internet
- This is a tool that helps people create Permaculture maps
- When we have a domain expert we can improve the app so that it also transfers knowledge
- By using files instead of a database and users etc we can quickly create value
- The file based way is much cheaper to host

## Used APIs

- https://developer.chrome.com/articles/file-handling/