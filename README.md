# OPAL
Observational PFAS Access paneL

## Project Overview

OPAL (Observational PFAS Access paneL) is a frontend interface to explore, visualize,
and access PFAS exposure data. It surfaces community and environmental datasets relevant to PFAS chemicals.

## 🚧 Development

### 🧰 Tech Stack

This application uses:

- **React** – Frontend framework
- **Node** – Development environment
- **Docker + NGINX** – Containerized deployment and static serving
- **Make** – Optional local build tooling

### Folder Structure

A quick overview of key directories and files in the project:

```
.
├── public/ # static files served with the app
├── src/ # primary React application source code
├── Dockerfile # builds the production bundle, served by NGINX
├── Makefile # local build/deployment helpers
├── sample.env # local .env template
└── package.json # project dependencies and scripts
```
### Environment Variables

Create `.env` from `sample.env` and fill in the following values:

| Variable        | Description                                | Required? |
|-----------------|--------------------------------------------|-----------|
| `IMAGE`         | Docker image name (e.g. `mvvatson/opal`)   | ✅        |
| `TAG`           | Version tag for the image (e.g. `1.0.4`)   | ✅        |
| `API_HOST`      | Backend API base URL                       | ✅        |
| `API_USERNAME`  | Basic auth username for API                | ✅        |
| `API_PASSWORD`  | Basic auth password for API                | ✅        |

### Development Server

Install dependencies with `npm i`, and spin up the development server with `npm start`.
The app should be running at [http://localhost:8000/](http://localhost:8000/).

## 📦 Building for Production

### Manually

Execute `npm ci` to install locked dependencies, and `npm run build` to build a production bundle.
The bundle will be exported to the `dist` directory.

### Docker

There's a Dockerfile for easy deployment.
Commands similar to the following should suffice to
build an image and run an NGINX container
that serves only the application bundle on port 80.
Currently, images are pushed to `hub.docker.com/r/mvvatson/opal`

```bash
docker build -t mvvatson/opal:1.0.4 . &&
docker run --rm -p 80:80 mvvatson/opal:1.0.4
```

To bring in the app version, based on Git tag, build with this command.

```bash
docker build \
  --build-arg APP_VERSION=$(git describe --tags --always) \
  -t mvvatson/opal:$(git describe --tags --always) .
```

There is a script defined in the app's `package.json` to do this more simply:

```bash
npm run docker-build -- --tag=1.0.4
```

### Make
Define these variables
```
IMAGE=registry/name
TAG=1.0.4
```
in the `.env` file, and use the following commands instead.

- `make certs`: Generate local certs (to match deployment env):
- `make build`: Build image
- `make run`: Run container (todo: API requests fail in local dev; CORS)
- `make push`: Push image to registry
- `make publish`: Build _and_ push image
- `make clean`: Clean up (certs dir)

## 🚢 Deployment

### 🖥 Host VM

This application is deployed in ACIS-managed UNC virtual machines
at [pfas-app-dev.renci.unc.edu](https://pfas-app-dev.renci.unc.edu)
and [pfas-app-prod.renci.unc.edu](https://pfas-app-prod.renci.unc.edu).

### 🪪 VM Access

Being in the RENCI group on the [UNC VPN](https://vpn.unc.edu) is required
to view the dev instance of the application in your browser. The prod instance,
on `pfas-app-prod` is accessible to the public Internet. VPN access (specifically,
the RENCI group on the UNC VPN) is required for SSH for both machines. 

```
ssh <ONYEN>@pfas-app-dev.mdc.renci.unc.edu
```

> [!NOTE]
> Note the `mdc` appearing in this address.

You will be prompted to authenticate with your ONYEN unless you've configured key-based authentication.

### 🔑 SSL

SSL certificate and key files are on the VM and maintained by ACIS, who
will be notified of expiry and will manage replacement.
At run-time, these files are mounted from the host VM into the container.

### 🚀 Launching the application container

View a list of running containers: `docker ps`. There should one.
Pull in the latest application image: `docker pull mvvatson/opal:1.0.4`
First, bring the currently running container down: `docker stop opal-ui`.

Then bring up the next version, with ports open and the certs mounted.
This entire command, sticking with our running example, looks like:

```
docker run --rm -d \
  -p 80:80 -p 443:443 \
  -v <PATH_TO_CERT>:/ssl.cer \
  -v <PATH_TO_KEY>:/ssl.key \
  --name opal-ui mvvatson/opal:1.0.4
```
