import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  images: { name: string; src: string }[] = [];

  ngOnInit(): void {
    const imageArray = JSON.parse(localStorage.getItem('images') ?? '[]');

    this.images = imageArray.map(
      (img: { id: string; mimeType: string; body: string }) => {
        const url = `${img.mimeType},${img.body}`;
        return { name: img.id, src: url };
      }
    );
  }

  deleteImage(index: number) {
    this.images = this.images
      .map((img, i) => (i === index ? null : img))
      .filter((img) => img !== null);

    const imageArrayForStorage = this.images.map((img) => {
      const [mimeType, body] = img.src.split(',');
      return {
        id: img.name,
        mimeType: mimeType,
        body: body,
      };
    });

    localStorage.setItem('images', JSON.stringify(imageArrayForStorage));
  }
}
