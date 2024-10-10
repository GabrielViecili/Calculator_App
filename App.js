import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [valor1, setValor1] = useState('');
  const [valor2, setValor2] = useState('');
  const [operacao, setOperacao] = useState('');

  const realizarCalculo = () => {
    if (valor1 && valor2 && operacao) {
      const num1 = parseFloat(valor1);
      const num2 = parseFloat(valor2);
      let resultado = 0;

      switch (operacao) {
        case '+':
          resultado = num1 + num2;
          break;
        case '-':
          resultado = num1 - num2;
          break;
        case '*':
          resultado = num1 * num2;
          break;
        case '/':
          resultado = num1 / num2;
          break;
        default:
          return;
      }

      navigation.navigate('Resultado', {
        valor1: num1,
        valor2: num2,
        operacao,
        resultado,
      });
    } else {
      alert('Por favor, preencha todos os campos e escolha uma operação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o primeiro número"
        keyboardType="numeric"
        value={valor1}
        onChangeText={setValor1}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite o segundo número"
        keyboardType="numeric"
        value={valor2}
        onChangeText={setValor2}
        placeholderTextColor="#888"
      />

      <View style={styles.operationContainer}>
        <TouchableOpacity
          style={operacao === '+' ? styles.selectedOperationButton : styles.operationButton}
          onPress={() => setOperacao('+')}
        >
          <Text style={styles.operationText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={operacao === '-' ? styles.selectedOperationButton : styles.operationButton}
          onPress={() => setOperacao('-')}
        >
          <Text style={styles.operationText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={operacao === '*' ? styles.selectedOperationButton : styles.operationButton}
          onPress={() => setOperacao('*')}
        >
          <Text style={styles.operationText}>×</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={operacao === '/' ? styles.selectedOperationButton : styles.operationButton}
          onPress={() => setOperacao('/')}
        >
          <Text style={styles.operationText}>÷</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.calculateButton} onPress={realizarCalculo}>
        <Text style={styles.calculateButtonText}>Calcular</Text>
      </TouchableOpacity>
    </View>
  );
}

function ResultScreen({ route }) {
  const { valor1, valor2, operacao, resultado } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado</Text>
      <Text style={styles.resultText}>Valor 1: {valor1}</Text>
      <Text style={styles.resultText}>Valor 2: {valor2}</Text>
      <Text style={styles.resultText}>Operação: {operacao}</Text>
      <Text style={styles.resultText}>
        Cálculo: {valor1} {operacao} {valor2}
      </Text>
      <Text style={styles.resultText}>Resultado: {resultado}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Calculadora" component={HomeScreen} />
        <Stack.Screen name="Resultado" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
    fontSize: 18,
    color: '#333',
  },
  operationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  operationButton: {
    backgroundColor: '#e0e0e0',
    padding: 14,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOperationButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  operationText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },
  calculateButton: {
    backgroundColor: '#555',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultText: {
    fontSize: 20,
    marginVertical: 10,
    color: '#333',
  },
});
