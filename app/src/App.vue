<template>
  <div class="container" style="max-width: 30em">
    <div class="row my-2">
      <div class="col text-center">
        <a href="https://basescan.org/address/0x4bd4D3D980BeDF77cB91B23D26202c49E2b413B7" target="_blank">Base network</a>
        <h1>Cats vs Dogs</h1>
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
          Last voter: <span>{{ lastVoter }}</span>
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
import VotingContractABI from './VotingContractABI';

export default {
  data() {
    return {
      catVotes: 0,
      dogVotes: 0,
      lastVoter: '...',
      isWalletConnected: false,
      votingContract: null,
      loadingCatVotes: false,
      loadingDogVotes: false,
      contractAddress: '0x4bd4D3D980BeDF77cB91B23D26202c49E2b413B7'
    };
  },
  methods: {
    async connectWallet() {
      if (window.ethereum == null) {
        alert("MetaMask not installed; using read-only defaults")
        return;
      }

      let provider = new ethers.BrowserProvider(window.ethereum)
      let signer = await provider.getSigner();

      console.log('Connecting wallet...');
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const signerAddress = await signer.getAddress();
      console.log('Signer address:', signerAddress);

      console.log('Creating contract...');
      this.votingContract = new ethers.Contract(this.contractAddress, VotingContractABI, signer);

      console.log('Updating votes...');
      this.isWalletConnected = true;
      await this.updateVotes();
      console.log('Wallet connected successfully.');
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