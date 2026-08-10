export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    bloodGroup: string;
    role: string;
    image: string;

    birthDate: string;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    height: number;
    weight: number;

    address: {
        address: string;
        city: string;
        state: string;
        stateCode: string;
        postalCode: string;
        country: string;
    };

    company: {
        name: string;
        title: string;
        department: string;
        address: {
            address: string;
            city: string;
            state: string;
            stateCode: string;
            postalCode: string;
        };
    };

    bank: {
        cardNumber: string;
        cardType: string;
        cardExpire: string;
        iban: string;
    };

    crypto: {
        coin: string;
        wallet: string;
        network: string;
    };
    username: string;
}