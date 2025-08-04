import { addConstant, sbox, linear } from './cryptoOperations';
import { stringToBlocks, blocksToString } from './stringConversion';

export interface EncryptionConfig {
    nonce: bigint[];
    key: bigint[];
    IV: bigint;
    associatedDataText: bigint[];
}

export const defaultConfig: EncryptionConfig = {
    nonce: [0x0000000000000001n, 0x0000000000000002n],
    key: [0n, 0n],
    IV: 0x80400c0600000000n,
    associatedDataText: [0x787878n, 0x878787n, 0x09090n]
};

function p(state: bigint[], a: number): void {
    for (let i = 0; i < a; i++) {
        addConstant(state, i, a);
        sbox(state);
        linear(state);
    }
}

function initialization(state: bigint[], key: bigint[]): void {
    p(state, 12);
    state[3] ^= key[0];
    state[4] ^= key[1];
}

function associatedData(state: bigint[], length: number, associatedDataText: bigint[]): void {
    for (let i = 0; i < length; i++) {
        state[0] ^= associatedDataText[i];
        p(state, 6);
    }
    state[4] ^= 0x1n;
}

export function encrypt(text: string, config: EncryptionConfig = defaultConfig): { ciphertext: string; tag: string } {
    const plaintextBlocks = stringToBlocks(text);
    const state = [config.IV, config.key[0], config.key[1], config.nonce[0], config.nonce[1]];
    const ciphertext = new Array(plaintextBlocks.length);

    initialization(state, config.key);
    associatedData(state, config.associatedDataText.length, config.associatedDataText);

    // Encryption
    ciphertext[0] = plaintextBlocks[0] ^ state[0];
    for (let i = 1; i < plaintextBlocks.length; i++) {
        p(state, 6);
        ciphertext[i] = plaintextBlocks[i] ^ state[0];
        state[0] = ciphertext[i];
    }

    return {
        ciphertext: ciphertext.map(block => block.toString(16).padStart(16, '0')).join(''),
        tag: state[4].toString(16).padStart(16, '0')
    };
}

export function decrypt(ciphertextHex: string, config: EncryptionConfig = defaultConfig): { plaintext: string; tag: string } {
    // Convert hex string to blocks
    const ciphertext = ciphertextHex.match(/.{1,16}/g)?.map(hex => BigInt('0x' + hex)) || [];
    const state = [config.IV, config.key[0], config.key[1], config.nonce[0], config.nonce[1]];
    const decryptedBlocks = new Array(ciphertext.length);

    initialization(state, config.key);
    associatedData(state, config.associatedDataText.length, config.associatedDataText);

    // Decryption
    decryptedBlocks[0] = ciphertext[0] ^ state[0];
    for (let i = 1; i < ciphertext.length; i++) {
        p(state, 6);
        decryptedBlocks[i] = ciphertext[i] ^ state[0];
        state[0] = ciphertext[i];
    }

    return {
        plaintext: blocksToString(decryptedBlocks),
        tag: state[4].toString(16).padStart(16, '0')
    };
}