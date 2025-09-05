"use client";
import { type User } from "@/features/firebase/firestore/types/user";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signInWithEmailAndPassword, signOut, UserInfo } from "firebase/auth";
import { doc, setDoc, getDoc, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../client";

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const checkAuthStatus = (
  callback: (currentUser: UserInfo | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};

// Register a new user with email/password and create a corresponding Firestore user document keyed by uid
export const register = async (
  email: string,
  password: string,
  profile?: Partial<{ name: string; phone: string; orgName: string }>
) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  // Create/merge a user profile document with uid as the document id
  await setDoc(
    doc(db, "users", uid),
    {
      id: uid,
      role: "client",
      status: "active",
      meta: {
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
      userDetails: { email, name: profile?.name, phone: profile?.phone },
      orgDetails: profile?.orgName ? { orgName: profile.orgName } : undefined,
    },
    { merge: true }
  );

  return cred;
};

// Send a password reset email
export const resetPassword = (email: string) =>
  sendPasswordResetEmail(auth, email);

// Define a type for the auth context
type AuthContextType = {
  user: (User & Record<string, any>) | null;
  refreshUserData?: () => Promise<void>;
};

// Create the auth context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch and update user data
  const fetchUserData = async (userId: string) => {
    try {
      const userDocRef = doc(db, "users", userId); // userId is the doc ID
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        return userData;
      } else {
        return {};
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  // Function to refresh user data
  const refreshUserData = async () => {
    if (!user?.uid) return;

    try {
      const userData = await fetchUserData(user.uid);
      if (userData) {
        setUser({ ...user, ...userData });
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userData = await fetchUserData(currentUser.uid);

      setUser({ ...currentUser, ...(userData as any) });
      setLoading(false); // set loading to false after user state is confirmed
    });
    return unsubscribe;
  }, []);

  const value = useMemo(() => {
    return { user, refreshUserData };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
