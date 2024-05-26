install:
	npm install --save-dev hardhat
	npm install --save-dev @nomiclabs/hardhat-ethers ethers
	yarn add @coreui/vue
	cd app && yarn install

serve:
	cd app && yarn serve

build:
	cd app && yarn build

deploy-polygon:
	npx hardhat run scripts/deploy.js --network polygon

deploy-base:
	npx hardhat run scripts/deploy.js --network base

deploy-zora:
	npx hardhat run scripts/deploy.js --network zora

deploy-xlayer:
	npx hardhat run scripts/deploy.js --network xlayer

deploy-zkevm:
	npx hardhat run scripts/deploy.js --network zkevm

deploy-scroll:
	npx hardhat run scripts/deploy.js --network scroll

deploy-mode:
	npx hardhat run scripts/deploy.js --network mode

deploy-linea:
	npx hardhat run scripts/deploy.js --network linea
