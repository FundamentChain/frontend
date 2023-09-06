import { Injectable, effect } from '@angular/core';
import { ethers } from 'ethers';
import { MetamaskService } from '../services/metamask.service';
import { AlchemyService } from '../services/alchemy.service';

const abi =  [{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "admistrator",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "campaignsAddress",
      "type": "address"
    }
  ],
  "name": "CampaignCreated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "bytes32",
      "name": "role",
      "type": "bytes32"
    },
    {
      "indexed": true,
      "internalType": "bytes32",
      "name": "previousAdminRole",
      "type": "bytes32"
    },
    {
      "indexed": true,
      "internalType": "bytes32",
      "name": "newAdminRole",
      "type": "bytes32"
    }
  ],
  "name": "RoleAdminChanged",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "bytes32",
      "name": "role",
      "type": "bytes32"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "account",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "sender",
      "type": "address"
    }
  ],
  "name": "RoleGranted",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "bytes32",
      "name": "role",
      "type": "bytes32"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "account",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "sender",
      "type": "address"
    }
  ],
  "name": "RoleRevoked",
  "type": "event"
},
{
  "inputs": [],
  "name": "CAMPAIGN_CREATOR",
  "outputs": [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "DEFAULT_ADMIN_ROLE",
  "outputs": [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "campaignsAddress",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_campaignReceiver",
      "type": "address"
    },
    {
      "internalType": "string",
      "name": "_campaignIpfs",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "_amountRequesting",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_campaignEndTime",
      "type": "uint256"
    }
  ],
  "name": "createCampaign",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "index",
      "type": "uint256"
    }
  ],
  "name": "getReceiverCampaignByIndex",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    }
  ],
  "name": "getReceiverCampaignsSize",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "bytes32",
      "name": "role",
      "type": "bytes32"
    }
  ],
  "name": "getRoleAdmin",
  "outputs": [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "bytes32",
      "name": "role",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    }
  ],
  "name": "grantRole",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "bytes32",
      "name": "role",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    }
  ],
  "name": "hasRole",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "bytes32",
      "name": "role",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    }
  ],
  "name": "renounceRole",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "bytes32",
      "name": "role",
      "type": "bytes32"
    },
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    }
  ],
  "name": "revokeRole",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "bytes4",
      "name": "interfaceId",
      "type": "bytes4"
    }
  ],
  "name": "supportsInterface",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
]

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {

  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  signer = this.provider.getSigner();
  currentChainId = this.metamaskService.currentChainId;
  currentAccount = this.metamaskService.currentAccount;
  balance = this.metamaskService.balance;
  proposal: any;
  campaignCreator: any;

  contract = new ethers.Contract("0x92D001feCB274E5c5578BaBe9358c688C97d1aDd", abi)

  constructor (
    private metamaskService: MetamaskService,
    private alchemyService: AlchemyService) {

      effect(async () => {
        alert(await this.viewFunction())
        this.campaignCreator = await this.viewFunction()
      });
  }

  async createProposal(
    proposalName: string,
    amountRequested: string,
    timestamp: string,
    category: string,
    description: string,
  ) {
    const reciever =  this.currentAccount();

    const amountNumber = Number(amountRequested)
    const timestampNumber = Number(timestamp)

    try {
      const tx = await this.contract.createCampaign(
        reciever,
        "",
        amountNumber,
        timestampNumber
      );
      alert("tx created")
      await tx.wait();
      alert(tx.hash)
      return tx.hash; 
    }

    catch{
      alert("Error occured during the transaction! Confirm input")
      return "Error"
    }
  }

  async viewFunction() {
    alert(await this.contract.CAMPAIGN_CREATOR())
    return await this.contract.CAMPAIGN_CREATOR()
  }

}
