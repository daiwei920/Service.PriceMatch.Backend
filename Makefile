#!/usr/bin/env make
CDK = "./node_modules/.bin/cdk"

.PHONY: init
init: 
	@$(CDK) bootstrap aws://466333965117/ap-southeast-2

.PHONY: build
build: 
	@npm install
	#@npm run build
	@$(MAKE) -C ./src/lambdas pack

.PHONY: test
test: 
	@npm run test

.PHONY: deploy
deploy: build
	@$(CDK) deploy --exclusively --require-approval never

.PHONY: destroy
destroy: build 
	$(CDK) destroy --force --exclusively

.PHONY: clean
clean: 
	rm -rf ./node_modules
	rm -rf ./build
	$(MAKE) -C ./src/lambdas clean

.PHONY: lint_fix
lint_fix:
	@npm run lint:fix