import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import * as firebase from 'firebase';


@Injectable()
export class DataService {
  // private devices: Device[] = [];
  private devices: any;
  private allUsers:User[]=[];

  private pas: User[] = [];
  private admins: User[] = [];
  private imgUrl:string;


  constructor(private http: Http) { }

// // for storage images
// getStdInImageUrl() {
//    const stdInStorageRef = firebase.storage().ref().child("StudentPhoto/" +"355358080537528_student_in.png");
//    stdInStorageRef.getDownloadURL().then(url => {
//      console.log(url);
//      this.imgUrl = url;
//      return this.imgUrl;
//
//    });
//  }


  storeDevices(myDevices: Device[]) {
    //place2
    // return this.http.put("https://track1-a4311.firebaseio.com/devices.json",
    //   myDevices);
      return this.http.put("https://trackr-kaigao.firebaseio.com/devices.json",
        myDevices);

  }
  getDevicesFromFirebase() {
    //place3
    // return this.http.get("https://track1-a4311.firebaseio.com/devices.json")
    return this.http.get("https://trackr-kaigao.firebaseio.com/devices.json")


      .map(
      (response: Response) => {
        // console.log(response);
        const data = response.json();
        // device-list组件创建的时候，这里的流被订阅，这里local devices被赋值。所以下面getDevice才能find
        this.devices = data;
        return data;
      }
      )
  }
  getDevices() {
    return this.devices;
  }

  getDevice(id: number) {
    return this.devices.find((device) => device.id == id);
  }

  storeUsers(users: User[]) {
    //place4
    // return this.http.put("https://trackr-users.firebaseio.com/users.json",
    return this.http.put("https://trackr-users-d1e1a.firebaseio.com/users.json",

      users);
  }

  getUsersFromFirebase() {
    //place5

    // return this.http.get("https://trackr-users.firebaseio.com/users.json")
    return this.http.get("https://trackr-users-d1e1a.firebaseio.com/users.json")

      .map(
      (response: Response) => {
        const data = response.json();
        this.allUsers = data;
        return data;
      }
      )
  }
  getAllUsers(){
    return this.allUsers;
  }
  getUser(id:number){
    return this.allUsers.find((user)=>user.id == id)
  }

  getPaListFromFirebase() {
    return this.http.get("https://trackr-pa-1d053.firebaseio.com/pausers.json")
      .map(
      (response: Response) => {
        const data = response.json();
        this.pas = data;
        return data;
      }
      )
  }

  storePaListToFirebase(palist: User[]) {
    //like other links
    // return this.http.put("https://trackr-pa.firebaseio.com/pausers.json",
    return this.http.put("https://trackr-pa-1d053.firebaseio.com/pausers.json",


      palist);
  }
  storeAdminListToFirebase(adminList: User[]) {

    // return this.http.put("https://trackr-ad.firebaseio.com/adminusers.json",
    return this.http.put("https://trackr-admin-f6590.firebaseio.com/adminusers.json",


      adminList);
  }

  getPaList() {
    return this.pas;
  }

  getAdminList() {
    return this.admins;
  }
  getAdminListFromFirebase() {
    // return this.http.get("https://trackr-ad.firebaseio.com/adminusers.json")
    return this.http.get("https://trackr-admin-f6590.firebaseio.com/adminusers.json")

      .map(
      (response: Response) => {
        const data = response.json();
        this.admins = data;
        return data;
      }
      )

  }



  // private devices:Device[]=[
  //   new Device(1,"iPhone 5s-1","iOS","11.0.1",true),
  //   new Device(2,"iPhone 6s-1","iOS","11.0.1",true),
  //   new Device(3,"iPhone 7s-1","iOS","12.0.1",true),
  //   new Device(4,"iPhone 8s-1","iOS","13.0.1",false),
  //   new Device(5,"Huawei P20-1","Android","7.0",true)
  // ];
}

// export class Device {
//   constructor(
//     public id: number,
//     public name: string,
//     public os: string,
//     public osVersion: string,
//     public currentStatus: boolean,
//   ) { }
// }

export class Device {
  constructor(
    public id: number,
    public qrCode: string,
    public Device_Color: string,
    public Device_IMEI: string,
    public Device_Identifier:string,
    public logHistory:Loghistory[],
    public Device_Name: string,
    public Device_OS: string,
    public Device_OSv: string,
    public Device_Photo: string,
    public Device_Resolution: string,
    public Device_ScreenSz: string,
    public Device_Status: string,
    public Device_Type: string,
    public Manufacturer: string,
    public Signout_AdminPhoto: string,
    public Signout_DatePikr: string, //Expiration time
    public Signout_Email: string,  //user email
    public Signout_Permit: string, //sign out type.
    public Signout_PermitEmail: string,
    public Signout_StuPhoto: string,
    public Signout_Time: string,//sign out time
    public lat: number,
    public lng: number
  ) { }
}
export class User {
  constructor(
    public id: number,
    public email: string,
    public name: string,
    public type: string
  ) { }
}

export class Loghistory{
  constructor(
    public id:number,
    public email:string,
    public expirTime:string,
    public signOutTime:string,
    public signOutType:string

  ){}
}

// export class User{
//   public id:number,
//
// }
