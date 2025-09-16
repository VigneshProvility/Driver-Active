
export const setUserCrendIntoLocalStorage = (user) => {
    localStorage.setItem('userCredentials', JSON.stringify(user));
}

export const getUserCrendIntoLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userCredentials'));
}

export const setLanguageToStorage = (language) => {
    localStorage.setItem('language', language);
}

export const getLanguageFromLocalStorage = () => {
    return localStorage.getItem('language');
}
