import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TelaParticipantes() {
  const [participanteData, setParticipanteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [atualizaTela, setAtualizaTela] = useState(false);
  const [nome, onChangeNome] = useState('');
  const [cpf, onChangeCpf] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [index, setIndex] = useState(-1);

  const ConfirmaDialogo = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={dialogVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Confirma?</Text>
            <View
              style={{ flexDirection: 'row',  }}>
              <Pressable
                style={[styles.button, styles.buttonClose, { flex: 1 }]}
                onPress={() => setDialogVisible(!dialogVisible)}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, { flex: 1 }]}
                onPress={() => {
                  setDialogVisible(!dialogVisible);
                  deleteParticipante(participanteData[index].id);
                }}>
                <Text style={styles.textStyle}>ok</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalErro = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Campo vazio</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  // Lista os participantes
  useEffect(() => {
    fetch('https://leilao-rest-api.herokuapp.com/participante/')
      .then((resp) => resp.json())
      .then((json) => {
        console.log('FETCH PARTICIAPANTES', json);
        setParticipanteData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [atualizaTela]);

// cria participantes
  const postParticipante = () => {
    if (nome == '' || cpf == '') {
      setModalVisible(true);
    } else {
      fetch('https://leilao-rest-api.herokuapp.com/participante', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          cpf: cpf,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          console.log("Response CADASTRO: " + JSON.stringify(responseData));
          setAtualizaTela(!atualizaTela);
        })
        .finally();
    }
  };

  //botao de enviar novo participante
  const cadastrarParticipante = () => {
    postParticipante();
    onChangeCpf('');
    onChangeNome('');
  };

  //deletar participante
  const deleteParticipante = (id) => {
    fetch('https://leilao-rest-api.herokuapp.com/participante/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(() => {
        setAtualizaTela(!atualizaTela);
      })
      .finally();
  };


  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={{ flex: 1 }}>
          <ModalErro />
          <ConfirmaDialogo />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNome}
            value={nome}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeCpf}
            value={cpf}
            placeholder="CPF"
          />
          <View style={styles.button}>
            <Button title="Cadastrar" onPress={() => cadastrarParticipante()} />
          </View>
          <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin:12,
                        borderBottomWidth: 0.2,
                      }}>
                      <Text style={styles.nome}>ID</Text>
                      <Text style={styles.nome}>NOME</Text>
                      <Text style={styles.cpf}>CPF</Text>
                    </View>
          <FlatList
            data={participanteData}
            style={{ margin: 12 }}
            renderItem={({ item, index }) => {
              return (
                  <View style={styles.item}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      <Text style={styles.nome}>{item.id}</Text>
                      <Text style={styles.nome}>{item.nome}</Text>
                      <Text style={styles.cpf}>{item.cpf}</Text>
                    </View>
                    {(
                      //botão para excluir recurso
                      <Pressable
                        onPress={() => {
                          setIndex(index);
                          setDialogVisible(true);
                        }}>
                        <MaterialIcons
                          name="cancel"
                          size={18}
                          color="red"
                          style={{ padding: 4 }}
                        />
                      </Pressable>
                    )}
                  </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ededed',
    padding: 8,
  },
  nome: {
    fontSize: 12,
    marginRight: 8,
    flex: 2,
  },
  cpf: {
    fontSize: 12,
    marginRight: 8,
    flex: 3,
  },
  item: {
    marginVertical: 8,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginHorizontal:12
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
