import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  routeParams: Subscription | undefined;
  
  api: VgApiService | undefined;
  title: string = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute
    ) {

  }

  async ngOnInit(): Promise<void> {
    this.routeParams = this.route.params.subscribe(params => {
      this.title = params['title'];
    });
  }

  onPlayerSet(api: VgApiService): void {
    this.api = api
  }

  goBackHandler(): void {
    console.log("hola");
    
    this.location.back();
  }
}
