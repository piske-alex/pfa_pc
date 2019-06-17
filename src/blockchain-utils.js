/***
 * UI functions
 */

import aesjs from "aes-js";

import Web3 from "web3";

import { privateToAddress, toBuffer} from 'ethereumjs-util'

export function decrypt(text, key) {
  var encryptedBytes = aesjs.utils.hex.toBytes(text);

  // 解密時要建立另一個 Counter 實體
  key = key.getBytes();
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);

  // 將二進位資料轉換回文字
  return aesjs.utils.utf8.fromBytes(decryptedBytes);
}

export function convertToPureAccountObject({ address, privateKey }) {
  return { address, privateKey };
}

export function newAccount(accountName, paraphrase, privateKey) {
  if (localStorage.getItem(accountName)) {
    // Registered, throw error
    throw new Error("ValueError: account name is already used.");
  }
  //string,string(length<16)
  let acctobj;
  if(typeof privateKey === "string"){
    try{
      let address = privateToAddress(toBuffer(privateKey));
      acctobj = {address,privateKey};
    }catch (e) {
      throw new Error('RangeError: Wrong Private Key Format');
    }
    
  }else{
    acctobj = web3js.eth.accounts.create();
  }

  //padding
  let key = ("000000000000000000000000" + paraphrase).slice(-24);
  localStorage.setItem(
    `user-${accountName}`,
    encrypt(JSON.stringify(convertToPureAccountObject(acctobj)), key),
  );
  return acctobj;
}

export function readAccount(accountName, paraphrase) {
  let encryptedacctstring = localStorage.getItem(`user-${accountName}`);
  let key = ("000000000000000000000000" + paraphrase).slice(-24);
  let dec = decrypt(encryptedacctstring, key);
  return web3js.eth.accounts.privateKeyToAccount(JSON.parse(dec).privateKey);
}

export async function sendEther(acctobj, toa, valuea) {
  //object,string,string
  await acctobj
    .signTransaction(
      { to: toa, chainId:'48170', value: valuea, gas: 2000000, gasPrice: "0x0" },
       function(error, success) {
         if (!error) {
           //something for UI
           sendTransaction(success.rawTransaction,function(receipt){
             let hash = success.transactionHash;
             let type = 'out';
             let address = acctobj.address;
             let counterpartyaddress = toa;
             let currency = 'PFA';
           })
         } else {
           //something for UI
         }
       },
    )

}

export async function sendToken(contractaddress, acctobj, _to, amount) {
  let _from = acctobj.address;
  var count = await web3js.eth.getTransactionCount(_from);
  let contract = new web3js.eth.Contract(minABI, contractaddress);

  var rawTX = {
    from: _from,
    nonce: "0x" + count.toString(16),
    gasPrice: "0x0",
    gas: "0x30D40",
    to: contractaddress,
    value: "0x0",
    data: contract.methods
      .transfer(_to, web3js.utils.toBN(amount * 1e18).toString()) // michaellee8: changed from data.amount to amount
      .encodeABI(),
    chainId: '48170'
  };
  await web3.eth.accounts.signTransaction(rawTX, acctobj.privateKey, function(error, success) {
      if (!error) {
        //something for UI
          sendTransaction(success.rawTransaction,function(receipt){
            //TODO: post
        })
      } else {
        //something for UI
      }
    });


}

export async function USDTToIHAD(acctobj, amount) {
  let _from = acctobj.address;
  var count = await web3js.eth.getTransactionCount(_from);
  let contractaddress = "0xfbd0f2a657633c15637c6c21d45d1d5f78860e27";
  let contract = new web3js.eth.Contract(minABI, contractaddress);

  var rawTX = {
    from: _from,
    nonce: "0x" + count.toString(16),
    gasPrice: "0x0",
    gas: "0x30D40",
    to: contractaddress,
    value: "0x0",
    data: contract.methods
      .approve(_to, web3js.utils.toBN(amount * 1e18).toString()) // michaellee8: changed from data.amount to amount
      .encodeABI(),
    chainId: '0x0'
  };
  await web3.eth.accounts.signTransaction(rawTX, acctobj.privateKey, function(error, success) {
    if (!error) {
      //something for UI

      sendTransaction(success.rawTransaction, async function(receipt) {
        //TODO: post
        var exchangeaddress = "0xb173ce7c18dba7a3293edb62674f3d5118b3034d";
        let contract2 = new web3js.eth.Contract(minABI, exchangeaddress);
        var rawTX = {
          from: _from,
          nonce: "0x" + count.toString(16),
          gasPrice: "0x0",
          gas: "0x30D40",
          to: exchangeaddress,
          value: "0x0",
          data: contract2.methods
            .convertToIHAD() // michaellee8: changed from data.amount to amount
            .encodeABI(),
          chainId: '0x0'
        };
        await web3.eth.accounts.signTransaction(rawTX, acctobj.privateKey, function(error, success) {
          if (!error) {
            sendTransaction(success.rawTransaction, function(receipt) {
              // COMPLETE EXCHSNGE
            });
          }
        })
      })
    }else {
      //something for UI
    }
  });


}

