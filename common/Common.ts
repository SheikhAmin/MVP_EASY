// @ts-ignore
import path from "path";
// @ts-ignore
import fs from "fs";

export class Common {
  generateRandomStringWithNumber(length: number = 9): string {
    if (length < 8) {
      throw new Error("Password length must be at least 8 characters");
    }

    const uppercaseLetters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters: string = "abcdefghijklmnopqrstuvwxyz";
    const digits: string = "0123456789";
    const specialChars: string = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const allChars: string =
      uppercaseLetters + lowercaseLetters + digits + specialChars;

    let result: string = "";

    // Ensure at least one uppercase letter
    result += uppercaseLetters.charAt(
      Math.floor(Math.random() * uppercaseLetters.length)
    );

    // Ensure at least 1 special character
    result += specialChars.charAt(
      Math.floor(Math.random() * specialChars.length)
    );

    // Ensure at least 2 digits
    for (let i: number = 0; i < 2; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    // Fill the rest of the string
    const remainingLength: number = length - result.length;
    for (let i: number = 0; i < remainingLength; i++) {
      result += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Shuffle the result to randomize the positions
    result = result
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    return result;
  }

  generateDummyEmail(): string {
    const timestamp: number = Date.now();
    return `user${timestamp}@example.com`;
  }

  getCredentials() {
    // get login credentials
    const fixturePath: string = path.join("fixtures", "credentials.json"); // fixturePath is a string
    // check if credentials file exist
    if (!fs.existsSync(fixturePath)) {
      throw new Error(`Credentials file not found at ${fixturePath}`);
    }

    // Define the expected structure of credentials
    interface Credentials {
      userName: string;
      pass: string;
      id: string;
    }

    // Read and parse credentials from the JSON file
    const credentials: Credentials = JSON.parse(fs.readFileSync(fixturePath, "utf-8")); // credentials is of type credentials
    return credentials;
  }

  getCustomerCredentials() {
    // get customer credentials
    const fixturePath: string = path.join("fixtures", "customer_credentials.json"); // fixturePath is a string
    // check if credentials file exist
    if (!fs.existsSync(fixturePath)) {
      throw new Error(`Customer credentials file not found at ${fixturePath}`);
    }

    // Define the expected structure of customer credentials
    interface CustomerCredentials {
      company_name: string;
      user_name: string;
      account_no: string;
    }

    // Read and parse customer credentials from the JSON file
    const customerCredentials: CustomerCredentials = JSON.parse(fs.readFileSync(fixturePath, "utf-8")); // customerCredentials is of type CustomerCredentials
    return customerCredentials;
  }

  generateDummyMAC(): string {
    const hexDigits = "0123456789ABCDEF";
    let mac = "";

    for (let i = 0; i < 6; i++) {
      const byte =
          hexDigits[Math.floor(Math.random() * 16)] +
          hexDigits[Math.floor(Math.random() * 16)];

      mac += byte;

    }

    return mac;
  }



}
