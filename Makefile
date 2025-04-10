ifneq (,$(wildcard .env))
  include .env
  export
endif

.PHONY: build push publish run

# Fail if IMAGE or TAG is not set
check-vars-%:
	@ if [ -z "${${*}}" ]; then \
		echo "Error: The '$*' variable is required but not set."; \
		echo "Please define it in the .env file or pass it directly with make $@ $*=<value>"; \
		exit 1; \
	fi

build: check-vars-IMAGE check-vars-TAG
	@echo "Building Docker image $(IMAGE):$(TAG)"
	docker build -t $(IMAGE):$(TAG) .

push: check-vars-IMAGE check-vars-TAG
	@echo "Pushing Docker image $(IMAGE):$(TAG)"
	docker push $(IMAGE):$(TAG)

publish: build push

run: check-vars-IMAGE check-vars-TAG
	@echo "Running Docker image $(IMAGE):$(TAG) on port 80"
	docker run --rm -p 80:80 $(IMAGE):$(TAG)
