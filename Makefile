# 📦 Load environment variables if .env file exists
ifneq (,$(wildcard .env))
  include .env
  export
endif

# 📁 Paths to certificates
CERT_DIR := ./.certs
CERT_KEY := $(CERT_DIR)/pfas-app-dev_renci_unc_edu.key
CERT_CRT := $(CERT_DIR)/pfas-app-dev_renci_unc_edu.cer

.PHONY: build push publish run

# ⚠️ Fail if IMAGE or TAG is not set
check-vars-%:
	@ if [ -z "${${*}}" ]; then \
		echo "❌ Error: The '$*' variable is required but not set."; \
		echo "💡 Please define it in the .env file or pass it directly with make $@ $*=<value>"; \
		exit 1; \
	fi

# 🛠️ Build the Docker image
build: check-vars-IMAGE check-vars-TAG
	@echo "🧱 Building Docker image $(IMAGE):$(TAG)"
	docker build -t $(IMAGE):$(TAG) .

# 📤 Push the Docker image
push: check-vars-IMAGE check-vars-TAG
	@echo "📦 Pushing Docker image $(IMAGE):$(TAG)"
	docker push $(IMAGE):$(TAG)

# 🚢 Build and push in one go
publish: build push

# 🔐 Generate or verify local SSL certificates
certs:
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

# ▶️ Run the Docker container
run: check-vars-IMAGE check-vars-TAG
	$(MAKE) certs
	@echo "🚀 Running Docker image $(IMAGE):$(TAG) on port 80"
	docker run --rm -d \
	  -p 8000:80 -p 443:443 \
	  -v $(CERT_KEY):/ssl.key \
	  -v $(CERT_CRT):/ssl.cer \
	  --name opal-ui $(IMAGE):$(TAG)

# 🛑 Stop the running container
stop:
	@echo "🛑 Stopping Docker container 'opal-ui'"
	docker stop opal-ui

# 🧹 Remove generated certs and other build artifacts
clean:
	@echo "🧼 Cleaning up generated files..."
	@rm -rf $(CERT_DIR)
