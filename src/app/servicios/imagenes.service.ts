import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private http: HttpClient) {}

  guardarImagen(archivo: File) {
    const formData = new FormData();
    formData.append('archivo', archivo);
    return this.http.post<{ url: string }>('http://localhost:3000/upload', formData);
  }
}
