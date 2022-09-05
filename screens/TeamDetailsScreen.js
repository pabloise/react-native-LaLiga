import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, StyleSheet} from 'react-native'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import SvgFile from '../SvgFile'

const TeamDetailsScreen = ({route, navigation}) => {

  const TEAM_URL = `https://api.football-data.org/v2/teams/${route.params.selectedTeamId}`
  const MATCHES_URL = `http://api.football-data.org/v2/teams/${route.params.selectedTeamId}/matches?status=FINISHED`;
  const KEY = 'a55eb3bd4f0c431dafebea863d89665b'

  useEffect(() => {
    getTeamData()
    getMatchData()
  }, [])

  const [teamData, setTeamData] = useState([]);
  const [matchData, setMatchData] = useState([]);

  const getTeamData = async () => {
    try {
      const res = await axios.get(TEAM_URL, {
        headers: {
          'X-Auth-Token': KEY
        }
      })
      setTeamData(res.data)
    } catch (error) {
      alert (error.message)
    }
  }

  const getMatchData = async () => {
    try {
      const res = await axios.get(MATCHES_URL, {
        headers: {
          'X-Auth-Token': KEY
        }
      })
      setMatchData(res.data.matches[0]);
    } catch (error) {
      alert (error.message)
    }
  }

  const matchDate = new Date(matchData?.utcDate)
  const dateFormatted = matchDate.toLocaleString();
  const month = dateFormatted.split(' ')[1]
  const day = dateFormatted.split(' ')[2]
  const year = dateFormatted.split(' ')[4]

  const handle = () => {
    navigation.push('TeamDetailsScreen', {
      selectedTeamId: matchData?.awayTeam?.id
    })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.logoContainer}>
          {teamData.crestUrl?.includes('.svg')
            ? <SvgFile uri={`${teamData.crestUrl}`} height={200} width={200} />
            : <Image source={{ uri: `${teamData.crestUrl}` }} style={styles.logo} />
          }
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.teamName}>{teamData.name}</Text>
          <Text style={styles.title}>Úlitmo partido ⚽</Text>
          <View style={styles.lastMatchContainer}>
            <TouchableOpacity onPress={() => navigation.push('TeamDetailsScreen', {
                selectedTeamId: matchData?.homeTeam?.id
              })}>
              <Text>{matchData?.homeTeam?.name} </Text>
            </TouchableOpacity >
            <Text>{matchData?.score?.fullTime?.homeTeam} - {matchData?.score?.fullTime?.awayTeam} </Text>
            <TouchableOpacity onPress={handle}>
              <Text>{matchData?.awayTeam?.name} </Text>
            </TouchableOpacity>
          </View>
          <Text>{month} {day} {year}</Text>
          <Text style={styles.title}>Plantel 📄</Text>
          {teamData.squad?.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => {
                navigation.navigate('PlayerDetailsScreen', {
                  playerId: item.id
                })
              }}>
                <Text style={styles.playerName}>👨 {item.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: 'grey', 
    padding: 15, 
    alignItems: 'center'
  },
  logo: {
    width: 200, 
    height: 200
  },
  mainContainer: {
    alignItems: 'center', 
    paddingTop: 10, 
    borderTopWidth: 1, 
    marginTop: 10, 
    borderTopColor: 'gray'
  },
  teamName: {
    fontWeight: '600', 
    fontSize: 20
  },
  title: {
    paddingTop: 20, 
    fontWeight: 'bold'
  },
  lastMatchContainer: {
    flexDirection: 'row'
  },
  playerName: {
    padding: 5
  }
})

export default TeamDetailsScreen