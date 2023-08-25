import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  etds : any=[]

  constructor(private fire:AngularFirestore) {
    this.getEtudiant()
  }

  getEtudiant(){
    this.fire.collection("etudiants").snapshotChanges()
    .subscribe(
      data => {
        this.etds = data.map(
          e => {
            return {
              id : e.payload.doc.id ,
              nom : e.payload.doc.data()["nom"],
              prenom : e.payload.doc.data()["prenom"],

            }
          }
        )
      }
    )
  }

}