export function etherBalance(acctobj) {
  //object
  let _from = acctobj.address;
  web3js.eth.getBalance(_from, "latest", function(error, success) {
    if (!error) {
      return success;
    }
  });
}

export function tokenBalance(acctobj, contractaddress) {
  //object
  let _from = acctobj.address;
  let contract = new web3js.eth.Contract(minABI, contractaddress);
  contract.methods.balanceOf(_from).call(function(err, result) {
    if(!err){
      return result;
    }
  })
}

export function readAccountList() {
  const accountNames = Array.apply(0, new Array(localStorage.length))
    .map(function(o, i) {
      return localStorage.key(i);
    })
    .filter(name => name.slice(0, 5) === "user-");
  return accountNames;
}

export function exportAccounts() {
  let obj = {};
  readAccountList().forEach(key => {
    obj[key] = localStorage.getItem(key);
  });
  return btoa(JSON.stringify(obj));
}

export function importAccounts(data) {
  let obj = JSON.parse(atob(data));
  Object.keys(obj).forEach(key => {
    localStorage.setItem(key, obj[key]);
  });
}

export function readHistory() {
  //TODO: implement history server
}

/***
 * Utility functions
 */
let web3js;

function ret(arg) {
  return arg;
}
export function initweb3() {
  /* Fallback to local node or remote node
       by default local HTTP-RPC server exposes port 8545.
       you can use web3js Node Urls also
       'https://ropsten.web3js.io/<API KEy>'*/
  web3js = new Web3(
    new Web3.providers.HttpProvider("https://quorum.mex.gold/"),
  );
}

String.prototype.getBytes = function() {
  var bytes = [];
  for (var i = 0; i < this.length; ++i) {
    bytes.push(this.charCodeAt(i));
  }
  return bytes;
};
// You should initialize web3 instance after window load event has fired to avoid any race condition.

// window.addEventListener("load", initweb3);

export function encrypt(text, key) {
  //strings
  key = key.getBytes();
  var textBytes = aesjs.utils.utf8.toBytes(text);

  // Counter 可省略，若省略則從 1 開始
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(textBytes);

  // 加密過後的資料是二進位資料，若要輸出可轉為十六進位格式
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  console.log(encryptedHex);
  return encryptedHex;
}

export function sendTransaction(rawTX,callback) {
  //private, not intended for UI use
  web3js.eth.sendSignedTransaction(rawTX).on("receipt", callback); //or define some functions
}

let minABI = [
  // transfer
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",

  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",

  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },

];

