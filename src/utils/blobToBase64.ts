export function blobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert Blob to base64.'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  }
  