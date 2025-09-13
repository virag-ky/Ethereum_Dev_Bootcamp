import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex, hexToBytes, utf8ToBytes } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

const PRIVATE_KEY = hexToBytes(
  "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e"
); // just a practice string

// 1.) Hash the message
function messageToHash(message) {
  // turn message into array of bytes
  const bytes = utf8ToBytes(message);
  // hash it
  const hash = keccak256(bytes);

  return hash;
}

// 2.) Sign the message
function signTheMessage(message) {
  return secp256k1.sign(message, PRIVATE_KEY);
}

// 3.) Get the public key
function getThePublicKey(privateKey) {
  return secp256k1.getPublicKey(privateKey);
}

// 4.) Recover the public key
function recoverThePublicKey(message, signature) {
  return signature.recoverPublicKey(message);
}

// 5.) Key to Address
function getAddressFromKey(p_Key) {
  // remove first byte then take the keccak hash of the rest
  const modifiedKey = keccak256(p_Key.slice(1));
  // take the last 20 bytes and convert it to hex for readability
  const addressBytes = toHex(modifiedKey.slice(-20));

  return addressBytes;
}

(async () => {
  const msg = "hello";
  const publicKey = getThePublicKey(PRIVATE_KEY);
  const hashedMsg = messageToHash(msg);
  const signature = await signTheMessage(hashedMsg);
  const recoveredPublicKey = recoverThePublicKey(hashedMsg, signature);
  console.log(getAddressFromKey(publicKey));
})();
