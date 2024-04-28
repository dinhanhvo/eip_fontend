export class Resume {
    profilePic: string;
    name: string;
    address: string;
    contactNo: number;
    email: string;
    socialProfile: string;
    experiences: DonThuoc[] = [];
    educations: Education[] = [];
    otherDetails: string;
    skills: Skill[] = [];
    donThuocs: DonThuoc[] = [];

    constructor() {
        this.experiences.push(new DonThuoc());
        this.educations.push(new Education());
        this.skills.push(new Skill());
    }
}

export class Experience {
    employer: string;
    jobTitle: string;
    jobDescription: string;
    startDate: string;
    experience: number;
}

export class Education {
    degree: string;
    college: string;
    passingYear: string;
    percentage: number;
}

export class Skill {
    value: string;
}


export class DonThuoc {
    maThuoc: string;
    tenThuoc: string;
    cachdung: number;
    numb: string;
    time: string;
}