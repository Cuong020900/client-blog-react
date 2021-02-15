import {createContext} from "react";

interface Store {
    loggedIn: boolean;
    username: string;
    setUsername: any;
    setLoggedIn: any;
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
        setUsername: '',
        setLoggedIn: ''
    }
}

export const StoreContext = createContext<StoreContextData>(storeContextDefaultValue);