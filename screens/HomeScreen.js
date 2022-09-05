import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import SvgFile from '../SvgFile';

const HomeScreen = ({navigation}) => {

  const URL = 'https://api.football-data.org/v2/competitions/2014/standings?standingType=HOME'
  const KEY = 'a55eb3bd4f0c431dafebea863d89665b'

  useEffect(() => {
    getData()
  }, [])

  const [standings, setStandings] = useState([])

  const getData = async () => {
    try {
      const res = await axios.get(URL, {
        headers: {
          'X-Auth-Token': KEY
        }
      })
      setStandings(res.data.standings[0].table)
    } catch (error) {
      alert (error.message)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollViewWrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Image source={require('../assets/LaLiga.png')} style={styles.image} />
          <Text>La Liga 2022</Text>
        </View>
        <View style={styles.tableIndicatorsContainer}>
          <Text style={styles.indicators}>#</Text>
          <Text style={styles.indicatorsTeam}>Equipo</Text>
          <Text style={styles.indicators}>J</Text>
          <Text style={styles.indicators}>G</Text>
          <Text style={styles.indicators}>E</Text>
          <Text style={styles.indicators}>P</Text>
          <Text style={styles.indicators}>Pts</Text>
        </View>
          {standings.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('TeamDetailsScreen', {
                selectedTeamId: item.team.id
              })}>
                <View style={styles.teamsContainer}>
                  <Text>{item.position}</Text>
                  {item.team.crestUrl.includes('.svg')
                    ? <SvgFile uri={`${item.team.crestUrl}`} height={20} width={20} />
                    : <Image source={{ uri: `${item.team.crestUrl}` }} style={styles.image} />
                  }
                  <Text style={styles.teamName}>{item.team.name}</Text>
                  <Text>{item.playedGames}</Text>
                  <Text>{item.won}</Text>
                  <Text>{item.draw}</Text>
                  <Text>{item.lost}</Text>
                  <Text>{item.points}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewWrapper: {
    margin: 10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 20, 
    height: 20
  },
  tableIndicatorsContainer: {
    flexDirection: 'row', 
    justifyContent:'space-between', 
    margin: 10
  },
  indicators: {
    fontWeight: 'bold'
  },
  indicatorsTeam: {
    fontWeight: 'bold',
    width: '67%'
  },
  teamsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    margin: 10
  },
  teamName: {
    width: '58%'
  }
  
  
})

export default HomeScreen;