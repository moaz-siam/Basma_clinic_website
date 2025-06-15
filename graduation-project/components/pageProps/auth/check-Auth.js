
export async function checkAuth(token) {
  if (!token) {
    return { success: false, user: null };
  }

  try {
    const res = await fetch("http://localhost:4000/api/auth/check-auth", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`, // نرسل الكوكي يدويًا
      },
      cache: "no-store", // مهم حتى لا يستخدم الكاش
    });
    

    // if (!res.ok) throw new Error("Unauthenticated");
    const data = await res.json();
    return data;
  } catch (err) {
    
    
    return { isAuthenticated: false };
  }
}
