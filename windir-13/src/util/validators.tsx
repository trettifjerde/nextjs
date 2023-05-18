export function isLoginValid(login: string) {
    let digitCounter = 0;
    let underCounter = 0;
    let dashCounter = 0;
    let letterCounter = 0;
    
    if ((/^[-_]|[0-9]/.test(login)) || /[-_]$/.test(login))
        return false;
    
    for (let c of login)
    {
        if (c === "-")
            dashCounter++;    
        else if (c === "_")
            underCounter++;
        else if (c.charCodeAt(0) > 47 && c.charCodeAt(0) < 58)
            digitCounter++;
        else if (c >= "A" && c <= "Z")
            letterCounter++;
        else if (c >= "a" && c <= "z")
            letterCounter++;
        else
            return false;
        
        if (digitCounter > 3 || underCounter > 1 || dashCounter > 1)
            return false;
    }
    
    if (letterCounter < 3)
        return false;
        
    return true;
}

export function isEmailValid(email: string)
{
    return /^\w+([\.\-!#$%&'*+\-\/=?^_`{|}~]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function isPasswordValid(password: string) {
    return true;
}