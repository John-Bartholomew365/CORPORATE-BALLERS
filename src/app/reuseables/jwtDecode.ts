// /**
//  * jwtDecode.ts - Decodes a JWT token to extract its payload
//  */

// /**
//  * Decodes the payload of a JWT token
//  * @param token The JWT token (without 'Bearer ' prefix)
//  * @returns The decoded payload or null if invalid
//  */
// export function decodeJwt(token: string | null): { userId: string; role: string; iat: number; exp: number } | null {
//   try {
//     if (!token) return null;
//     const base64Url = token.split(".")[1]; // Get payload part
//     if (!base64Url) return null;
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//         .join("")
//     );
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error("Error decoding JWT:", error);
//     return null;
//   }
// }



export function decodeJwt(token: string | null): { userId: string; role: string; iat: number; exp: number } | null {
  try {
    if (!token) {
      console.log("jwtDecode: No token provided"); // Debug: Log null token
      return null;
    }
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      console.log("jwtDecode: Invalid token format", token); // Debug: Log invalid token
      return null;
    }
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    console.log("jwtDecode: Decoded token:", decoded); // Debug: Log decoded token
    return decoded;
  } catch (error) {
    console.error("jwtDecode: Error decoding JWT:", error);
    return null;
  }
}