import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment'
declare var Particle:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit{

  particle = new Particle();

  wcState = 'loading';

  accessToken = '';

  ngOnInit(){

    this.particle.login({username: environment.particle_auth.email, password: environment.particle_auth.password}).then(
        (data) => {
          console.debug("DATA", data);
          this.accessToken = data.body.access_token;
        }
    ).then(() => {

      this.particle.getVariable({
        deviceId: '3b003f000247343339373536',
        name: 'light_state',
        auth: this.accessToken
      }).then((data)  => {

        if (data.body.result == 0 ) this.wcState = 'free';
        else this.wcState = 'occupied'

      }, function(err) {
        console.log('An error occurred while getting attrs:', err);
      });

      this.particle.getEventStream({
        deviceId: '3b003f000247343339373536',
        name: 'light_state_changed',
        auth: this.accessToken
      }).then( (stream) => {

        stream.on('event', (data) => {
          if(data.data == "0") this.wcState = 'free';
          else this.wcState = 'occupied';
        });

      });

    });





  }


}
