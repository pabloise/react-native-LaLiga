import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import axios from 'axios'

const PlayerDetailsScreen = ({route}) => {

  const PLAYER_URL = `https://api.football-data.org/v2/players/${route.params.playerId}`
  const KEY = 'a55eb3bd4f0c431dafebea863d89665b'

  useEffect(() => {
    getPlayerData()
  }, [])

  const [player, setPlayer] = useState([])
  
  const getPlayerData = async () => {
    try {
        const res = await axios.get(PLAYER_URL, {
            headers: {
                'X-Auth-Token': KEY
            }
        })
    setPlayer(res.data)
    } catch (error) {
        alert(error.message)
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.playerInfo}>👨 Nombre: {player.name}</Text>
      <Text style={styles.playerInfo}>🏟️ Posición: {player.position}</Text>
      <Text style={styles.playerInfo}>🌎 Nacionalidad: {player.nationality}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    playerInfo: {
        padding: 20,
        fontSize: 24
    }
})

export default PlayerDetailsScreen