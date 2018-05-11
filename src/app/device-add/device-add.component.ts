import { Component, OnInit } from '@angular/core';
import { Device, DataService,Loghistory } from '../providers/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit {

  private devices: Device[] = [];
  private id: number;
  private currentStatus: boolean = false;
  private logHisArr: Loghistory[]=[];

  constructor(private dataService: DataService,
              private router:Router
  ) { }

  ngOnInit() {

    // this.logHisArr.push(new Loghistory(1,"test@test.com", "2:00pm", "10pm", "OverNight"))

    this.dataService.getDevicesFromFirebase()
      .subscribe(
      (data) => {
        this.devices = data;
        // console.log(this.devices);
        // console.log(this.devices.length);
        if (this.devices != null) {
          let idArr: number[] = [];
          this.devices.forEach(item => idArr.push(item.id));
          // console.log(idArr);
          // console.log(idArr.pop());
          this.id = idArr.pop() + 1;
          // console.log(this.id - 1);
          // console.log(idArr);
        } else {
          this.devices = [];
          this.id = 1;
        }
      }
      )

  }
  onAddBtnClicked(value: any) {

    // this.devices.push(new Device(this.id, value.devicename, value.os, value.osVersion, this.currentStatus));
    this.devices.push(new Device(this.id,
                                 "", //qrCode
                                 value.color,
                                 value.imei,
                                 value.deviceIdentifier,
                                 this.logHisArr,
                                 value.devicename,
                                 value.os,
                                 value.osVersion,
                                 "", //Device_Photo
                                 value.resolution,
                                 value.screenSize,
                                 "Available",
                                 value.deviceType,
                                 value.manufacturer,
                                 "amin photo",
                                 "",//date picker
                                 "",//signouu email
                                 "",//signout permit
                                 "permit email",//this is not being used
                                 "stud photo",
                                 "",//signout time
                                 45.416384,
                                 -75.6774241




                              ));

    // console.log(this.devices);
    // console.log(value.devicename);
    //if "null" values are to be removed:
    // this.devices = this.devices.filter(item=>item);
    this.dataService.storeDevices(this.devices)
      .subscribe(
      (response) => {
        // console.log(response);
        this.router.navigate(['/home']);

      },
      (error) => {
        // console.log(error)
      }
      )
  }
}
  // onSubmit(value:any){
  //   this.dataService.getDevicesFromFirebase()
  //     .subscribe(
  //       (data) => {this.devices = data;
  //         console.log(value);
  //
  //       }
  //     )
  // }
