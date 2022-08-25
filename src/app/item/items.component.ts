import { Component, OnInit } from '@angular/core'
import { requestPermissions } from '@nativescript/camera';
import * as camera from "@nativescript/camera";
import { ImageSource } from "@nativescript/core";


@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  image: ImageSource;

  constructor() {}

  ngOnInit(): void {
    var self = this;
  
      requestPermissions().then(
        function success() {
          camera.takePicture()
            .then((imageAsset) => {
              console.log("Result is an image asset instance");
              ImageSource.fromAsset(imageAsset).then((source) => {
                self.image = source;
              });    
            }).catch((err) => {
              console.log("Error -> " + err.message);
            });
        },
        function failure() {
          // permission request rejected
          // ... tell the user ...
        }
      );
    }
}
