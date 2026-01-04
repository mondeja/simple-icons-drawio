# [diagrams.net] library for [Simple Icons]

Load all [Simple Icons] brands directly to [drawio].

<p align="center">
  <img src="https://github.com/mondeja/simple-icons-drawio/raw/develop/images/simple-icons-drawio.png" "Simple Icons in drawio">
</p>

## Usage

### diagrams.net

Inside a [diagrams.net] project, go to `File` -> `Open library from` -> `URL` and
paste the next [URL](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/simple-icons.xml):

```text
https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/simple-icons.xml
```

:warning: Note that could take a few seconds to load.

You can also start a new project in [diagrams.net] with the simple-icons
library loaded using [this link](https://app.diagrams.net/?splash=0&clibs=https%3A%2F%2Fgithub.com%2Fmondeja%2Fsimple-icons-drawio%2Freleases%2Fdownload%2F16.4.0%2Fsimple-icons.xml):

```text
https://app.diagrams.net/?splash=0&clibs=https%3A%2F%2Fgithub.com%2Fmondeja%2Fsimple-icons-drawio%2Freleases%2Fdownload%2F16.4.0%2Fsimple-icons.xml
```

### drawio desktop app

If you're using the [drawio] desktop application, download the library file from [the next URL](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/simple-icons.xml) and open it with `File` -> `Open Library`:

```text
https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/simple-icons.xml
```

## Select icons

Individual icons can be located using the shapes search tool:

<p align="center">
  <img src="https://github.com/mondeja/simple-icons-drawio/raw/develop/images/search-icon.png" "Simple Icons in drawio">
</p>

## Partial releases

Better library load times can be achieved by using the alphabet builds that are included
in each release. Change the `{id}` part in the next URL by one of the builds defined
in the table below:

```text
https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/{id}.xml
```

<!-- partial builds table -->
| Build | Download Link |
|--------|---------------|
| `0-9` | [0-9.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/0-9.xml) |
| `a` | [a.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/a.xml) |
| `b` | [b.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/b.xml) |
| `c` | [c.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/c.xml) |
| `d` | [d.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/d.xml) |
| `e` | [e.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/e.xml) |
| `f` | [f.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/f.xml) |
| `g` | [g.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/g.xml) |
| `h` | [h.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/h.xml) |
| `i` | [i.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/i.xml) |
| `j` | [j.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/j.xml) |
| `k` | [k.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/k.xml) |
| `l` | [l.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/l.xml) |
| `m` | [m.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/m.xml) |
| `n` | [n.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/n.xml) |
| `o` | [o.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/o.xml) |
| `p` | [p.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/p.xml) |
| `q` | [q.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/q.xml) |
| `r` | [r.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/r.xml) |
| `s` | [s.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/s.xml) |
| `t` | [t.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/t.xml) |
| `u` | [u.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/u.xml) |
| `v` | [v.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/v.xml) |
| `w` | [w.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/w.xml) |
| `x` | [x.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/x.xml) |
| `y` | [y.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/y.xml) |
| `z` | [z.xml](https://github.com/mondeja/simple-icons-drawio/releases/download/16.4.0/z.xml) |
<!-- partial builds table end -->

## Custom builds

Custom libraries can be built for a subset of icons.

1. Clone the repository, move inside it and install dependencies:

```sh
git clone ssh://github.com/mondeja/simple-icons-drawio
cd simple-icons-drawio
npm install
```

2. Redirect the output of the _./scripts/build.js_ script to a new XML file:

```sh
./scripts/build.js > simple-icons.xml
```

Use the next optional environment variables to filter the icons to include:

- `SI_DRAWIO_SLUGS_FILTER`: Comma separated string of slugs to include in the build. See [all slugs](https://github.com/simple-icons/simple-icons/blob/16.4.0/slugs.md).
- `SI_DRAWIO_ALPHABET_FILTER`: Comma separated string of letters of the alphabet. All the slugs starting with one of these letters will be included.

For example, next command will include the brands Deno, [diagrams.net] and Node.js:

```sh
SI_DRAWIO_SLUGS_FILTER=diagramsdotnet,simpleicons,deno,nodedotjs SI_DRAWIO_ALPHABET_FILTER=n,d ./scripts/build.js > simple-icons-subset.xml
```

3. Inside a [diagrams.net] project, go to `File` -> `Open library from` -> `Device` and select the created file. If you're using the [drawio] desktop app, go to `File` -> `Open Library` and select the created file.

[diagrams.net]: https://www.diagrams.net
[drawio]: https://github.com/jgraph/drawio
[Simple Icons]: https://simpleicons.org
