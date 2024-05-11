export interface User {
    id?;
    name?;
    email?;
    username?;
    serialWeigher?;
    password?;
    address?;
    phone?;
}
export class Weigh {
    id: number;
    model: string;
    power: string;
    dateProduce: Date;
    serialWeigher: string;
    // topic?;
    // qos?;
    constructor() {
    }
}


// id: number;
// name: '';
// email: '';
// username: '';
// serialWeigher: '';
// password: '';
// address: '';
// phone: '';