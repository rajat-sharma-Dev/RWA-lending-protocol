import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://rpc.testnet.rootstock.io/API-KEY");
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

const EASContractAddress = '0xc300aeeadd60999933468738c9f5d7e9c0671e1c';
const eas = new EAS(EASContractAddress);
eas.connect(signer);

const schemaUID = '0x8dd93828aec3c54db4684251d47cdc259896dc762f211216efeb572d82288dc8';

export async function attestRWA(asset, vow) {
  const encoder = new SchemaEncoder('string asset,string vow');
  const encodedData = encoder.encodeData([
    { name: 'asset', value: asset, type: 'string' },
    { name: 'vow', value: vow, type: 'string' }
  ]);

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: '0x0000000000000000000000000000000000000000',
      expirationTime: BigInt(0),
      revocable: true,
      data: encodedData,
    },
  });

  const attestation = await tx.wait();
  console.log("Attestation submitted:", attestation);
  return attestation;
}