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

export default function TelaItemLeilao() {
  const [itemLeilaoData, setItemLeilaoData] = useState([]);
  const [idItemLeilao, onChangeIDItemLeilao] = useState('');
  const [loading, setLoading] = useState(true);
  const [atualizaTela, setAtualizaTela] = useState(false);
  const [nome, onChangeNome] = useState('');
  const [valorMinimo, onChangeValorMinimo] = useState('');
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
                  deleteItemLeilao(itemLeilaoData[index].id);
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

  // Lista os itens de leilao
  useEffect(() => {
    fetch('https://leilao-rest-api.herokuapp.com/itemdeleilao/')
      .then((resp) => resp.json())
      .then((json) => {
        console.log('FETCH ITEM LEILAO', json);
        setItemLeilaoData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [atualizaTela]);

// cria item leilao
  const postItemLeilao = () => {
    if (nome == '' || valorMinimo == '') {
      setModalVisible(true);
    } else {
      fetch('https://leilao-rest-api.herokuapp.com/itemdeleilao/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          valorMinimo: valorMinimo,
          leilaoAberto: true
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
  const cadastrarItemLeilao = () => {
    postItemLeilao();
    onChangeValorMinimo('');
    onChangeNome('');
  };

  //deletar item leilao
  const deleteItemLeilao = (id) => {
    fetch('https://leilao-rest-api.herokuapp.com/itemdeleilao/' + id, {
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

    //encerrar leilao
    const encerrarLeilao = () => {
      encerrarLeilaoPatch(idItemLeilao);
      onChangeIDItemLeilao('');
    }
    const encerrarLeilaoPatch = (id) => {
      fetch('https://leilao-rest-api.herokuapp.com/itemdeleilao/' + id, {
        method: 'PATCH',
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
          <View style={styles.nomeMenu}>
                      <Text>Cadastro de item</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNome}
            value={nome}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeValorMinimo}
            value={valorMinimo}
            placeholder="Valor Minimo"
          />
          <View style={styles.button}>
            <Button title="Cadastrar" onPress={() => cadastrarItemLeilao()} />
          </View>
          <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin:12,
                        borderBottomWidth: 0.2,
                        borderTopWidth: 0.2,
                        justifyContent: 'center',
                      }}>
                        <Text>Encerrar Item Leilão</Text>
          </View>
          <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}>
            <TextInput
              style={{
                height: 40,
                width: 220,
                margin: 5,
                borderWidth: 0.5,
                padding: 10,
              }}
              onChangeText={onChangeIDItemLeilao}
              value={idItemLeilao}
              placeholder="Id Item Leilao"
            />
            <View style={styles.button}>
              <Button title="Encerrar" onPress={() => encerrarLeilao()} />
            </View>
          </View>

          <View style={styles.nomeMenu}>
                      <Text>Lista Item Leilão</Text>
          </View>
          <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin:12,
                        borderBottomWidth: 0.2,
                      }}>
                      <Text style={styles.nome}>ID</Text>
                      <Text style={styles.nome}>NOME</Text>
                      <Text style={styles.nome}>VLR MINIMO</Text>
                      <Text style={styles.nome}>STATUS</Text>
          </View>
          <FlatList
            data={itemLeilaoData}
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
                      <Text style={styles.nome}>{item.valorMinimo}</Text>
                      <Text style={styles.nome}>{item.leilaoAberto ? "Aberto" : "Fechado"}</Text>
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
  nomeMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 25,
    margin: 5,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    justifyContent: 'center',
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
    padding: 5,
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
