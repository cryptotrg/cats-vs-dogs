install:
	npm install --save-dev hardhat
	npm install --save-dev @nomiclabs/hardhat-ethers ethers
	yarn add @coreui/vue
	cd app && yarn install

runserver:
	cd app && yarn serve

deploy-polygon:
	npx hardhat run scripts/deploy.js --network polygon

deploy-base:
	npx hardhat run scripts/deploy.js --network base

deploy-zora:
	npx hardhat run scripts/deploy.js --network zora

deploy-xlayer:
	npx hardhat run scripts/deploy.js --network xlayer

check-polygon:
	npx hardhat run scripts/check.js --network polygon
