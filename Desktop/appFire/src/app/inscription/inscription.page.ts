import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {


  email:string ="";
  password:string="";
  errorMessage: string = "";
  constructor(private auth:AngularFireAuth, private route:Router ) { }

  ngOnInit() {
  }
inscrire() {
  this.auth.createUserWithEmailAndPassword(this.email,this.password)
  .then(
    (data) => {
      this.route.navigateByUrl("/home")
    } 
  )
  .catch(
    (err) => {
   
      this.errorMessage = `Erreur : ${err.message}`;


    }
  );

}

  

}
