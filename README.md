# alwaysobsolete.com

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Installation

### Git LFS

This project uses [Git LFS](https://git-lfs.com/). [Install it](https://github.com/git-lfs/git-lfs?utm_source=gitlfs_site&utm_medium=installation_link&utm_campaign=gitlfs#installing) before cloning this repo.

Ensure Git LFS is installed:

```shell
git lfs install
```

Clone repo and fetch LFS refs:

```
git clone git@github.com:alwaysobsolete/alwaysobsolete.github.io &&\
git lfs fetch
```

### .env

Copy [.env.local.example](/.env.local.example) to `.env.local`:

```shell
cp ./.env.local.example ./.env.local
```

### Dependencies

Install dependencies:

```shell
yarn install
```

## Development

Run the development server:

```shell
yarn dev
```

## Build

Build the static app:

```shell
yarn build
```

The static app can be tested by running an http server and serving the `/out` directory.

## Deploy

Site is deployed to [GitHub Pages](https://docs.github.com/en/pages). See [/.github/workflows] and [/settings/pages](/settings/pages).

## Contribute

To contribute, create a pull request against the [dev branch](https://github.com/alwaysobsolete/alwaysobsolete.github.io/tree/dev).
