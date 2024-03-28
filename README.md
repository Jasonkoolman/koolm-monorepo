# `@koolm`

Welcome to the `@koolm` monorepository: a collection of front-end libraries designed to support developers in building dynamic and engaging applications. These libraries are crafted to simplify complex tasks, enhance productivity, and inspire innovation in your projects. The `@koolm` monorepo is aimed at providing a comprehensive toolkit that blends seamlessly into any React development workflow, empowering you to bring your creative visions to life.

This repository incorporates:

- 🏎 [Turborepo](https://turbo.build/repo) for a high-performance Monorepo build system.
- 🚀 [React](https://reactjs.org/) as the core JavaScript library for building user interfaces.
- 🛠 [Tsup](https://github.com/egoist/tsup) for TypeScript bundling with esbuild.
- 🗲 [Vite](https://vitejs.dev/) for fast development and building.

Additionally, it comes preconfigured with tools for modern development:

- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [ESLint](https://eslint.org/) for enforcing code quality.
- [Prettier](https://prettier.io) for consistent code formatting.
- [Changesets](https://github.com/changesets/changesets) for version management and changelog generation.
- [GitHub Actions](https://github.com/changesets/action) for automated package publishing.

## Packages

- [@koolm/steps](./packages/steps/README.md): Simplifies building multi-step forms in React.

## Commands

- `npm build` - Compiles all packages for production.
- `npm dev` - Runs local development servers across all packages.
- `npm lint` - Ensures code quality by linting across packages.
- `npm test` - Runs tests across all packages.
- `npm changeset` - Prepares new package versions and changelogs.
- `npm clean` - Removes `node_modules` and `dist` directories to ensure a clean workspace.

All packages and applications leverage TypeScript for development, with workspace configurations enabling shared dependencies to be managed efficiently. To add a dependency across the monorepo, use `npm add` with the `-w` flag.

## Build process

The build process, powered by `tsup` and using `esbuild`, optimizes for performance. Running `npm build` executes defined package build scripts in parallel, leveraging Turborepo's caching for speed.

Example build command for a core library:

```bash
tsup src/index.tsx --format esm,cjs --dts --external react
```

This process compiles React and TypeScript code into JavaScript formats suitable for various environments, ensuring broad compatibility.

## Versioning and Publishing

With [Changesets](https://github.com/changesets/changesets), version management and npm publishing are streamlined. Ensure you have `NPM_TOKEN` and `GITHUB_TOKEN` configured in your GitHub repository settings for npm access.

### Changelog Generation

Run `npm changeset` to start the versioning process, following the prompts to select packages for updating and summarizing the changes. This creates a Markdown file in the `changesets` directory with all necessary version and change information.

### Publishing to npm

Upon code push, the configured GitHub Action handles building and publishing to npm, following the strategies outlined in the root `package.json`. This process ensures that new versions of the packages are distributed efficiently.
