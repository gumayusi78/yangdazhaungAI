import { webcrypto } from 'crypto';

if (!globalThis.crypto) {
  globalThis.crypto = {
    getRandomValues: function <T extends ArrayBufferView>(array: T): T {
      if (!(array instanceof Uint8Array)) {
        throw new TypeError('only Uint8Array is supported');
      }
      crypto.randomFillSync(array);
      return array;
    },
  } as Crypto;
}