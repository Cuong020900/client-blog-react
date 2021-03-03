import {createContext} from "react";

interface Store {
    loggedIn: boolean;
    username: string;
    name: string;
    userId: number;
    setUserId: any;
    setUsername: any;
    setLoggedIn: any;
    avatar: string;
    setAvatar: any;
    setName: any;
}

export interface StoreContextData {
    store: Store;
}

// export const storeContextDefaultValue: StoreContextData = {
//     store: {
//         loggedIn: false,
//         username: '',
//         setUsername: ''
//     }
// }

export const storeContextDefaultValue: any = {
    store: {
        loggedIn: false,
        username: '',
        userId: 0,
        setUserId: '',
        setUsername: '',
        setLoggedIn: '',
        avatar: '',
        setAvatar: '',
        name: '',
        setName: ''
    }
}

export const StoreContext = createContext<StoreContextData>(storeContextDefaultValue);