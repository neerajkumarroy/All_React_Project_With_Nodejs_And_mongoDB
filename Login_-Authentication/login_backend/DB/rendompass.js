function generateOTP() {
  
    const OTP = Math.floor(Math.random() * 9000) + 1000;
    return OTP;
}

module.exports = generateOTP;