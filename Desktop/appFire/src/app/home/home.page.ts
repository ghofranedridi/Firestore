import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email:string ="";
  password:string="";
  errorMessage: string = "";
 

  constructor(private auth:AngularFireAuth , private route:Router) {
  }
  verify(){
    this.auth.signInWithEmailAndPassword(this.email,this.password)
    .then(
      (data) => {
        this.route.navigateByUrl("/accueil")
      } 
    )
    .catch(
      (err) => {
     
        this.errorMessage = `Erreur : ${err.message}`;


      }
    );
   }
   aller_inscription(){
    this.route.navigateByUrl("/inscription")
  }
  
}
