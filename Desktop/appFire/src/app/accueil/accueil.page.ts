import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



interface Facture {
  id: string;
  montant: number;
  num: number;
  des: string;
  datefac: Date;
  dateliv: Date;
  imageUrl: string;
  editing: boolean;
  isFactureEditing: boolean;
  updatedMontant: number;
  updatedNum: number;
  updatedDes: string;
  updatedDatefac: Date;
  updatedDateliv: Date;
  updatedImageUrl: string;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  searchQuery: string = '';

  facturesCollection: AngularFirestoreCollection<Facture>;
  factures: Observable<Facture[]>;
  userUid: string = ''

  constructor(private route: Router, private fire: AngularFirestore) {
    this.facturesCollection = this.fire.collection('factures');

    

    this.factures = this.facturesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { ...data, id, editing: false, isFactureEditing: false } as Facture;
        });
      })
    );
  }
  search() {
    const query = this.searchQuery.toLowerCase();
    this.factures = this.facturesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Facture;
          const id = a.payload.doc.id;
          return { ...data, id, editing: false, isFactureEditing: false } as Facture;
        }).filter(facture => {
          // Filter based on search query
          return (
            facture.num.toString().includes(query) ||
            facture.montant.toString().includes(query) 
          );
        });
      })
    );
  }


  ngOnInit() {}

 

  ajouter_facture() {
    this.route.navigateByUrl('/ajout');
  }

  deleteFacture(factureId: string) {
    this.fire.doc(`factures/${factureId}`).delete();
  }

  toggleEdit(facture: Facture) {
    facture.isFactureEditing = !facture.isFactureEditing;
    facture.editing = facture.isFactureEditing;
  }

  cancelEdit(facture: Facture) {
    facture.isFactureEditing = false;
    facture.editing = false;
  }

  async updateFacture(facture: Facture) {
    const updatedFields = {
      montant: facture.updatedMontant,
      des: facture.updatedDes,
      datefac: facture.updatedDatefac,
      dateliv: facture.updatedDateliv,
      imageUrl: facture.updatedImageUrl,
      editing: false,
    };
    await this.facturesCollection.doc(facture.id).update(updatedFields);
    facture.isFactureEditing = false;
    facture.editing = false;
  }
}