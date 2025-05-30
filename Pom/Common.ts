export class Common{
   
    generateRandomStringWithNumber(length: number = 9): string {
      if (length < 8) {
        throw new Error('Password length must be at least 8 characters');
      }
    
      const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
      const digits = '0123456789';
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const allChars = uppercaseLetters + lowercaseLetters + digits + specialChars;
    
      let result : string = '';
    
      // Ensure at least one uppercase letter
      result += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
    
      // Ensure at least 1 special character
      result += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    
      // Ensure at least 2 digits
      for (let i = 0; i < 2; i++) {
        result += digits.charAt(Math.floor(Math.random() * digits.length));
      }
    
      // Fill the rest of the string
      const remainingLength = length - result.length;
      for (let i = 0; i < remainingLength; i++) {
        result += allChars.charAt(Math.floor(Math.random() * allChars.length));
      }
    
      // Shuffle the result to randomize the positions
      result = result.split('').sort(() => 0.5 - Math.random()).join('');
    
      return result;
    }
    
      
  
        
        generateDummyEmail(): string {
          const timestamp = Date.now();
          return `user${timestamp}@example.com`;
        }
        
  }
  