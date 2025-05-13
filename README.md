# OPAL
Observational PFAS Access paneL

## Project Overview

OPAL (Observational PFAS Access paneL) is a frontend interface to explore, visualize,
and access PFAS exposure data. It surfaces community and environmental datasets relevant to PFAS chemicals.

## 🚧 Development

### 🧰 Tech Stack

This application uses:

- **Docker + NGINX** – Containerized deployment
- **Node** – Development environment
- **React** – Frontend
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

Create `.env` from `sample.env` and define the following variables.

| Variable        | Description                                | Required? |
|-----------------|--------------------------------------------|-----------|
| `API_HOST`      | Backend API base URL                       | ✅        |
| `API_USERNAME`  | Basic auth username for API                | ✅        |
| `API_PASSWORD`  | Basic auth password for API                | ✅        |
| `IMAGE`         | Docker image name (e.g. `mvvatson/opal`)   |           |
| `TAG`           | Version tag for the image (e.g. `1.0.4`)   |           |
| `ONYEN`         | For VM authentication                      |           |
| `BUILD_ENV`     | Build environment (`dev` or `prod`)        |           |

### Development Server

Install dependencies with `npm i`, and spin up the development server with `npm start`.
The app should be running at [http://localhost:8000/](http://localhost:8000/).

## 📦 Building for Production

### Production Bundle

Execute `npm ci` to install locked dependencies, and `npm run build` to build a production bundle.
The bundle will be exported to the `dist` directory and can be served as static files from a webserver.

There are Make targets for the remainder of the deployment actions that involve Docker and interface with the host VMs. Be sure `IMAGE` and `TAG` are defined in `.env` to run the remaining commands.

The first make target to know is `make help`, which shows the following list of all targets.
```bash
• check                ✅ Check all required env vars

Help Commands
• help                 📖 Show help

Docker Commands
• pull                 📥 Pull the Docker image
• build                🛠️ Build the Docker image
• certs                🔐 Generate or verify local SSL certificates
• run                  ▶️ Run the Docker container
• stop                 🛑 Stop the running container
• rebuild              🔄 Stop, build, and run fresh
• push                 📤 Push the Docker image
• publish              🚀 Build and push in one go
• clean                🧹 Remove generated certs and other build artifacts

Deployment Commands
• deploy               🚢 Deploy app to specific environment
• deploy-dev           🚢 Deploy to dev VM
• deploy-prod          🚢 Deploy to prod VM
```

### Docker

Build a Docker image with `make build`. This results in an NGINX Docker image that simply deploys the aforementioned application bundle on its port 80.

The `make run` command runs that image. Note that, to align with production deployment, this command generates SSL certificates locally. This should serve the application on the machine's port 80.

## 🚢 Deployment

### 🖥 Hosts

This application is deployed on two ACIS-managed UNC virtual machines: [pfas-app-dev.renci.unc.edu](https://pfas-app-dev.renci.unc.edu) and [pfas-app-prod.renci.unc.edu](https://pfas-app-prod.renci.unc.edu).

### 🪪 Access

Being in the RENCI group on the [UNC VPN](https://vpn.unc.edu) is required to view the dev instance of the application in the browser. The prod instance, `pfas-app-prod`, is accessible to the public Internet. VPN access (specifically, the RENCI group on the UNC VPN) is required for SSH for both machines.

```bash
ssh <ONYEN>@pfas-app-dev.mdc.renci.unc.edu
```

> [!NOTE]
> Note the `mdc` appearing in this address.

You will be prompted to authenticate with your ONYEN unless key-based authentication is configured.

### 🔑 SSL

SSL certificate and key files are on the VM and maintained by ACIS, who will be notified of their expiry and will manage replacement. At run-time, these files are mounted from the host VM into the container.

### 🚀 Launching the Application

We launch the application by running a container based on our image.

#### With Make

There’s a `deploy.sh` script and a corresponding `deploy` Make target that handles executing that script on the specified host machine. It requires some setup via a couple additional environment variables in `.env`, but it streamlines deployment quite a bit.

- `DEPLOY_ENV` defines the VM on which to deploy. Set to either `prod` or `dev`. This is only used to set the SSL cert location that gets used in the final `docker run ...` command, and this implementation feels redundant and probably could be improved. 
- `ONYEN` is used to authenticate.

With all the environment variables set, deployment becomes as simple as:

```bash
make deploy-dev
```
and
```bash
make deploy-prod
```

The `deploy` target runs `deploy.sh` on the host over SSH, but it's worth noting that `deploy.sh` can be copied to and run on the host with the necessary environment variables defined or inline: `./deploy.sh DEPLOY_ENV=dev`.

Alternatively, one could do things more manually still on the host VM. In its entirety, the deployment steps are as follows.

- On the host, view a list of running containers: |docker ps|. There should only be one.
- Pull in the latest application image: |docker pull mvvatson/opal:1.0.4|
- Bring the currently running container down: |docker stop opal-ui|.
- Finally, bring up the next version, with ports open and the certs mounted. This entire command looks like:

```bash
docker run --rm -d \
  -p 80:80 -p 443:443 \
  -v /data/certs/pfas-app-dev_renci_unc_edu.key:/ssl.key \
  -v /data/certs/pfas-app-dev_renci_unc_edu.cer:/ssl.cer \
  --name opal-ui registry/opal:1.0.4
```
