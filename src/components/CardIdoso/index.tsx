import React from 'react';
import { View, Text, Image, ScrollView} from 'react-native';

//Libraries
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

//Components
import logoHeader from '@assets/images/logo-header-elderly.png';
import iconSMTT from '@assets/images/logo-smtt.png';

//Styles
import styles from './styles';

interface WalletIdosoProps {
    number_registration: string;
    date_emission: string;
    unity_federation: string;
    city: string;
    agency: string;
    date_validate: string;
    name_user: string;
}

interface WalletProps{
    data: WalletIdosoProps | undefined;
}

export function CardIdoso({ data } : WalletProps) {
    return (
        <View style={styles.container}>
            <LinearGradient style={styles.wallet} colors={['rgba(196,196,196,0.45)', '#d3d3d3aa']}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>ESTACIONAMENTO</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.items}>
                        <Image style={styles.image} source={logoHeader} resizeMode="contain" />
                       
                       <View style={styles.line}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>{`Nº DO REGISTRO: ${data?.number_registration}`}</Text>
                       </View>

                        <View style={styles.containerInfo}>
                            <View style={styles.info}>
                                <Text style={styles.text}>{`DATA DE EMISSÃO:  ${data?.date_emission} `}</Text>
                                <Text style={styles.text}>{`UNIDADE DA FEDERAÇÃO: ${data?.unity_federation} `}</Text>
                                <Text style={styles.text}>{`MUNICIPIO:  ${data?.city}`}</Text>
                                <Text style={styles.text}>{`ORGÃO EXPEDIDOR: ${data?.agency}`}</Text>
                                <Text style={styles.text}>{`VALIDADE: ${data?.date_validate}`}</Text>
                            </View>

                            <View style={styles.containerLogo}>
                                <Image style={styles.logo} source={iconSMTT} resizeMode="contain" />
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.containerNextCard}>
                <Text style={styles.nextCardText}>Arraste para o lado para ver o verso da carteira</Text>
                <AntDesign name="arrowright" size={26} color="black" />
            </View>
        </View>
    );
}

export function CardIdosoBack({ data }: WalletProps) {
    return (
        <View style={styles.container}>
            <LinearGradient style={styles.wallet} colors={['rgba(196,196,196,0.45)', '#d3d3d3aa']}>
            
                <View style={[styles.content]}>
                    <View style={[styles.items]}>

                        <View>
                            <Text style={styles.text}>{`NOME DO BENIFICIÁRIO: ${data?.name_user}` }</Text>
                        </View>
                        
                        <Text style={styles.subtitle}>REGRAS DE UTILIZAÇÃO</Text>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.containerRules}>
                            <Text>
                                1. A autorização concedida por meio deste cartão somente terá validade se o mesmo for 
                                apresentado no original e preencher as seguiintes condições: 
                            </Text>
                                <Text>1.1 Estiver colocado sobre o painel do veículo, com a fente voltada para cima;</Text>
                                <Text>1.2 For apresentado à autoridade de trânsito ou aos seus agentes, smepre que solicitado;</Text>
                        
                            <Text>
                                2. Este cartão de autorizado poderá ser recolhido e o ato da autorização suspenso ou cassado, 
                                a qualquer considerando-se como tal, dentre outros:
                            </Text>
                                <Text>
                                    2.1 O empréstimo do cartão a terceiros;
                                </Text>
                                <Text>
                                    2.2 O uso de cópia do cartão, efetuada por qualquer processo;
                                </Text>
                                <Text>
                                    2.3 O porte do cartão com rasuras ou falsificado;
                                </Text>
                                <Text>
                                    2.4 O uso do cartão em desacordo com as disposições nele contidas ou na legislação 
                                    pertinente, especialmente se constatado pelo agente que o veiculo por ocasião da utilização da
                                    vaga especial, não serviu para o transporte do idoso;
                                </Text>
                                <Text>
                                    2.5 O uso do cartão com validade vencida.
                                </Text>
                            <Text>
                                3. A presente autorização somente é válida para estacionar nas vagas devidamente sinalizadas 
                                com a legenda idoso.
                            </Text>
                            <Text>
                                4. Está autorizado também permite o uso em vagas de Estacionamento Rotativo Regulamentado, gratuito 
                                ou pago, sendo obrigatória a utilização conjunta do Cartão do estacionamento, bem como a obdiência ás
                                suas normas de utilização.
                            </Text>
                            <Text>
                                5. O derespeito ao disposto neste cartão de autorização, bem como às demais regras de trânsito e a sinalização
                                local, sujeitará o infrator as medidas administrativas, penalidades e pontuações previstas em lei.
                            </Text>
                        </ScrollView>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.containerNextCard}>
                <Text style={styles.nextCardText}>Arraste para o lado para ver o QRCode da carteira</Text>
                <AntDesign name="arrowright" size={26} color="black" />
            </View>
        </View>
    );
}
