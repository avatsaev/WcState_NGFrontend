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

  ngOnInit(){

    //get initial state
    this.particle.getVariable({
      deviceId: environment.particle_auth.device_id,
      name: 'light_state',
      auth: environment.particle_auth.token
    }).then((data)  => {

      if (data.body.result == 0 ) this.wcState = 'free';
      else this.wcState = 'occupied'

    }, function(err) {
      console.log('An error occurred while getting attrs:', err);
    });


    //listen for state changes
    this.particle.getEventStream({
      deviceId: environment.particle_auth.device_id,
      name: 'light_state_changed',
      auth: environment.particle_auth.token
    }).then( (stream) => {

      stream.on('event', (data) => {
        if(data.data == "0") this.wcState = 'free';
        else this.wcState = 'occupied';
      });

    });

  }

}
