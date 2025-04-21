import * as jose from 'jose';

// JWT tokenni tekshirish va foydalanuvchi ma'lumotlarini olish
export const getUserInfo = async (authCookie: string): Promise<any | null> => {
  try {
    const secretKey = process.env.SECRET_KEY;
    
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }
    
    // Jose kutubxonasi bilan JWT tokenni tekshirish
    const encoder = new TextEncoder();
    const { payload } = await jose.jwtVerify(
      authCookie,
      encoder.encode(secretKey)
    );
    
    return payload;
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    return null;
  }
};

// JWT token yaratish
export const createToken = async (payload: object, expiresIn = '1d'): Promise<string | null> => {
  try {
    const secretKey = process.env.SECRET_KEY;
    
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }
    
    // Jose kutubxonasi bilan JWT token yaratish
    const encoder = new TextEncoder();
    const alg = 'HS256';
    
    // Tokenning amal qilish muddatini hisoblash
    const now = Math.floor(Date.now() / 1000); // Hozirgi vaqt (sekundlarda)
    let expiry: number;
    
    if (expiresIn === '1d') {
      expiry = now + 86400; // 1 kun = 86400 sekund
    } else if (expiresIn === '7d') {
      expiry = now + 604800; // 7 kun = 604800 sekund
    } else if (expiresIn === '30d') {
      expiry = now + 2592000; // 30 kun = 2592000 sekund
    } else {
      // Standart qiymat: 1 kun
      expiry = now + 86400;
    }
    
    const jwt = await new jose.SignJWT({ ...payload })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime(expiry)
      .sign(encoder.encode(secretKey));
    
    return jwt;
  } catch (error) {
    console.error("Error creating JWT token:", error);
    return null;
  }
};
