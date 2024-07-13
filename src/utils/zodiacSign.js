function getZodiacSign(birthday) {
  const date = new Date(birthday);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "Capricorn";

  return null; // Return null if the date is invalid
}

async function updateUserZodiacSign(id_user, zodiac_sign) {
  try {
    const user = await User.findByPk(id_user);
    if (user) {
      user.zodiac_sign = zodiac_sign;
      await user.save();
    }
  } catch (error) {
    console.error("Error updating user zodiac sign:", error);
  }
}

module.exports = { getZodiacSign, updateUserZodiacSign };