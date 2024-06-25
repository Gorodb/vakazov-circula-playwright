DOCKER_IMAGE := rvakazov/vakazov-playwright-docker-circula

.PHONY: build
build:
	docker build -t ${DOCKER_IMAGE} .

.PHONY: update
update:
	docker build --no-cache --pull --tag "$(DOCKER_IMAGE)" .
	docker push "$(DOCKER_IMAGE)"

.PHONY: pull
pull:
	docker pull ${DOCKER_IMAGE}

.PHONY: run
run:
	docker run -it ${DOCKER_IMAGE} npm test
