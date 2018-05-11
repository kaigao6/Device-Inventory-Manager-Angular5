import { Component, OnInit } from '@angular/core';
import { Device, DataService } from '../providers/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css']
})
export class DeviceEditComponent implements OnInit {
  private deviceId:number;
   device:Device;
  private devices:Device[];

  constructor(
    private routeInfo:ActivatedRoute,
    private dataService:DataService,
    private router:Router
  ) { }

  ngOnInit() {
    this.deviceId =this.routeInfo.snapshot.params["id"];
    this.device = this.dataService.getDevice(this.deviceId);
    // console.log(this.device);
    this.dataService.getDevicesFromFirebase()
      .subscribe(
        (data) => this.devices =data
      )
  }



  onSaveBtnClicked(value:any){
    // console.log(this.devices);
    // console.log(value);

    for(let device in this.devices){
      if(this.devices[device].id == this.device.id){
        this.devices[device].Device_Name = value.devicename;
        this.devices[device].Device_Type = value.deviceType;
        this.devices[device].Device_OS = value.os;
        this.devices[device].Device_OSv = value.osVersion;
        this.devices[device].Device_Color = value.deviceColor;
        this.devices[device].Device_IMEI = value.imei;
        this.devices[device].Device_Identifier= value.deviceIdentifier;
        this.devices[device].Device_Resolution = value.resolution;
        this.devices[device].Device_ScreenSz = value.screenSize;
        this.devices[device].Manufacturer = value.manufacturer;




      }
    }

    //if "null" values are to be removed:
    // this.devices = this.devices.filter(item=>item);

    this.dataService.storeDevices(this.devices)
      .subscribe(
        (response) => {
          // console.log(response);
          this.router.navigate(['/home']);

        },
        (error)=> {
          // console.log(error)
        }
      )

    // console.log(this.device.id);

  }

}
