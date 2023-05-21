export const fetchData = async(url: string, data?: any) => {
    const params = data ? {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    } : {method: 'GET'};

    return fetch(url, params).catch(error => {
        console.log(error);
        return new Response(JSON.stringify({error: 'Произошла ошибка. Проверьте подключение и повторите позже'}), {status: 500})
    })
}