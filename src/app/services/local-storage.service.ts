import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  loadImages(): { id: string; mimeType: string; body: string }[] {
    const imageArray = JSON.parse(localStorage.getItem('images') ?? '[]');
    return imageArray;
  }

  saveImages(images: { id: string; mimeType: string; body: string }[]): void {
    localStorage.setItem('images', JSON.stringify(images));
  }

  uploadImage(base64String: string, head: string): void {
    const id = `image_${Date.now()}`;
    const data = {
      id: id,
      mimeType: head,
      body: base64String,
    };

    const images = this.loadImages();
    images.push(data);
    this.saveImages(images);
  }

  deleteImage(
    index: number,
    images: { id: string; mimeType: string; body: string }[]
  ): { id: string; mimeType: string; body: string }[] {
    images.splice(index, 1);
    this.saveImages(images);
    return images;
  }
}
