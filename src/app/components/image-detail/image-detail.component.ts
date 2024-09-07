import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-detail',
  standalone: true,
  imports: [],
  templateUrl: './image-detail.component.html',
  styleUrl: './image-detail.component.css',
})
export class ImageDetailComponent {
  @Input() imageSrc: string | undefined | null;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
