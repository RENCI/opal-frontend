# 📦 Load environment variables if .env file exists
ifneq (,$(wildcard .env))
  include .env
  export
endif

# ============
# 📦 AUTOPHONY
# ============

# Auto-detect targets with help comments
PHONY_TARGETS := $(shell awk -F':.*?##' '/^[a-zA-Z0-9_.-]+:.*##/ {print $$1}' $(MAKEFILE_LIST))
.PHONY: help $(PHONY_TARGETS)

# =========
# CONSTANTS
# =========
.DEFAULT_GOAL := help
CONTAINER_NAME := opal-ui
# 📁 Certificate paths
CERT_DIR := ./.certs
CERT_KEY := $(CERT_DIR)/pfas-app-dev_renci_unc_edu.key
CERT_CRT := $(CERT_DIR)/pfas-app-dev_renci_unc_edu.cer

check: check-vars-IMAGE check-vars-TAG check-vars-ONYEN check-vars-DEPLOY_ENV ## ✅ Check all required env vars
	@echo "✅ All required environment variables are set."

# ⚠️ Fail if variable is not set
check-vars-%:
	@ if [ -z "$${${*}}" ]; then \
		echo "❌ Error: The '$*' variable is required but not set."; \
		echo "💡 Please define it in the .env file or pass it directly with make $@ $*=<value>"; \
		exit 1; \
	fi

##@ Help Commands

help: ## 📖 Show help
	@awk ' \
		BEGIN {FS = ":.*?## "}; \
		/^[a-zA-Z0-9_.-]+:.*?##/ {printf "• \033[36m%-20s\033[0m %s\n", $$1, $$2}; \
		/^##@/ {printf "\n\033[1m%s\033[0m\n", substr($$0, 5)} \
	' $(MAKEFILE_LIST)

##@ Docker Commands

pull: check-vars-IMAGE check-vars-TAG ## 📥 Pull the Docker image
	docker pull $(IMAGE):$(TAG)

build: check-vars-IMAGE check-vars-TAG ## 🛠️ Build the Docker image
	@echo "🧱 Building Docker image $(IMAGE):$(TAG)"
	docker build -t $(IMAGE):$(TAG) .

certs: ## 🔐 Generate or verify local SSL certificates
	@echo "🔐 Ensuring local certs exist in $(CERT_DIR)..."
	@mkdir -p $(CERT_DIR)
	@if [ ! -f "$(CERT_KEY)" ] || [ ! -f "$(CERT_CRT)" ]; then \
		if command -v mkcert >/dev/null 2>&1; then \
			echo "✨ Using mkcert to generate dev certs..."; \
			mkcert -key-file $(CERT_KEY) -cert-file $(CERT_CRT) localhost 127.0.0.1 ::1; \
		else \
			echo "🔧 mkcert not found, falling back to openssl..."; \
			openssl req -x509 -newkey rsa:2048 -nodes \
				-keyout $(CERT_KEY) -out $(CERT_CRT) -days 365 \
				-subj "/CN=localhost" \
				-addext "subjectAltName=DNS:localhost,IP:127.0.0.1"; \
		fi \
	else \
		echo "✅ Certs already exist — skipping regeneration."; \
	fi

run: check-vars-IMAGE check-vars-TAG ## ▶️ Run the Docker container
	$(MAKE) certs
	@echo "🚀 Running Docker image $(IMAGE):$(TAG) on port 80"
	docker run --rm -d \
		-p 80:80 -p 443:443 \
		-v $(CERT_KEY):/ssl.key \
		-v $(CERT_CRT):/ssl.cer \
		--name $(CONTAINER_NAME) $(IMAGE):$(TAG)

stop: ## 🛑 Stop the running container
	@echo "🛑 Stopping Docker container '$(CONTAINER_NAME)' if running"
	docker ps -q -f name=$(CONTAINER_NAME) | grep -q . && docker stop $(CONTAINER_NAME)

rebuild: stop build run ## 🔄 Stop, build, and run fresh

push: check-vars-IMAGE check-vars-TAG ## 📤 Push the Docker image
	@echo "📦 Pushing Docker image $(IMAGE):$(TAG)"
	docker push $(IMAGE):$(TAG)

publish: build push ## 🚀 Build and push in one go

clean: ## 🧹 Remove generated certs and other build artifacts
	@echo "🧼 Cleaning up generated files..."
	@rm -rf $(CERT_DIR)

##@ Deployment Commands

deploy: check-vars-IMAGE check-vars-TAG check-vars-ONYEN check-vars-DEPLOY_ENV ## 🚢 Deploy app to specific environment
	ssh $(ONYEN)@pfas-app-$(DEPLOY_ENV).mdc.renci.unc.edu "DEPLOY_ENV=$(DEPLOY_ENV) bash -s -- $(IMAGE) $(TAG)" < deploy.sh

deploy-dev: check-vars-IMAGE check-vars-TAG check-vars-ONYEN ## 🚢 Deploy to dev VM
	$(MAKE) deploy DEPLOY_ENV=dev

deploy-prod: check-vars-IMAGE check-vars-TAG check-vars-ONYEN check-vars-DEPLOY_ENV  ## 🚢 Deploy to prod VM
	@read -p "🚨 Are you sure you want to deploy to PROD? Type 'yes' to continue: " confirm; \
	if [ "$$confirm" != "yes" ]; then \
		echo "❌ Aborted PROD deployment."; exit 1; \
	else \
		$(MAKE) deploy DEPLOY_ENV=prod; \
	fi
