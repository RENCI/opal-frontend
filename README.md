# OPAL
Observational PFAS Access paneL

## 🚧 Development

This is a React app developed and deployed with Node 20.11.1.

### Environment Variables

Create `.env` from `sample.env` and fill in the missing values.

### Development Server

Install dependencies with `npm i`, and spin up the development server with `npm start`.
The app should be running at [http://localhost:8000/](http://localhost:8000/).

## 📦 Building for Production

### Manually

Execute `npm ci` to install locked dependencies, and `npm run build` to build a production bundle. The bundle will export to the `dist` directory.

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
IMAGE=registry/namespace
TAG=1.0.4
```
in the `.env` file, and use the following commands instead.

- Generate local certs (to match deployment env): `make certs`
- Build Docker image: `make build`
- Run Docker image: `make run`
- Push to registry: `make push`
- Build and push: `make publish`
- Clean up: `make clean` (simply removes certs dir)

## 🚢 Deployment

### 🖥 Host VM

This application is deployed in ACIS-managed UNC virtual machines at [pfas-app-dev.renci.unc.edu](https://pfas-app-dev.renci.unc.edu) and [pfas-app-prod.renci.unc.edu](https://pfas-app-prod.renci.unc.edu).

### 🪪 VM Access

Being in the RENCI group on the [UNC VPN](https://vpn.unc.edu) is required to view the dev deployment of the application in your browser. The prod instance, on `pfas-app-prod` is accessible to the public Internet.

VPN access (specifically the RENCI group on the UNC VPN) is required for SSH, though, for both machines. 

```
ssh <ONYEN>@pfas-app-dev.mdc.renci.unc.edu
```

> [!NOTE]
> Note the `mdc` appearing in this address.

You will be prompted to authenticate with your ONYEN unless you've configured key-based authentication.

### 🔑 SSL

SSL certificate and key files are on the VM and maintained by ACIS, who will be notified of expiry and will manage replacement.

We will need to mount the aforementioned certificate files from the host VM into the container. NGINX [will look for](./server.conf) `ssl.cer` and `ssl.key` in `/`.

### 🚀 Launching the application container

view a list of running containers with `docker ps`. There should one.
First, bring that previous container down: `docker stop opal-ui`.

Then bring the up the next version of the application, with mounted certs.
This entire command for, say `v0.1.10`, looks like:
```
docker run --rm -d \
  -p 80:80 -p 443:443 \
  -v <PATH_TO_CERT>:/ssl.cer \
  -v <PATH_TO_KEY>:/ssl.key \
  --name opal-ui mvvatson/opal:0.1.10
```
