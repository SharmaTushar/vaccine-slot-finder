export const addHeaders = (req: any) => {
    req.headers = req.headers || {};
    req.headers['user-agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36';
    return req;
}
