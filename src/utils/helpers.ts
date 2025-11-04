export const formatPhoneNumber = (phoneNumber : string) => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    throw new Error('شماره تلفن نامعتبر است');
  }

  // Remove all non-digit characters
  let cleaned = phoneNumber.replace(/\D/g, '');
  
  // Validate length
  if (cleaned.length < 10 || cleaned.length > 12) {
    throw new Error('طول شماره تلفن نامعتبر است');
  }
  
  // Add country code if not present
  if (cleaned.length === 10 && cleaned.startsWith('9')) {
    cleaned = '98' + cleaned;
  } else if (cleaned.length === 11 && cleaned.startsWith('09')) {
    cleaned = '98' + cleaned.substring(1);
  } else if (cleaned.length === 12 && !cleaned.startsWith('98')) {
    throw new Error('کد کشور نامعتبر است');
  }
  
  // Final validation: must be 12 digits and start with 98
  if (cleaned.length !== 12 || !cleaned.startsWith('989')) {
    throw new Error('شماره تلفن باید یک شماره موبایل ایرانی معتبر باشد');
  }
  
  // Additional validation: second digit after 98 must be 9
  if (cleaned[2] !== '9') {
    throw new Error('شماره تلفن باید با 9 شروع شود');
  }
  
  return cleaned;
};