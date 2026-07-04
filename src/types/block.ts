export interface BlockType {
  id: number;
  nonce: number;
  data: string;
  previousHash: string;
  hash: string;
  isValid: boolean;
}
