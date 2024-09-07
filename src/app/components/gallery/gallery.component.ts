import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ImageDetailComponent } from '../image-detail/image-detail.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, ImageDetailComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  constructor(private router: Router) {}
  images: { name: string; src: string }[] = [];
  selectedImage: string | null = null;

  ngOnInit(): void {
    this.loadImages();

    // Listen for router navigation events to reload images when navigating to /gallery
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd && this.router.url === '/gallery'
        )
      )
      .subscribe(() => {
        this.loadImages();
      });
  }

  loadImages(): void {
    const imageArray = JSON.parse(localStorage.getItem('images') ?? '[]');
    this.images = imageArray.map(
      (img: { id: string; mimeType: string; body: string }) => {
        const url = `${img.mimeType},${img.body}`;
        return { name: img.id, src: url };
      }
    );
  }

  openImageDetail(imageSrc: string) {
    this.selectedImage = imageSrc;
  }

  closeImageDetail() {
    this.selectedImage = null;
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
