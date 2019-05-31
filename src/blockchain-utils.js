/***
 * UI functions
 */

import aesjs from "aes-js";

import Web3 from "web3";

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

export function newAccount(accountName, paraphrase) {
  if (localStorage.getItem(accountName)) {
    // Registered, throw error
    throw new Error("ValueError: account name is already used.");
  }
  //string,string(length<16)
  let acctobj = web3js.eth.accounts.create();
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
      { to: toa, value: valuea, gas: 2000000, gasPrice: "0x0" },
      // function(error, success) {
      //   if (!error) {
      //     //something for UI
      //   } else {
      //     //something for UI
      //   }
      // },
    )
    .then(sendTransaction);
}

export async function sendToken(contractaddress, acctobj, _to, amount) {
  let _from = acctobj.address;
  var count = await web3js.eth.getTransactionCount(_from);
  let contract = new web3js.eth.Contract(minABI, contractaddress);

  var rawTransaction = {
    from: _from,
    nonce: "0x" + count.toString(16),
    gasPrice: "0x0",
    gas: "0x30D40",
    to: contractaddress,
    value: "0x0",
    data: contract.methods
      .transfer(_to, web3js.utils.toBN(amount * 1e18).toString()) // michaellee8: changed from data.amount to amount
      .encodeABI(),
    //"chainId": 0x01
  };
  await acctobj
    .signTransaction(rawTransaction, function(error, success) {
      if (!error) {
        //something for UI
      } else {
        //something for UI
      }
    })
    .then(sendTransaction);
  return;
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
}

export function readAccountList() {
  const accountNames = Array.apply(0, new Array(localStorage.length))
    .map(function(o, i) {
      return localStorage.key(i);
    })
    .filter(name => name.slice(0, 5) === "user-");
  return accountNames;
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

export function sendTransaction(rawTX) {
  //private, not intended for UI use
  web3js.eth.sendSignedTransaction(rawTX).on("receipt", console.log); //or define some functions
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
];

export { web3js };
