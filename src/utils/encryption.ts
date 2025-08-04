// Encryption logic implementation
export const constants = [
    0xf0n, 0xe1n, 0xd2n, 0xc3n, 0xb4n, 0xa5n, 0x96n, 0x87n,
    0x78n, 0x69n, 0x5an, 0x4bn, 0x3cn, 0x2dn, 0x1en, 0x0fn
];

export function rotate(x: bigint, l: number): bigint {
    return ((x >> BigInt(l)) | (x << BigInt(64 - l))) & 0xFFFFFFFFFFFFFFFFn;
}

// ... [Previous encryption functions remain the same, just add TypeScript types]

export const defaultConfig = {
    nonce: [0x0000000000000001n, 0x0000000000000002n],
    key: [0n, 0n],
    IV: 0x80400c0600000000n,
    associatedDataText: [0x787878n, 0x878787n, 0x09090n]
};