import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { PartnerService } from '../../services/partner.service';
import { Media, Channel } from '../../shared/media';
@Component({
  selector: 'media-detail',
  templateUrl: './media-detail.component.html'
})

export class MediaDetailComponent implements OnInit {
    public media: Media;
    public mediaId: number;
    public channels: Array<Channel> = [];
    constructor(
        private	router:	Router,
        private route: ActivatedRoute, 
        private authService:AuthService,
        private partnerService:PartnerService,
        private alertService: AlertService
    ) { 
      /*
      if (!partnerService.xSessionId) {
        this.router.navigate(['login']);
      }
      */
    }

    ngOnInit(){
       this.route.params.forEach((params: Params) => {
            this.mediaId = params['id'];
            this.loadMedia(this.mediaId);
        });
        
        this.loadChannels();
    }

    loadChannels() { 
        this.partnerService.getChannels(this.authService.sessionId).subscribe( res => {  
            let data = this.respondHandler(res);
            if (data.Data !== undefined) {
                data.Data.map((item:any) =>  this.channels.push(new Channel(item)));  
                console.log(this.channels); 
            }   
        }, 
            error => this.errorHandler(error)
        ); 
    }

    loadMedia(mediaId: number) { 
        this.partnerService.getMedia(this.authService.sessionId, mediaId, 1).subscribe( res => {  
            let data = this.respondHandler(res);
            if (data !== undefined) {
                this.media = new Media(data.Data); 
                //console.log(data);
            }   
        }, 
            error => this.errorHandler(error)
        ); 
    }

    updateMedia() { 
        this.partnerService.updateMedia(this.authService.sessionId, this.media).subscribe( res => {  
            let data = this.respondHandler(res);
        }, 
            error => this.errorHandler(error)
        ); 
    }

    formUpdated(params: any) {

        this.media.Title = params.title;
        this.media.Description = params.description;
        this.media.ChannelId = params.channelId;
        this.media.ShootDate = params.shootDate;
        this.media.State = params.state ? 1 : 0;
        
        console.log(this.media);
        //this.updateMedia();
    }

    private respondHandler(data: any) {
        if (!data.Success) {
            this.alertService.error(data.Message.Text);
            return false;
        }        
        return data;        
    }

    private errorHandler(error: any) {
        this.alertService.error(error);
    }
}