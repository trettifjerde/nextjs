'use client';
import { ReactNode, createContext, useCallback, useState } from "react";

const UserContext = createContext({
    username: '',
    signIn: (u: string, t: string) => {},
    signOut: () => {}
});

export function UserContextProvider({children} : {children: ReactNode}) {

    const [username, setUser] = useState('');

    const signIn = useCallback((username: string, token: string) => {
        setUser(username);
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