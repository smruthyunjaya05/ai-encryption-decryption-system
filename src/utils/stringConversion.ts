export function stringToBlocks(input: string): bigint[] {
    const blocks: bigint[] = [];
    for (let i = 0; i < input.length; i += 8) {
        let block = 0n;
        for (let j = 0; j < 8 && i + j < input.length; j++) {
            block = (block << 8n) | BigInt(input.charCodeAt(i + j));
        }
        if (i + 8 > input.length) {
            const padding = 8 - (input.length - i);
            block <<= BigInt(padding * 8);
            block |= 0x80n << BigInt((padding - 1) * 8);
        }
        blocks.push(block);
    }
    return blocks;
}

export function blocksToString(blocks: bigint[]): string {
    let result = '';
    for (const block of blocks) {
        for (let j = 7; j >= 0; j--) {
            const byte = Number((block >> BigInt(j * 8)) & 0xFFn);
            if (byte === 0x80) return result;
            result += String.fromCharCode(byte);
        }
    }
    return result;
}