let USDTtoIHADABI = JSON.parse("[\n" +
  "\t{\n" +
  "\t\t\"constant\": false,\n" +
  "\t\t\"inputs\": [],\n" +
  "\t\t\"name\": \"convertToIHAD\",\n" +
  "\t\t\"outputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"\",\n" +
  "\t\t\t\t\"type\": \"bool\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"payable\": false,\n" +
  "\t\t\"stateMutability\": \"nonpayable\",\n" +
  "\t\t\"type\": \"function\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"constant\": false,\n" +
  "\t\t\"inputs\": [],\n" +
  "\t\t\"name\": \"convertToUSDT\",\n" +
  "\t\t\"outputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"\",\n" +
  "\t\t\t\t\"type\": \"bool\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"payable\": false,\n" +
  "\t\t\"stateMutability\": \"nonpayable\",\n" +
  "\t\t\"type\": \"function\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"constant\": false,\n" +
  "\t\t\"inputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"rate\",\n" +
  "\t\t\t\t\"type\": \"uint32\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"name\": \"setRetainRate\",\n" +
  "\t\t\"outputs\": [],\n" +
  "\t\t\"payable\": false,\n" +
  "\t\t\"stateMutability\": \"nonpayable\",\n" +
  "\t\t\"type\": \"function\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"constant\": false,\n" +
  "\t\t\"inputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"rate\",\n" +
  "\t\t\t\t\"type\": \"uint32\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"name\": \"setUSDTrate\",\n" +
  "\t\t\"outputs\": [],\n" +
  "\t\t\"payable\": false,\n" +
  "\t\t\"stateMutability\": \"nonpayable\",\n" +
  "\t\t\"type\": \"function\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"constant\": false,\n" +
  "\t\t\"inputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"newOwner\",\n" +
  "\t\t\t\t\"type\": \"address\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"name\": \"transferOwnership\",\n" +
  "\t\t\"outputs\": [],\n" +
  "\t\t\"payable\": false,\n" +
  "\t\t\"stateMutability\": \"nonpayable\",\n" +
  "\t\t\"type\": \"function\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"constant\": false,\n" +
  "\t\t\"inputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"amount\",\n" +
  "\t\t\t\t\"type\": \"uint256\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"name\": \"withdrawIHAD\",\n" +
  "\t\t\"outputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"\",\n" +
  "\t\t\t\t\"type\": \"bool\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"payable\": false,\n" +
  "\t\t\"stateMutability\": \"nonpayable\",\n" +
  "\t\t\"type\": \"function\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"constant\": false,\n" +
  "\t\t\"inputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"amount\",\n" +
  "\t\t\t\t\"type\": \"uint256\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"name\": \"withdrawUSDT\",\n" +
  "\t\t\"outputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"\",\n" +
  "\t\t\t\t\"type\": \"bool\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"payable\": false,\n" +
  "\t\t\"stateMutability\": \"nonpayable\",\n" +
  "\t\t\"type\": \"function\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"payable\": true,\n" +
  "\t\t\"stateMutability\": \"payable\",\n" +
  "\t\t\"type\": \"fallback\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"anonymous\": false,\n" +
  "\t\t\"inputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"indexed\": true,\n" +
  "\t\t\t\t\"name\": \"from_\",\n" +
  "\t\t\t\t\"type\": \"address\"\n" +
  "\t\t\t},\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"indexed\": true,\n" +
  "\t\t\t\t\"name\": \"to_\",\n" +
  "\t\t\t\t\"type\": \"address\"\n" +
  "\t\t\t},\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"indexed\": false,\n" +
  "\t\t\t\t\"name\": \"amount_\",\n" +
  "\t\t\t\t\"type\": \"uint256\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"name\": \"ConvertSuccessful\",\n" +
  "\t\t\"type\": \"event\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"anonymous\": false,\n" +
  "\t\t\"inputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"indexed\": true,\n" +
  "\t\t\t\t\"name\": \"from_\",\n" +
  "\t\t\t\t\"type\": \"address\"\n" +
  "\t\t\t},\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"indexed\": true,\n" +
  "\t\t\t\t\"name\": \"to_\",\n" +
  "\t\t\t\t\"type\": \"address\"\n" +
  "\t\t\t},\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"indexed\": false,\n" +
  "\t\t\t\t\"name\": \"amount_\",\n" +
  "\t\t\t\t\"type\": \"uint256\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"name\": \"ConvertFailed\",\n" +
  "\t\t\"type\": \"event\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"anonymous\": false,\n" +
  "\t\t\"inputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"indexed\": true,\n" +
  "\t\t\t\t\"name\": \"previousOwner\",\n" +
  "\t\t\t\t\"type\": \"address\"\n" +
  "\t\t\t},\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"indexed\": true,\n" +
  "\t\t\t\t\"name\": \"newOwner\",\n" +
  "\t\t\t\t\"type\": \"address\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"name\": \"OwnershipTransferred\",\n" +
  "\t\t\"type\": \"event\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"constant\": true,\n" +
  "\t\t\"inputs\": [],\n" +
  "\t\t\"name\": \"addressEcho\",\n" +
  "\t\t\"outputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"\",\n" +
  "\t\t\t\t\"type\": \"address\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"payable\": false,\n" +
  "\t\t\"stateMutability\": \"view\",\n" +
  "\t\t\"type\": \"function\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"constant\": true,\n" +
  "\t\t\"inputs\": [],\n" +
  "\t\t\"name\": \"getRetainRate\",\n" +
  "\t\t\"outputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"\",\n" +
  "\t\t\t\t\"type\": \"uint256\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"payable\": false,\n" +
  "\t\t\"stateMutability\": \"view\",\n" +
  "\t\t\"type\": \"function\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"constant\": true,\n" +
  "\t\t\"inputs\": [],\n" +
  "\t\t\"name\": \"getUSDTrate\",\n" +
  "\t\t\"outputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"\",\n" +
  "\t\t\t\t\"type\": \"uint256\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"payable\": false,\n" +
  "\t\t\"stateMutability\": \"view\",\n" +
  "\t\t\"type\": \"function\"\n" +
  "\t},\n" +
  "\t{\n" +
  "\t\t\"constant\": true,\n" +
  "\t\t\"inputs\": [],\n" +
  "\t\t\"name\": \"owner\",\n" +
  "\t\t\"outputs\": [\n" +
  "\t\t\t{\n" +
  "\t\t\t\t\"name\": \"\",\n" +
  "\t\t\t\t\"type\": \"address\"\n" +
  "\t\t\t}\n" +
  "\t\t],\n" +
  "\t\t\"payable\": false,\n" +
  "\t\t\"stateMutability\": \"view\",\n" +
  "\t\t\"type\": \"function\"\n" +
  "\t}\n" +
  "]")

export { web3js };
