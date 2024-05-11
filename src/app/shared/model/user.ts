export interface User {
    id?;
    name?;
    email?;
    username?;
    serialWeigher?;
    password?;
    address?;
    phone?;
    roles?;
}

export interface Weigh {
    id?;
    model?;
    power?;
    dateProduce?;
    serialWeigher?;
    // topic?;
    // qos?;
    // constructor() {
    // }
}

export interface Role {
    id?;
    name?;
}

// export class Weigh {
//     id: number;
//     model: string;
//     power: string;
//     dateProduce: Date;
//     serialWeigher: string;
//     // topic?;
//     // qos?;
//     constructor() {
//     }
// }


// id: number;
// name: '';
// email: '';
// username: '';
// serialWeigher: '';
// password: '';
// address: '';
// phone: '';