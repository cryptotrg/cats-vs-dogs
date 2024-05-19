install:
	npm install --save-dev hardhat
	npm install --save-dev @nomiclabs/hardhat-ethers ethers

deploy-polygon:
	npx hardhat run scripts/deploy.js --network polygon

deploy-base:
	npx hardhat run scripts/deploy.js --network base

check-polygon:
	npx hardhat run scripts/check.js --network polygon
