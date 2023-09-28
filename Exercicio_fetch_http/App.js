import { Text, View, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from "react";

type NotaProps = {nome: string, nota: string}

const Nota = ({nome, nota}: NotaProps) => (
  <View style={styles.itemLista}>
    <View style={styles.itemLista}>
      <View style={nota < 6 ? styles.bolaVermelha : styles.bolaAzul}></View>
      <Text style={{ padding: 10, fontSize: 18 }}>{nome}</Text>
    </View>
    <View>
      <Text style={{ padding: 10, fontSize: 18 }}>{nota}</Text>
    </View>
  </View>
);

export default function App() {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nomeCadastro, setNomeCadastro] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');

  useEffect(() => {
    fetch('https://6501a5d8736d26322f5c1121.mockapi.io/prova/notas')
      .then((resp) => resp.json())
      .then((json) => setNotas(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const cadastrar = () => {
    if(nomeCadastro.trim !== '' && emailCadastro.trim !== '') {
      fetch("https://65148c8ddc3282a6a3cd489a.mockapi.io/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nomeCadastro,
          email: emailCadastro
        }),
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(JSON.stringify(responseData));
        limpar();
      })
    }
  }

  const limpar = () => {
    setNomeCadastro('');
    setEmailCadastro('');
  }

  return (
    <View style={styles.containerPai}>
    <View style={styles.cadastroView}>
      <Text style={{  padding: 8, fontSize: 25,  fontWeight: 'bold', marginBottom: 20}}> Cadastro de usuario</Text>
          <TextInput
                style={styles.imputText}
                onChangeText={setNomeCadastro}
                value={nomeCadastro}
                placeholder= 'Nome'
              />
          <TextInput
            style={styles.imputText}
            onChangeText={setEmailCadastro}
            value={emailCadastro}
            placeholder= 'Email'
          />
          <View style={styles.botoesView}>
            <Pressable onPress={limpar}>
              <Text style={styles.buttonLimpar}>
                Limpar
              </Text>
            </Pressable>
            <Pressable onPress={cadastrar}>
              <Text style={styles.buttonCadastrar}>
                Cadastrar
              </Text>
            </Pressable>
          </View>
    </View>

    <Text style={{  padding: 8, fontSize: 25,  fontWeight: 'bold', marginBottom: 20}}>Lista De Alunos</Text>
    {loading
      ? (<Text style={{  padding: 8, fontSize: 25,  fontWeight: 'bold'}}>Carregando...</Text>) 
      : (<FlatList
            data={notas}
            numColumns={1}
            renderItem={({item}) => <Nota nome={item.nome} nota={item.nota} />}
          />)}
    </View>
  );
}

const styles = StyleSheet.create({
  containerPai: {
    flex:1,
    marginTop: 50,
    alignItems: 'center'
  },
  itemLista: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    },
  bolaVermelha: {
    borderRadius: 100, 
    width: 40,
    height: 40, 
    backgroundColor: 'red'
  },
  bolaAzul: {
    borderRadius: 100, 
    width: 40,
    height: 40, 
    backgroundColor: 'blue'
  },
  cadastroView: {
    marginTop: 30,
    marginBottom: 30,
    padding: 5
  },
  botoesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imputText: {
    fontSize: 20,
    height: 40,
    width: 280,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
  buttonCadastrar: {
    padding: 10,
    width: 110,
    height: 45,
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'black'
  }
  ,
  buttonLimpar: {
    padding: 10,
    width: 100,
    height: 45,
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'black'
  }
});