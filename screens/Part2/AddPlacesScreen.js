import React from 'react';
import { StyleSheet, View , StatusBar} from 'react-native';
import ContainerAddCity from '../../components/ContainerAddCity'
import { needUpdate } from '../../redux';
import { useDispatch } from 'react-redux'


export default function AddPlacesScreen({navigation}) {

    const dispatch = useDispatch()


    function handleRefreshMyCitys() {
        
        navigation.navigate({
            name: 'MyPlaces'
        });

        dispatch(needUpdate())
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <ContainerAddCity setSuccess={() => { handleRefreshMyCitys()}} navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
