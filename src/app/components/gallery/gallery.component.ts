import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ImageDetailComponent } from '../image-detail/image-detail.component';
import { filter } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, ImageDetailComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  images: { name: string; src: string }[] = [];
  selectedImage: string | null = null;

  ngOnInit(): void {
    this.loadImages();

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
    const imageArray = this.localStorageService.loadImages();
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
    const imageArrayForStorage = this.images.map((img) => {
      const [mimeType, body] = img.src.split(',');
      return {
        id: img.name,
        mimeType: mimeType,
        body: body,
      };
    });

    const updatedImages = this.localStorageService.deleteImage(
      index,
      imageArrayForStorage
    );
    this.images = updatedImages.map(
      (img: { id: string; mimeType: string; body: string }) => ({
        name: img.id,
        src: `${img.mimeType},${img.body}`,
      })
    );
  }
}
