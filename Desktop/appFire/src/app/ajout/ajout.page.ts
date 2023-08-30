import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.page.html',
  styleUrls: ['./ajout.page.scss'],
})
export class AjoutPage implements OnInit {
  montant: number = 0;
  num: number = 0;
  des: string = "";
  datefac: Date = new Date(); // Default to current date
  dateliv: Date = new Date();
  imageUrl: string = "";
  selectedImage: File | null = null;


  constructor(
    private route: Router,
    private fire: AngularFirestore,
    private storage: AngularFireStorage,
    private alertController: AlertController ,

  ) {}

  ngOnInit() {

  }


  async ajouterFacture() {
    const numExists = await this.fire.collection('factures', ref => ref.where('num', '==', this.num)).valueChanges().pipe(first()).toPromise();
    if (numExists && numExists.length > 0) {
      this.presentAlert('N° de facture déjà existant.');
      return; // Exit the function if the 'num' already exists
    }
    
    if (this.selectedImage) {
      const imageRef = this.storage.ref(`images/${this.selectedImage.name}`);
      await imageRef.put(this.selectedImage);
      this.imageUrl = await imageRef.getDownloadURL().toPromise();
    }

    this.fire.collection('factures').add({
      montant: this.montant,
      num: this.num,
      des: this.des,
      datefac: this.datefac,
      dateliv: this.dateliv,
      imageUrl: this.imageUrl,
    });

    this.route.navigateByUrl('/accueil');
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  isValidForm(): boolean {
    return (
      this.montant !== 0 &&
      this.num !== 0 &&
      this.des !== "" &&
      this.datefac !== null &&
      this.dateliv !== null &&
      this.selectedImage !== null
    );
  }
}