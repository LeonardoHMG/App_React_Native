import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState('');

  function startGame(player) {
    setCurrentPlayer(player);
    setMoves(9);
    setBoard([
      ['', '', '',],
      ['', '', '',],
      ['', '', '',]
    ]);
    setScreen('game')
  }

  function play(row, column){
    board[row][column] = currentPlayer;
    setBoard([...board]);

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    checkWinner(board, row, column);
  }

  function checkWinner(board, row, column){
    //linhas
    if(board[row][0] !== '' && board[row][0] === board[row][1] && board[row][1] === board[row][2]){
      return finishGame(board[row][0]);
    }
    //colunas
    else if(board[0][column] !== '' && board[0][column] === board[1][column] && board[1][column] === board[2][column]){
      return finishGame(board[0][column]);
    }
    //diagonal 1
    else if(board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
      return finishGame(board[0][0]);
    }
    //diagonal 2
    else if(board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
      return finishGame(board[0][2]);
    }

    // nenhum ganhador

    if((moves - 1) === 0){
      return finishGame('');
    }

    setMoves((moves - 1));
  }

  function finishGame(player){
    setWinner(player);
    setScreen('winner');
  }

  switch (screen) {
    case 'menu':
      return getScreenMenu();
    case 'game':
      return getScreenGame();
    case 'winner':
      return getScreenWinner();
  }

  function getScreenMenu() {
    return (
      <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.container}>
        <Text style={styles.title}>Jogo da Velha</Text>
          <Text style={styles.subtitle}>Escolha um jogador:</Text>

          <View style={styles.inlineItems}>
            <TouchableOpacity style={styles.boxPlayer} onPress={() => startGame('X')}>
              <Text style={styles.playerX}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxPlayer} onPress={() => startGame('O')}>
              <Text style={styles.playerO}>O</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>Leonardo Henrique Martucci Gussi - AMS-Fatec</Text>

          <StatusBar style="auto" />
      </LinearGradient>
    );
  }

  function getScreenGame() {
    return (
      <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.container}>
        <Text style={styles.title}>Jogo da Velha</Text>

        <Text style={styles.subtitle}> Sua vez: {currentPlayer}</Text>
        {
          board.map((row, rowNumber) => {
            return (
              <View key={rowNumber} style={styles.inlineItems}>
                {
                  row.map((column, columnNumber) => {
                    return (
                      <TouchableOpacity 
                      key={columnNumber} 
                      style={styles.boxPlayer} 
                      onPress={() => play(rowNumber, columnNumber)}
                      disabled={column !== ''}>
                        <Text style={column === 'X' ? styles.playerX : styles.playerO}>{column}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          })
        }

        <TouchableOpacity style={styles.button} onPress={() => setScreen('menu')}>
          <Text style={styles.textButton}>Voltar ao menu</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </LinearGradient>
    );
  }

  function getScreenWinner() {
    return (
      <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.container}>
        <Text style={styles.title}>Jogo da Velha</Text>
        <Text style={styles.subtitle}>Resultado final:</Text>

        {
          winner === '' &&
          <Text style={styles.winner}>Nenhum ganhador</Text>
        }

        {
          winner !== '' &&
          <>
            <Text style={styles.winner}>Ganhador:</Text>
            <View style={styles.boxPlayer}>
            <Text style={winner === 'X' ? styles.playerX : styles.playerO}>{winner}</Text>
            </View>
          </>
        }

        <TouchableOpacity style={styles.button} onPress={() => setScreen('menu')}>
          <Text style={styles.textButton}>Jogar Novamente</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </LinearGradient>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    color: '#333',
    marginTop: 20
  },
  boxPlayer: {
    width: 80,
    height: 80,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  playerX: {
    fontSize: 40,
    color:'#006400'
  },
  playerO: {
    fontSize: 40,
    color: '#DAA520'
  },
  inlineItems: {
    flexDirection: 'row'
  },
  button:{
    marginTop: 20,
    backgroundColor: '#333',
    padding:10,
    borderRadius:10,
  },
  textButton:{
    color:'#fff',
  },
  winner:{
    fontSize:24,
    fontWeight:'bold',
  },
  footer:{
    position: 'absolute',
    left: 0,
    bottom: 0,
    color:'#555'
  },
});