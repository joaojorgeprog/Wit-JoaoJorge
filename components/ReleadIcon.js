import React from 'react';
import { View , StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../utils/index'

export default function ReleadIcon({load}) {
    const reloadIconName = Platform.OS == 'ios' ? 'ios-refresh' : 'md-refresh'
    return(
        <View style={styles.releadIcon}>
            <Ionicons onPress={load} name={reloadIconName} size={24} color={colors.PRIMARY_COLOR} />
        </View>
    )
}

const styles = StyleSheet.create({
    releadIcon: {
        position: 'absolute',
        top: 30,
        right: 20
    }
})