import AsyncStorage from '@react-native-async-storage/async-storage';

async function getStorage(){
    let back = false;
    try {
        await AsyncStorage.getItem('@my_Places')
            .then(req => {
                if (JSON.parse(req) != null) {
                    back = JSON.parse(req);
                }
            })
            .catch(error => { back = false});
    } catch (e) {
        // error reading value
        back = false
    }
    return back
}

async function setStorage(newData) {
    let back;
    try {
        const jsonValue = JSON.stringify(newData)
        await AsyncStorage.setItem('@my_Places', jsonValue)
        back = true
    } catch (e) {
        back = false
    }
    return back;
}

async function deleteStorage() {
    try {
        await AsyncStorage.removeItem('@my_Places');
        return true;
    }
    catch (exception) {
        return false;
    }
}

export { getStorage, setStorage, deleteStorage};