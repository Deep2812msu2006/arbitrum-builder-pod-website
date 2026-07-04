/**
 * Computes the SHA-256 hash of a string using the browser's Web Crypto API.
 * @param message The input string to hash.
 * @returns A promise that resolves to the hex string representation of the hash.
 */
export async function calculateHash(message: string): Promise<string> {
  // Encode message as UTF-8
  const msgBuffer = new TextEncoder().encode(message);
  
  // Hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  
  // Convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  
  // Convert bytes to hex string
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  
  return hashHex;
}
