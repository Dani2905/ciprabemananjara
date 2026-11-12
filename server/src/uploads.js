const { Router } = require('express');
const { randomUUID } = require('node:crypto');
const { mkdir, writeFile } = require('node:fs/promises');
const path = require('node:path');
const { requireAdmin } = require('./auth');
const { requireSameOrigin } = require('./security');

const uploadsRouter = Router();
const uploadsDirectory = path.resolve(__dirname, '../uploads');
const jpegDataUrlPrefix = 'data:image/jpeg;base64,';
const maxDataUrlLength = 750_000;
const maxImageBytes = 562_500;

function parseCompressedJpegDataUrl(value) {
  if (typeof value !== 'string' || value.length > maxDataUrlLength || !value.startsWith(jpegDataUrlPrefix)) return null;
  const base64 = value.slice(jpegDataUrlPrefix.length);
  if (!base64 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(base64)) return null;

  const image = Buffer.from(base64, 'base64');
  if (image.length === 0 || image.length > maxImageBytes || image.toString('base64') !== base64) return null;
  if (image[0] !== 0xff || image[1] !== 0xd8 || image[2] !== 0xff || image[image.length - 2] !== 0xff || image[image.length - 1] !== 0xd9) return null;
  return image;
}

function saveImage(category) {
  return async (request, response) => {
    const dataUrl = request.body?.image;
    if (typeof dataUrl !== 'string' || !dataUrl.startsWith(jpegDataUrlPrefix)) {
      return response.status(400).json({ error: 'invalid_image' });
    }
    if (dataUrl.length > maxDataUrlLength) return response.status(413).json({ error: 'image_too_large' });

    const image = parseCompressedJpegDataUrl(dataUrl);
    if (!image) return response.status(400).json({ error: 'invalid_image' });

    const filename = `${category}-${randomUUID()}.jpg`;
    const imageDirectory = path.join(uploadsDirectory, category);
    const imagePath = path.join(imageDirectory, filename);
    try {
      await mkdir(imageDirectory, { recursive: true });
      await writeFile(imagePath, image, { flag: 'wx', mode: 0o644 });
    } catch (error) {
      console.error(`${category} image upload failed:`, error?.name ?? 'UnknownError');
      return response.status(503).json({ error: 'upload_failed' });
    }

    return response.status(201).json({ url: `/uploads/${category}/${filename}` });
  };
}

uploadsRouter.post('/admin/uploads/news-image', requireSameOrigin, requireAdmin, saveImage('news'));
uploadsRouter.post('/admin/uploads/carousel-image', requireSameOrigin, requireAdmin, saveImage('carousel'));

module.exports = { uploadsRouter, uploadsDirectory, parseCompressedJpegDataUrl };
