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
    const imageArray = JSON.parse(localStorage.getItem('images') ?? '');

    this.images = imageArray.forEach((img: any) => {
      const url = `${img.mimeType},${img.body}`;
      return { name: img.id, src: url };
    });
  }
}
