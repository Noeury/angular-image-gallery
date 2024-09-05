import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.css',
})
export class UploadFormComponent {
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

          const id = `image_${Date.now()}`;

          const data = {
            id: id,
            mimeType: head,
            body: base64String,
          };

          const json = JSON.parse(localStorage.getItem('images') || '[]');

          json.push(data);

          localStorage.setItem('images', JSON.stringify(json));
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {}
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted!');
    }
  }
}
