import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { FilterUtils } from '../../../shared/utils/filterutils';

import { ProductsService } from '../../../shared/services/products.service';
import { ProductModel } from '../../../shared/model/product.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {
  IMqttMessage,
  IMqttServiceOptions,
  MqttService,
  IPublishOptions,
  MqttModule
} from 'ngx-mqtt';

import { environment as env } from '../../../../environments/environment';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: env.mqtt.server,
  port: env.mqtt.port,
  protocol: (env.mqtt.protocol === 'wss') ? 'wss' : 'ws',
  path: '',
};

import { IClientSubscribeOptions } from 'mqtt-browser';
import { Subscription } from 'rxjs';
import { error } from 'protractor';
import { MilkCollect } from '../../../shared/model/MilkCollect';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class MainComponent implements OnInit {

  cols: any[];
  brands: SelectItem[];
  colors: SelectItem[];

  uploadedFiles: any[] = [];
  products: ProductModel[] = [];
  // products2: any[] = [];
  clonedProducts: { [s: string]: ProductModel; } = {};

  imagepath = '';
  ims: any[][] = [
     [1, 2, 3],
    [4, 5, 6]
  ];


  private curSubscription: Subscription | undefined;
  connection = {
    hostname: 'w795de7b.ala.us-east-1.emqxsl.com',
    port: 8084,
    path: '/mqtt',
    clean: true, // 保留会话
    connectTimeout: 4000, // 超时时间
    reconnectPeriod: 4000, // 重连时间间隔
    // 认证信息
    clientId: 'eip-dashboard',
    username: 'voda',
    password: 'voda2610',
    protocol: 'wss',
    connectOnCreate: false,
  };

  subscription = {
    topic: 'thumuasua',
    qos: 2,
  };

  publish = {
    topic: 'topic/browser',
    qos: 0,
    payload: '{ "msg": "Hello, I am browser." }',
  };
  receiveNews = '';
  qosList = [
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 },
  ];
  // client: MqttService | undefined;
  isConnection = false;
  subscribeSuccess = false;

  message: MilkCollect = null;
  messages: MilkCollect[] = [];

  constructor(
    private prodService: ProductsService,
    private messageService: MessageService,
    private router: Router,
    private client: MqttService
  ) {
    // this.client = this._mqttService;
  }

  ngOnInit() {

    // this.prodService.getAllproducts().subscribe(res => {
    //   console.log(res);
    //
    //   this.products = res.data;
    //   // this.products2 = this.products;
    //   console.log('======main products: ', this.products);
    // });

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'serialWeigher', header: 'Serial_Weigher' },
      { field: 'codeSeller', header: 'Code_Seller' },
      { field: 'nameSeller', header: 'Name_Seller' },
      // { field: 'imported_at', header: 'imported_at' },
      { field: 'codeTankSeller', header: 'Code_Tank_Seller' },
      { field: 'tankTareWeight', header: 'Tank_Tare_Weight' },
      { field: 'tankGrossWeight', header: 'Tank_Gross_Weight' },
      { field: 'tankNetWeght', header: 'Tank_Net_Weight' },
      { field: 'mqttStatus', header: 'Mqtt_Status' },
      // { field: 'type', header: 'created' },
      { field: 'createdAt', header: 'createdAt' }
    ];

    // FilterUtils['custom'] = (value, filter): boolean => {
    //     if (filter === undefined || filter === null || filter.trim() === '') {
    //         return true;
    //     }
    //
    //     if (value === undefined || value === null) {
    //         return false;
    //     }
    //
    //     return parseInt(filter) > value;
    // };

    this.createConnection();

  }

  // Create a connection
  createConnection() {
    // Connection string, which allows the protocol to specify the connection method to be used
    // ws Unencrypted WebSocket connection
    // wss Encrypted WebSocket connection
    // mqtt Unencrypted TCP connection
    // mqtts Encrypted TCP connection
    try {
      this.client.connect(this.connection as IMqttServiceOptions);
    } catch (error) {
      console.log('mqtt.connect error', error);
    }

    this.client.onConnect.subscribe(() => {
      this.isConnection = true;
      console.log('Connection succeeded!');
      this.doSubscribe();
    });

    this.client.onError.subscribe((error: any) => {
      this.isConnection = false;
      console.log('Connection failed', error);
    });

    this.client.onMessage.subscribe((packet: any) => {
      this.receiveNews = this.receiveNews.concat(packet.payload.toString());
      console.log(`Received message ${packet.payload.toString()} from topic ${packet.topic}`);
      try {
        this.message = JSON.parse(packet.payload.toString());
        this.messages.push(this.message);
      } catch (e) {
        console.log(' parse error');
      }
    });
  }

  doSubscribe() {
    const { topic, qos } = this.subscription;
    console.log('-------------- subscribing to ' + topic);
    this.curSubscription = this.client.observe(topic, { qos } as IClientSubscribeOptions).subscribe(
      (message: IMqttMessage) => {
      this.subscribeSuccess = true;
      console.log('Subscribe to topics res', message.payload.toString());
    })
    ;
  }

  onRowEditInit(pr: ProductModel) {
    this.clonedProducts[pr.id] = { ...pr };
  }

  onRowEditSave(pr: ProductModel, index: number) {
    console.log('pr  will be edit: ', index);
    pr.imagepath = this.imagepath;
    console.log('imgpath update: ', this.imagepath);

    console.log(pr);

    this.prodService.editProduct(pr).subscribe(res => {
      console.log(res);
      console.log('======main products: ', this.products);
    },
      err => {
        console.log(err);

      }
    );
  }

  onRowEditCancel(pr: ProductModel, index: number) {
      this.products[index] = this.clonedProducts[pr.id];
      delete this.clonedProducts[pr.id];
  }

  onBasicUpload(e) {
    this.uploadedFiles = [...e.files];
    this.imagepath = e.originalEvent.body.data;
    console.log('File uploaded: ', this.imagepath);

    // this.uploadedFiles = [...e.files];
    // let imgs = e.originalEvent.body.data;
    // this.imagepath = JSON.stringify(imgs);
    // console.log('File uploaded: ', this.imagepath);
  }

  handleRoute(e) {
      this.router.navigate(['/admin/insert']);
  }

}
