import React from 'react';
import {
    StyleSheet, View, StatusBar, Text, Dimensions, Animated, TouchableOpacity, ActivityIndicator
} from 'react-native';

interface Props {}
interface State {
    activity:string;
    isLoading:boolean;
    backgroundColor:string;
}

export default class App extends React.PureComponent <Props,State> {

    _scale:any;
    _colors:string[];

    constructor(props:Props){
        super(props);
        this.state={
            activity:'',
            isLoading:true,
            backgroundColor:'#fff'
        }
        this._colors = ['#AD2742','#4B3B40','#000505','#4C935B','#F95F5C','#4E8C73','#6B6B37','#6F68B7','#1D1B33','#1F93F2']
        this._scale = new Animated.Value(0)
    }

    componentDidMount(){
        fetch('https://www.boredapi.com/api/activity')
        .then((response) => response.json())
        .then(res => {
            let color = this._colors[Math.floor(Math.random() * 5)]
            this.setState({activity:res.activity,isLoading:false,backgroundColor:color},()=>{
                Animated.timing(this._scale,{
                    toValue:1,
                    duration:200,
                    useNativeDriver:true
                }).start()
            })
        })
    }

    _renderNewActivity = () => {
        this.setState({isLoading:true})
        fetch('https://www.boredapi.com/api/activity')
        .then((response) => response.json())
        .then(res => {
            Animated.timing(this._scale,{
                toValue:0,
                duration:300,
                useNativeDriver:true
            }).start(()=>{
                let color = this._colors[Math.floor(Math.random() * 5)]
                this.setState({activity:res.activity,isLoading:false,backgroundColor:color},()=>{
                    Animated.timing(this._scale,{
                        toValue:1,
                        duration:200,
                        useNativeDriver:true
                    }).start()
                })  
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Text style={{color:'#333',paddingTop:10,fontSize:20,fontFamily: 'MontserratMedium'}}>Feeling bored?</Text>
                <Animated.View style={{flex:1,justifyContent:'center',alignItems: 'center',transform:[{
                    scale:this._scale
                }]}}>
                    {this.state.activity != '' && <View style={[styles.cardView,{backgroundColor:this.state.backgroundColor}]}>
                        <Text style={styles.text}>
                            {this.state.activity}
                        </Text>
                    </View>}
                </Animated.View>
                <TouchableOpacity style={{ padding:10 }} onPress={this._renderNewActivity}>
                    {this.state.isLoading ? 
                        <ActivityIndicator color="#333" size="small" /> :
                        <Text style={{textAlign:'center',fontFamily: 'MontserratMedium',marginRight: 10 }}>TRY ANOTHER</Text>
                    }
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:30
    },
    text:{
        color:'#fff',
        fontSize: 24,
        fontFamily: 'Montserrat'
    },
    cardView:{
        backgroundColor:'teal',
        borderRadius: 10,
        minHeight:250,
        width:Dimensions.get('screen').width - 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding:20,
        elevation:10
    }
});