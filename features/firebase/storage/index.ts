"use server";

import { storage } from "@/features/firebase/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

/**
 * Upload a file to Firestore Cloud Storage
 */
export async function uploadToStorage(formData: FormData): Promise<{ success: boolean; fullPath?: string; fileName?: string }> {
  const file = formData.get("file");
  const fileName = (file as File).name;
  const storageRef = ref(storage, (file as File).name);

  // 'file' comes from the Blob or File API
  const snapshot = await uploadBytes(storageRef, file as File);
  const downloadUrl = await getDownloadURL(snapshot.ref);

  if (!snapshot?.metadata.fullPath) {
    return {
      success: false
    };
  }

  return {
    success: true,
    fullPath: downloadUrl,
    fileName
  };
}
