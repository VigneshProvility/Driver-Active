
export const setUserCrendIntoLocalStorage = (user) => {
    localStorage.setItem('userCredentials', JSON.stringify(user));
}

export const getUserCrendIntoLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userCredentials'));
}
