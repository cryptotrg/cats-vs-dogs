<template>
  <div class="container" style="max-width: 30em">
    <div class="row my-2">
      <div class="col text-center">
        <ul class="nav nav-pills my-3 d-flex justify-content-center" role="tablist">
          <li class="nav-item" v-for="(network, name) in networks" :key="name">
            <a class="nav-link" href="#" :class="{ active: selectedNetworkName === name }" @click="switchNetwork(name)">{{ name }}</a>
          </li>
        </ul>
        <h1 class="mb-3 mt-1">Cats vs Dogs</h1>
      </div>
    </div>
    <div v-if="isWalletConnected">
      <div class="row my-2">
        <div class="col text-center">
          <span class="h1">
            <span v-if="loadingCatVotes" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>{{ catVotes }}</span>
          </span>
        </div>
        <div class="col text-center">
          <span class="h1">
            <span v-if="loadingDogVotes" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>{{ dogVotes }}</span>
          </span>
        </div>
      </div>
      <div class="row my-2">
        <div class="col text-center">
          <button class="btn btn-primary w-100" @click="voteForCats">Cats</button>
        </div>
        <div class="col text-center">
          <button class="btn btn-primary w-100" @click="voteForDogs">Dogs</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col text-center text-nowrap text-muted text-small">
          <p>Last voter:<br> <span>{{ lastVoter }}</span></p>
          <a :href="networks[selectedNetworkName].scanUrl" target="_blank">View on Explorer</a>
        </div>
      </div>
    </div>
    <div v-else class="row my-2" >
      <button class="btn btn-primary w-100" @click="connectWallet">Connect Metamask</button>
    </div>
  </div>
</template>

<script>
import {ethers} from 'ethers';

import abi from './data/abi.json';
import networksData from './data/networks.json';

export default {
  data() {
    return {
      selectedNetworkName: 'Base',
      networks: networksData,
      catVotes: 0,
      dogVotes: 0,
      lastVoter: '...',
      isWalletConnected: false,
      votingContract: null,
      loadingCatVotes: false,
      loadingDogVotes: false,
    };
  },
  methods: {
    switchNetwork(name) {
      this.selectedNetworkName = name;
      this.connectWallet();
    },
    async connectWallet() {
      if (window.ethereum == null) {
        alert("MetaMask not installed; using read-only defaults")
        return;
      }

      const selectedNetwork = this.networks[this.selectedNetworkName];

      let provider = new ethers.BrowserProvider(window.ethereum)
      provider.getSigner().then(signer => {
        console.log('Connecting wallet...');
        return window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(() => {
              return window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: selectedNetwork.chainId }],
              }).catch(switchError => {
                if (switchError.code === 4902) {
                  return window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                      chainId: selectedNetwork.chainId,
                      chainName: selectedNetwork.chainName,
                      rpcUrls: selectedNetwork.rpcUrls,
                      nativeCurrency: selectedNetwork.nativeCurrency,
                    }],
                  });
                }
                throw switchError;
              });
            })
            .then(() => {
              this.votingContract = new ethers.Contract(selectedNetwork.contractAddress, abi, signer);
              this.isWalletConnected = true;
              return this.updateVotes();
            })
            .catch(error => {
              alert('Failed to connect to ' + this.selectedNetworkName + ' network');
              console.log('Error connecting wallet:', error);
              // throw error;
              // if (error.code === 4001) {
              //   console.error('User rejected request');
              //   alert('User rejected request');
              // } else {
              //   console.error('Error connecting wallet:', error);
              //   // alert('Failed to connect wallet');
              // }
            });
        });
    },
    async voteForCats() {
      if (!this.isWalletConnected || !this.votingContract) {
        return;
      }
      this.loadingCatVotes = true;
      this.votingContract.voteForCat()
        .then(tx => tx.wait())
        .then(() => this.updateVotes())
        .catch(error => {
            console.error('Error voting for cats:', error);
        }).
        finally(() => {
          this.loadingCatVotes = false;
        });
    },
    async voteForDogs() {
      if (!this.isWalletConnected || !this.votingContract) {
        return;
      }
      this.loadingDogVotes = true;
      this.votingContract.voteForDog()
        .then(tx => tx.wait())
        .then(() => this.updateVotes())
        .catch(error => {
            console.error('Error voting for dogs:', error);
        }).
        finally(() => {
          this.loadingDogVotes = false;
        });
    },
    async updateVotes() {
      this.catVotes = await this.votingContract.catVotes();
      this.dogVotes = await this.votingContract.dogVotes();
      this.lastVoter = await this.votingContract.lastVoter();
    }
  },
};
</script>

<style scoped>
</style>
