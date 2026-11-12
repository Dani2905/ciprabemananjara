export function compressImageForLocalStorage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) return Promise.reject(new Error('Choisis un fichier image.'));
  if (file.size > 12 * 1024 * 1024) return Promise.reject(new Error('Le fichier est trop volumineux (12 Mo maximum avant compression).'));

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    const cleanup = () => URL.revokeObjectURL(objectUrl);

    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('La compression d’image n’est pas disponible dans ce navigateur.');
        const largestSide = Math.max(image.naturalWidth, image.naturalHeight);

        for (let attempt = 0; attempt < 6; attempt += 1) {
          const maxDimension = Math.max(600, 1600 - attempt * 180);
          const scale = Math.min(1, maxDimension / largestSide);
          canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
          canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const quality = Math.max(0.42, 0.82 - attempt * 0.08);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          if (dataUrl.length <= 750_000) {
            cleanup();
            resolve(dataUrl);
            return;
          }
        }
        throw new Error('L’image reste trop lourde après compression. Choisis une image plus petite.');
      } catch (error) {
        cleanup();
        reject(error instanceof Error ? error : new Error('Impossible de traiter cette image.'));
      }
    };

    image.onerror = () => {
      cleanup();
      reject(new Error('Impossible de lire ce fichier image.'));
    };
    image.src = objectUrl;
  });
}
