#!/usr/bin/env make

.PHONY: clean
clean: 
	rm -rf ./libs ./package

.PHONY: pack
pack: 
	pip3 install --target ./libs requests
	mkdir package	
	cd libs && zip -r ../package/lambda_service_price_checker.zip .
	zip -g package/lambda_service_price_checker.zip index.py 

