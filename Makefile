.PHONY: help install build test test-unit test-e2e watch debug package publish clean

help: ## Show this help
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

build: ## Build the extension
	npm run compile

test: ## Run all tests
	npm run test

test-unit: ## Run unit tests only
	npm run test:unit

test-e2e: ## Run end-to-end tests only
	npm run test:e2e

watch: ## Watch for changes and rebuild
	npm run watch

debug: ## Launch extension in debug mode
	code --extensionDevelopmentPath=$(PWD)

package: ## Package extension for distribution
	npm run package

publish: ## Publish to VS Code marketplace
	npm run publish

clean: ## Clean build artifacts
	rm -rf out/
	rm -rf node_modules/
	rm -f *.vsix