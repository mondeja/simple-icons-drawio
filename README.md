# [diagrams.net] library for [simple-icons]

Load all [simple-icons] brands directly to [drawio].

<p align="center">
  <img src="https://github.com/mondeja/simple-icons-drawio/raw/develop/images/simple-icons-drawio.png" "Simple Icons in drawio">
</p>

## Usage

Inside a [drawio] project, go to `File` -> `Open library from` -> `URL` and
paste the next [URL](https://github.com/mondeja/simple-icons-drawio/releases/download/9.10.0/simple-icons.xml):

```
https://github.com/mondeja/simple-icons-drawio/releases/download/9.10.0/simple-icons.xml
```

:warning: Note that could take a few seconds to load.

You can also start a new project in [diagrams.net] with the simple-icons
library loaded using [this link](https://app.diagrams.net/?splash=0&clibs=https%3A%2F%2Fgithub.com%2Fmondeja%2Fsimple-icons-drawio%2Freleases%2Fdownload%2F9.10.0%2Fsimple-icons.xml):

```
https://app.diagrams.net/?splash=0&clibs=https%3A%2F%2Fgithub.com%2Fmondeja%2Fsimple-icons-drawio%2Freleases%2Fdownload%2F9.10.0%2Fsimple-icons.xml
```

Individual icons can be located using the shapes search tool:

<p align="center">
  <img src="https://github.com/mondeja/simple-icons-drawio/raw/develop/images/search-icon.png" "Simple Icons in drawio">
</p>

## Custom builds

Better library load times can be achieved customizing your build for a subset of icons.

1. Clone the repository, move inside it and install dependencies:

```sh
git clone ssh://github.com/mondeja/simple-icons-drawio
cd simple-icons-drawio
npm install
```

2. Redirect the output of the _./build.js_ script to a new XML file:

```sh
./build.js > simple-icons.xml
```

Use the next optional environment variables to filter the icons to include:

- `SI_DRAWIO_SLUGS_FILTER`: Comma separated string of slugs to include in the build. See [all slugs](https://github.com/simple-icons/simple-icons/blob/9.10.0/slugs.md).
- `SI_DRAWIO_ALPHABET_FILTER`: Comma separated string of letters of the alphabet. All the slugs starting with one of these letters will be included.

For example, next command will include the brands Deno, [diagrams.net] and Node.js:

```sh
SI_DRAWIO_SLUGS_FILTER=diagramsdotnet,simpleicons,deno,nodedotjs SI_DRAWIO_ALPHABET_FILTER=n,d ./build.js > simple-icons-subset.xml
```

3. Inside a [drawio] project, go to `File` -> `Open library from` -> `Device` and select the created file.

[diagrams.net]: https://www.diagrams.net/
[drawio]: https://github.com/jgraph/drawio
[simple-icons]: https://simpleicons.org/
