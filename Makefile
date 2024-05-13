install:
	npm install --save-dev hardhat

deploy-polygon:
	npx hardhat run scripts/deploy.js --network polygon
