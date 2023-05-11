'use client';
import { ReactNode, createContext, useCallback, useState } from "react";

const UserContext = createContext({
    username: '',
    signIn: (name: string, pwd: string) => {},
    signOut: () => {}
});

export function UserContextProvider({children} : {children: ReactNode}) {

    const [username, setUser] = useState('');

    const signIn = useCallback((name: string, pwd: string) => {
        setUser(name);
    }, [setUser]);

    const signOut = useCallback(() => setUser(''), [setUser]);

    return <UserContext.Provider value={{
        username,
        signIn,
        signOut
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;