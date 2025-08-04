// Core cryptographic operations
export function rotate(x: bigint, l: number): bigint {
    return ((x >> BigInt(l)) | (x << BigInt(64 - l))) & 0xFFFFFFFFFFFFFFFFn;
}

export function addConstant(state: bigint[], i: number, a: number): void {
    state[2] ^= constants[12 - a + i];
}

export function sbox(state: bigint[]): void {
    let t = [...state];
    t = t.map(x => ~x & 0xFFFFFFFFFFFFFFFFn);
    t[0] &= state[1]; t[1] &= state[2]; t[2] &= state[3]; t[3] &= state[4]; t[4] &= state[0];
    state[0] ^= t[1]; state[1] ^= t[2]; state[2] ^= t[3]; state[3] ^= t[4]; state[4] ^= t[0];
    state[1] ^= state[0]; state[0] ^= state[4]; state[3] ^= state[2]; state[2] = ~state[2];
}

export function linear(state: bigint[]): void {
    let temp0, temp1;
    temp0 = rotate(state[0], 19); temp1 = rotate(state[0], 28); state[0] ^= temp0 ^ temp1;
    temp0 = rotate(state[1], 61); temp1 = rotate(state[1], 39); state[1] ^= temp0 ^ temp1;
    temp0 = rotate(state[2], 1); temp1 = rotate(state[2], 6); state[2] ^= temp0 ^ temp1;
    temp0 = rotate(state[3], 10); temp1 = rotate(state[3], 17); state[3] ^= temp0 ^ temp1;
    temp0 = rotate(state[4], 7); temp1 = rotate(state[4], 41); state[4] ^= temp0 ^ temp1;
}

export const constants = [
    0xf0n, 0xe1n, 0xd2n, 0xc3n, 0xb4n, 0xa5n, 0x96n, 0x87n,
    0x78n, 0x69n, 0x5an, 0x4bn, 0x3cn, 0x2dn, 0x1en, 0x0fn
];