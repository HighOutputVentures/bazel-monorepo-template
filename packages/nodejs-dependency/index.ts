import base32 from 'base32.js';

export function encode(message: Buffer): string {
  const encoder = new base32.Encoder({ type: 'crockford', lc: true });
  return encoder.write(message).finalize();
}

export function decode(message: string): Buffer {
  const decoder = new base32.Decoder({ type: 'crockford' });
  return decoder.write(message).finalize();
}