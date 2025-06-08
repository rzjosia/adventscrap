import path from "path";
import fs from "fs/promises";
import retry from 'retry';

export async function removeAllFilesInFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(folderPath, file);
          const stat = await fs.stat(filePath);
          if (stat.isFile()) {
            await fs.unlink(filePath);
          } else if (stat.isDirectory()) {
            // Pour supprimer aussi les sous-dossiers et leur contenu :
            await fs.rm(filePath, { recursive: true, force: true });
          }
        })
    );
  } catch (e) {
    console.log(e.message);
  }
}

export function operationWithRetry(fn, maxAttempts = 5) {
  return new Promise((resolve, reject) => {
    const operation = retry.operation({ retries: maxAttempts - 1 });
    operation.attempt(async currentAttempt => {
      try {
        const result = await fn();
        resolve(result);
      } catch (err) {
        if (!operation.retry(err)) {
          reject(operation.mainError());
        }
      }
    });
  });
}

export async function createFile(filePath, content) {
  try {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, content, "utf8");
    console.log("Fichier créé avec succès !", filePath);
  } catch (error) {
    console.log(error.message, filePath);
    throw error;
  }
}

