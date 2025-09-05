"use client";

import { useContext } from "react";
import { AuthContext } from "@/features/firebase/auth";

export const useAuth = () => useContext(AuthContext);
