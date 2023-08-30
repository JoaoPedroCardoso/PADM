import { Text, View, FlatList, StyleSheet, Image } from 'react-native';

const sacolaImg = require('./assets/icone-sacola.png');

const DATA = [
{img: require('./assets/01-tablelamps.png'), titulo: 'Abajur'},
{img: require('./assets/02-ceilinglamps.png'), titulo: 'Lampada de teto'},
{img: require('./assets/03-sconces.png'), titulo: 'Arandela'},
{img: require('./assets/04-floorlamps.png'), titulo: 'Luminaria de chao'},
{img: require('./assets/05-lightdecor.png'), titulo: 'Ligth decor'},
{img: require('./assets/06-garlands.png'), titulo: 'Garlands'}
]

type ItemProps = {img: string, titulo: string}

const Item = ({img, titulo}: ItemProps) => (
  <View style={styles.itemLista}>
    <Image style={styles.imagem} source={img} resizeMode='contain'/>
    <Text style={{ padding: 8, fontSize: 15, color: 'gray' }}>{titulo}</Text>
  </View>
);

export default function App() {
  return (


    <View style={styles.containerPai}>
    <Text style={{  padding: 8, fontSize: 20,  fontWeight: 'bold' }}>ListaProdutos</Text>
      <View style={styles.container}>
        
        <View style={styles.containerLighteria}>
          <View style={styles.tituloLighteria}>
            <Text style={styles.textoLighteria}>Lighteria</Text>
            <Image style={styles.imgSacola} source={sacolaImg}/>
          </View>

          <View style={{ borderBottomWidth: 2, borderBottomColor: 'gray' }}/>
          <Text style={styles.textoCategoria}>   Categorias</Text>

            <FlatList
              data={DATA}
              numColumns={2}
              renderItem={({item}) => <Item img={item.img} titulo={item.titulo} />}
              />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPai: {
    flex:1,
    marginTop: 35,
  },
  container: {
    flex:1,
    marginTop: 5,
    backgroundColor: '#d3d3d3'
  },
  containerLighteria: {
    flex:1,
    margin: 10
  },
  textoLighteria: {
    fontSize: 35, fontWeight: 'bold',
  },
  tituloLighteria: {
    marginTop: 20, 
    marginBottom: 20,
    margin: 8, 
    flexDirection: 'row',
    justifyContent: 'left'
  },
  imgSacola: {
    marginTop:-10,
    marginLeft: 200,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    width:50, 
    height:50
  },
  textoCategoria: {
    position: 'relative', fontSize: 20, top: -11, width: 100, left: '35%',  color: 'gray', 
    justifyContent: 'center', backgroundColor: '#d3d3d3'
  },
  itemLista: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 180,
    height: 180,
    backgroundColor: 'white',
    padding: 30,
    marginVertical: 8,
    marginHorizontal: 8,
    },
  imagem: {
    flex:1
  }
});