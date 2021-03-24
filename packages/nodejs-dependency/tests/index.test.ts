import { expect } from './helpers/chai';
import { decode, encode } from '../index';

describe('encode', () => {
  const cases = [
    {
      input: Buffer.from('AlgNpn+WnJUoXljebKH35Q==', 'base64'),
      output: '09c0v9kzjte9aa2yb3f6s8fqwm',

    },
    {
      input: Buffer.from('Al+He7CepKF4idCBTIDQ0A==', 'base64'),
      output: '09freyxgktja2y49t20ms06gt0',
    },
    {
      input: Buffer.from('ApDjarlxPbHSL7SGz/JNEQ==', 'base64'),
      output: '0a8e6tnse4yv3mhfpj3czwjd24',
    }
  ];

  for (const { input, output } of cases) {
    it('should encode properly', () => {
      expect(encode(input)).to.deep.equal(output);
    });
  }
});

describe('decode', () => {
  const cases = [
    {
      input: '08e4bev5mkztbpq90q1yvphthc',
      output: Buffer.from('AhxFu2Wk/6Xa6QXD7do6iw==', 'base64'),
    },
    {
      input: '08zkr34sbd3t3dxmdzy0xtvh98',
      output: Buffer.from('Aj88DJlbR6G3tG/8DutxSg==', 'base64'),
    },
    {
      input: '090k7hw5mbbf32r7k4hcmfz72c',
      output: Buffer.from('AkEzx4Wi1vGLB5kiyj/nEw==', 'base64'),
    }
  ];

  for (const { input, output } of cases) {
    it('should decode properly', () => {
      expect(decode(input)).to.deep.equal(output);
    });
  }
});
