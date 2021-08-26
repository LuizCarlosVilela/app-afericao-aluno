import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert 
} from 'react-native';

//Libraries
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

//Assets
import faceId from '../../assets/images/face-id.png';
import { comparebleImages, uploadImageOnRekognition } from '@utils/services';
import api from '@utils/api';
import { useAuth } from '@states/auth';
import check from '../../assets/images/check.jpg';
import denied from '../../assets/images/denied.png';
import faceUser from '../../assets/images/face-detect.png';
import Button from '@components/Button';

//Interface
interface PropsValidation {
  onPress: () => void;
}

const CheckFace: React.FC<PropsValidation> = ({ onPress}) => {
    const { auth, logout } = useAuth();
    const { user } = auth;
  
    const [image, setImage] = useState<any>(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [validateFace, setValidateFace] = useState('');
    const [validation, setValidation] = useState(false);

    async function handleFaceByUser(value: any) {
        console.log('entrou na funcao de validação de rosto')
        setLoading(true);
        const url_face = await uploadImageOnRekognition(value);

        console.log('URL FACE', url_face);

        const date = await api.get('/solicitation/user', {
        params: { user_id: user?.id },
        });

        if (date?.solicitation) {
        if (date?.solicitation.status === 'finalizado') {
            console.log('Face que voce mandou para validar', url_face);
            console.log('Face do usuário', date?.solicitation.url_user_face);

            let url_user_face = date?.solicitation.url_user_face;
            comparebleImages(url_face, url_user_face, function (response: string) {
            console.log('Resultado do reconhecimento facial');
            console.log(response);
            setValidateFace(response);
            });
        }
        }
        setLoading(false);
    }

    const getCamImage = async () => {
        if (Constants.platform?.ios) {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (!status) {
                alert('Precisamos dessa permissão!');
                setVisible(false);
                return;
            }
        }

        let result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.6,
        });

        if (!result.cancelled) {
        setImage(result);
        handleFaceByUser(result);
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.containerImage]}>
                {image === null ? (
                <>
                    <Text style={styles.title}>
                        Clique na imagem abaixo para validar o seu reconhecimento facial
                    </Text>
                    <TouchableOpacity onPress={() => getCamImage()}>
                    <Image
                        source={faceId}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    </TouchableOpacity>
                </>
                ) : (
                    <>
                    {loading ? (
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.subtitle}>Analisando o seu rosto...</Text>
                            <ActivityIndicator size="large" color="#14467C" />
                        </View>
                    ) : 
                    (
                        <>
                            {validateFace === "Reconhecimento facial valido!" && (
                                <>
                                    <View style={{flex:1, justifyContent: 'space-around'}}>
                                        <Text style={[styles.title,{textAlign: 'center'}]}>Aprovado!</Text>
                                        <Image
                                            style={styles.image}
                                            source={check}
                                            resizeMode='cover'
                                        />
                                    </View>
                                    <Button title="Continuar" onPress={() => 
                                            {
                                                onPress();
                                                setImage(null);
                                                setValidateFace('');
                                            }
                                        } />
                                </>
                            )}
                            {validateFace === "Reconhecimento facial inválido!" && (
                                <>
                                    <View style={{flex:1, justifyContent: 'space-around', }}>
                                        <Text style={[styles.title,{textAlign: 'center'}]}>Reprovado!</Text>
                                        <Image
                                            style={styles.image}
                                            source={denied}
                                            resizeMode='contain'
                                        />
                                    </View>

                                    <Button title="Refazer validação" onPress={() => 
                                        {
                                            setValidateFace('');
                                            setImage(null);
                                        }} 
                                    />
                                </>
                            )}
                            {validateFace === "Deu algum error, tente novamente." && (
                                <>
                                    <View style={{flex:1, justifyContent: 'space-around', alignItems: 'center'}}>
                                        <Text style={[styles.title,{textAlign: 'center'}]}>Nenhum rosto detectado!</Text>
                                        <Image
                                            style={styles.image}
                                            source={faceUser}
                                            resizeMode='contain'
                                        />
                                    </View>
                                    <Button title="Refazer validação" onPress={() => 
                                        {
                                            setValidateFace('');
                                            setImage(null);
                                        }} 
                                    />
                                </>
                            )}

                        </>
                    )
                    }
                    </>
                )}
            </View>
        </View>
    );
};

export default CheckFace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '10%',
    marginVertical: '10%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#14467C',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: '2%',
    textAlign: 'center',
  },
  containerImage: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  validationContainer: {
      
  }
});
