
export const getAuthCredentials = async (email, password) => {
    try {
        const url = `https://eumbrdevcloud.ddswireless.net/dpapi/ui/login`;
        const payload = {
            username: email,
            password: password,
        };
        const encryptCred = btoa(`${email}:${password}`);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${encryptCred}`,
            },
            body: JSON.stringify(payload), // ❗️use "body", not "payload"
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }
        return data;
    } catch(error) {
        throw new Error (`Login error: ${error.message}`);
    }
}
