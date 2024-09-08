import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.css',
})
export class UploadFormComponent {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  form = new FormGroup({
    fileSource: new FormControl('', Validators.required),
  });

  onFileChange(event: Event): void {
    try {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          console.log(e.target?.result);
          const head = (e.target?.result as string).split(',')[0];
          const base64String = (e.target?.result as string).split(',')[1];

          this.localStorageService.uploadImage(base64String, head);
          this.router.navigate(['/gallery']);
          toast.success('Image uploaded successfully');
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      toast.error('Error uploading file');
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted!');
    }
  }
}
