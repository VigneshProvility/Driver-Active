
export const setUserCrendIntoLocalStorage = (user) => {
    localStorage.setItem('userCredentials', JSON.stringify(user));
}
