# Dockerized Triggered Git Deployment Server

[![GitHub license](https://img.shields.io/github/license/ourtownrentals/docker-git-deploy.svg)](./LICENSE.txt)
[![David](https://img.shields.io/david/ourtownrentals/docker-git-deploy.svg)](https://david-dm.org/ourtownrentals/docker-git-deploy)

> Built from [makenew/npm-package](https://github.com/makenew/npm-package).

## Description

Local https server for triggered git deploys.

Runs an [Express] server that listen for git POST receive hooks
and triggers deploys via Git fetch and reset.

[Express]: http://expressjs.com/

## Usage

### Requirements

- [Docker].

The images are built and hosted automatically on Docker Hub
at [ourtownrentals/git-deploy].

Pull with

```
$ docker pull ourtownrentals/git-deploy
```

[Docker]: https://www.docker.com/
[ourtownrentals/git-deploy]: https://hub.docker.com/r/ourtownrentals/git-deploy/

### Running in Production

The container exposes the data volume `/srv` which hosts the deployed code.

The following environment variables can be set to configure the deploy
(defaults shown):

- `DEPLOY_REPO`
- `DEPLOY_BRANCH`

If not set, the following defaults will be used:

- Repo: `https://github.com/ourtownrentals/test-php-app.git`.
- Branch: `master`.

For git repos over SSH, the container looks for the key files at
`/root/.ssh/deploy` and `/root/.ssh/deploy.pub`
and will use them if found.

The container expects a valid ssl certificate
at `/etc/ssl/private/deploy.crt`
and the corresponding key at `/etc/ssl/private/deploy.key`.

The server listens on port 443, but since that port is generally reserved for
the actual application, you should bind to a different port, e.g.,

```
$ docker run -p 8443:443 \
  -v /etc/ssl/private/deploy:/etc/ssl/private \
  git-deploy
```

## Development and Testing

### Source Code

The [git-deploy source] is hosted on GitHub.
Clone the project with

```
$ git clone https://github.com/ourtownrentals/docker-git-deploy.git
```

[git-deploy source]: https://github.com/ourtownrentals/docker-git-deploy

### Testing Locally

#### With Node.js

You will need [Node.js] with [npm].

Install the dependencies with

```
$ npm install
```

Start the server with

```
$ npm start
```

[Node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/

#### With Docker

Build and run the container with

```
$ docker build -t git-deploy .
$ docker run -p 443:443 -v $(pwd)/test/private:/etc/ssl/private git-deploy
```

## Contributing

Please submit and comment on bug reports and feature requests.

To submit a patch:

1. Fork it (https://github.com/ourtownrentals/docker-git-deploy/fork).
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Make changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create a new Pull Request.

## License

This app is licensed under the MIT license.

## Warranty

This software is provided "as is" and without any express or
implied warranties, including, without limitation, the implied
warranties of merchantibility and fitness for a particular
purpose.
