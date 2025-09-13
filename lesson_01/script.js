import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";

// 1.) Hash the message
function messageToHash(message) {
  // turn the message to an array of bytes
  const bytes = utf8ToBytes(message);
  // hash the message
  const hashedMessage = toHex(keccak256(bytes));

  return hashedMessage;
}

// 2.) Sign the message
