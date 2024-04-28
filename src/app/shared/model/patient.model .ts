import { DateService} from '../services/date.util.service';
export class PatientModel {
    id: number;
    patientName: string;
    patientId: string;
    username: string;
    password: string;
    fullname: string;
    khu: string;
    sohoso: string;
    sotheodoi: string;
    tomtatba: string;
    idcard: string;
    mobile: string;
    height: string;
    weight: string;
    huyetap: string;
    gender: string;
    homephone: string;
    imagepath: string;
    address: string;
    birthday: Date;
    birthYear: number;
    age: number;
    blood: string;
    refferent: string;
    imported_at: Date;
    history: string;
    note: string;
    updated_at: string;
    created_at: string;

    constructor(
        // private dateSvc: DateService
    ) {
    }
}


// CREATE TABLE `patient` (
//     `id` bigint(20) NOT NULL AUTO_INCREMENT,
//     `patient_name` varchar(40) NOT NULL,
//     `patient_id` varchar(25),
//     `username` varchar(15),
//     `fullname` varchar(15),
//     `idcard` varchar(15),
//     `imagepath` text(1000),
//     `mobile` varchar(15),
//     `weight` varchar(15),
//     `height` varchar(15),
//     `huyetap` varchar(15),
//     `homephone` varchar(15),
//     `address` varchar(250),
//     `birthday` TIMESTAMP DEFAULT 0,
//     `birth_year` varchar(50),
//     `refferent` varchar(250),
//     `email` varchar(40),
//     `password` varchar(100),
//     `created_at` TIMESTAMP  DEFAULT 0,
//     `imported_at` TIMESTAMP  DEFAULT 0,
//     `updated_at` TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     `blood` varchar(3),
//     `history` varchar(250),
//     `note` varchar(250),
//     `sotheodoi` text(50000)
//     PRIMARY KEY (`id`),
//     UNIQUE KEY `uk_users_username` (`username`),
//     UNIQUE KEY `uk_users_email` (`email`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
