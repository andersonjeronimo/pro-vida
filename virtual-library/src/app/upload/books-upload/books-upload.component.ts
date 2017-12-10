import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Book } from '../../_models/book.model';
import { FirebaseService } from '../../_services/firebase.service';
import {} from '@angular/forms';

import { AlertService } from 'app/_services/alert.service';

@Component({
  selector: 'app-books-upload',
  templateUrl: './books-upload.component.html',
  styleUrls: ['./books-upload.component.css']
})
export class BooksUploadComponent implements OnInit {
  private reference = 'books';
  private storageRef: any = null;
  private databaseChildRef: any = null;

  private isbnPattern = `^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})
  [- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$`;

  file: File = null;
  percentage = 0;
  uploading = false;

  // formulário reativo
  bookForm: FormGroup;
  @ViewChild('fileInput') myFileInput: ElementRef;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  private getFirebaseReferences() {
    this.storageRef = this.firebase.getStorageRef(this.reference);
    this.databaseChildRef = this.firebase.getDatabaseChildRef(this.reference);
  }

  private createForm() {
    this.bookForm = this.formBuilder.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      isbn: [null, [Validators.required, Validators.pattern(this.isbnPattern)]]
    });
  }

  ngOnInit() {
    this.getFirebaseReferences();
    this.createForm();
  }

  onChange(event) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  private clearForm() {
    if (this.file != null) {
      this.myFileInput.nativeElement.reset(); // limpa o file input
      this.bookForm.reset();
      this.file = null;
      this.percentage = 0;
    }
  }

  verificaCSS(campo) {
    return this.bookForm.get(campo).valid && this.bookForm.get(campo).touched;
  }

  onSubmit() {
    if (this.bookForm.valid) {
      if (this.file != null) {
        this.uploadFile();
      } else {
        this.alertService.error('Não foi selecionado nenhum arquivo PDF.');
      }
    } else {
      this.alertService.error('Verificar preenchimento dos campos.');
    }
  }

  private uploadFile() {
    this.uploading = true;
    const storageFileRef = this.storageRef.child(this.file.name);
    console.log(storageFileRef);

    let book: Book = new Book(
      this.bookForm.value.title,
      this.bookForm.value.author,
      this.bookForm.value.isbn,
      null,
      null,
      this.file.name
    );

    const task = storageFileRef.put(this.file);
    // acompanhar evolução do envio para o storage
    task.on(
      'state_changed',
      snapshot => {
        this.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      },
      error => {
        console.log(error);
        this.alertService.error(error);
      },
      complete => {
        // gravar dados sobre o arquivo no database
        this.databaseChildRef.push(book);
        this.alertService.success(
          `Envio do ${this.file.name} efetuado com sucesso!`,
          true
        );
        this.clearForm();
        this.uploading = false;
      }
    );
  }
}
