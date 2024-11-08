import fs from "fs/promises";
import path from "path";

export interface MediaStorageProvider {
  getMediaURL: (destinationPath: string) => string;
  upload: (destinationPath: string, data: Buffer) => Promise<void>;
  delete: (url: string) => Promise<void>;
}

const localStoragePath = "public/media";

const localStorageProvider: MediaStorageProvider = {
  getMediaURL: (destinationPath: string) => {
    return `/media/${destinationPath}`;
  },
  upload: async (destinationPath, data) => {
    const outputPath = path.join(localStoragePath, destinationPath);
    const dirname = path.dirname(outputPath);

    await fs.mkdir(dirname, { recursive: true });
    await fs.writeFile(outputPath, data);
  },
  delete: async (destinationPath) => {
    const deletePath = path.join(localStoragePath, destinationPath);

    await fs.unlink(deletePath);
  },
};

// We will add a Blob storage provider soon
export const media = localStorageProvider;