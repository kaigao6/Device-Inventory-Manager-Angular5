import { Component, OnInit } from '@angular/core';
import { Device, DataService } from '../providers/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AdminloginGuard } from '../guard/adminlogin.guard';
import { PaloginGuard } from '../guard/palogin.guard';


@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  // lat =43.6374579;
  // lng =-79.4204978;


  private lat: number = 45.348289;
  private lng: number = -75.754930;
  private zoom: number = 13;

  private deviceId: number;
   device: Device;
  private devices:Device[];

  private stdInImgSrc: string;
  private stdOutImgSrc: string;

  private adminImgSrc: string;
  private isImgRotate:boolean;

  private isStuIn:boolean;
  private isStuOut:boolean;
  private isAmindOut:boolean;

   isAdminLoggedin:boolean = false;
   isPaLoggedin:boolean = false;

  private qrData:string ="";
  private isQrShow:boolean = false;

  constructor(private routeInfo: ActivatedRoute,
    private dataService: DataService,
    private adminGuard: AdminloginGuard,
    private paGuard: PaloginGuard,
    private router:Router

  ) { }

  ngOnInit() {
    this.deviceId = this.routeInfo.snapshot.params["id"];
    this.device = this.dataService.getDevice(this.deviceId);
    // console.log(this.device.logHistory);
    this.dataService.getDevicesFromFirebase()
      .subscribe(
        (data) => this.devices =data
      )



    this.lat = this.device.lat;
    this.lng = this.device.lng;
    // console.log(this.device);
    // this.dataService.getStdInImageUrl(this.device.Device_IMEI).then(url=> {console.log(url)});
    // console.log(this.device.Device_IMEI);
    // console.log(this.dataService.getStdInImageUrl());

    if(this.device.Device_Status == "Signed Out" && this.device.Signout_Permit == "Inclass" ){
      this.isStuOut = true;
      this.isStuIn = false;
      this.isAmindOut = false;
      this.getStdOutImageUrl(this.device.Device_IMEI);

    }

    if(this.device.Device_Status == "Signed Out" && this.device.Signout_Permit == "OverNight" ){
      this.isStuOut = true;
      this.isStuIn = false;
      this.isAmindOut = true;
      this.getStdOutImageUrl(this.device.Device_IMEI);
      this.getAdminImageUrl(this.device.Device_IMEI);
    }
    if(this.device.Device_Status == "Available"){
      this.isStuOut = false;
      this.isStuIn = true;
      this.isAmindOut = false;
      this.getStdInImageUrl(this.device.Device_IMEI);

    }



    if(this.device.Device_Photo == "ios"){
      this.isImgRotate = true;
    }else{
      this.isImgRotate =false;
    }


    // this.getProfileImageUrl() ;

    this.dataService.getPaListFromFirebase()
      .subscribe(
        (data) =>{
          this.isPaLoggedin = this.paGuard.canActivate();

        }
      )
    this.dataService.getAdminListFromFirebase()
      .subscribe(
        (data) =>{
          this.isAdminLoggedin = this.adminGuard.canActivate();
          // console.log("isAdminLoggedin here");
          // console.log(this.isAdminLoggedin);

        }
      )


    //QR Code
    // console.log(this.device.Device_IMEI);

  }

  generateQrCode(){
    this.qrData = this.device.Device_IMEI;
    this.isQrShow = !this.isQrShow;
  }

  returnBtnClicked(){

    for(let device in this.devices){
      if(this.devices[device].id == this.device.id){
        this.devices[device].Device_Status = "Available";
        this.devices[device].Signout_Time = "";
        this.devices[device].Signout_DatePikr = "";
        this.devices[device].Signout_Email = "";
        this.devices[device].Signout_Permit = "";
        this.devices[device].lat = 45.3481932;
        this.devices[device].lng = -75.755101;

        // this.stdInImgSrc = "";
        // this.adminImgSrc = "";
        this.isStuOut = false;
        this.isStuIn = false;
        this.isAmindOut = false;

        this.device.Device_Status = "Available";
        this.device.Signout_Time = "";
        this.device.Signout_DatePikr ="";
        this.device.Signout_Email = "";
        this.device.Signout_PermitEmail ="";
        this.device.Signout_Permit ="";

      }
    }

    this.dataService.storeDevices(this.devices)
      .subscribe(
        (response) => {
          // console.log(response);
          // this.router.navigate(['/home']);

        },
        (error)=> {
          // console.log(error)
        }

      )

  }

  getStdInImageUrl(imei: string) {
    // console.log(this.device.Device_IMEI);
    const stdInStorageRef = firebase.storage().ref().child("StudentPhoto/" + imei + "_student_in.png");
    stdInStorageRef.getDownloadURL().then(url => {
      this.stdInImgSrc = url;
      // console.log(url);
    });
  }


  getStdOutImageUrl(imei: string) {
    // console.log(this.device.Device_IMEI);
    const stdOutStorageRef = firebase.storage().ref().child("StudentPhoto/" + imei + "_student_out.png");
    stdOutStorageRef.getDownloadURL().then(url => {
      this.stdOutImgSrc = url;
      // console.log(url);
    });
  }
  getAdminImageUrl(imei: string) {
    // console.log(this.device.Device_IMEI);
    const adminStorageRef = firebase.storage().ref().child("AdminPhoto/" + imei + "_admin_out.png");
    adminStorageRef.getDownloadURL().then(url => {
      this.adminImgSrc = url;
      // console.log(url);
    });
  }

}
