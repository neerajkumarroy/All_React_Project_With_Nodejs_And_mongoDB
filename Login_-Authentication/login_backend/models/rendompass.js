function generateOTP() {
        const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
    
        let password = '';
    
        // Generate first character as an uppercase letter
        password += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
    
        // Generate next four characters as lowercase letters
        for (let i = 0; i < 4; i++) {
            password += lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length));
        }
    
        // Generate next three characters as numbers
        for (let i = 0; i < 3; i++) {
            password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
    
        // Shuffle the password characters
        password = password.split('').sort(() => Math.random() - 0.5).join('');
    
        return password;
}

module.exports = generateOTP;