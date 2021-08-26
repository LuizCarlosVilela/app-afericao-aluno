import React, { useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

//Libraries
import PagerView from 'react-native-pager-view';

//Components
import FormValidate from '@components/FormValidate';
import ScanFaceUser from '@components/ScanFaceUser';
import Button from '@components/Button';
import ScanRGUser from '@components/ScanRGUser';
import ScanRGBackUser from '@components/ScanRGBackUser';
import ScanCPFUser from '@components/ScanCPFUser';
import ScanAvatarUser from '@components/ScanAvatarUser';
import ScanVoucherUser from '@components/ScanVoucherUser';

//States
import { useAuth } from '@states/auth';

//Utils
import api from '@utils/api';
import { uploadImageOnS3 } from '@utils/services';
import ScanReportUser from '@components/ScanReportUser';

//Interfaces
interface SolicitationProps {
    id: string;
    name: string;
    cpf: string;
    rg: string;
    adress: string;
    url_rg: string;
    url_rg_verse: string;
    url_cpf: string;
    avatar: string;
    residency: string;
    sickness: string;
    user_id: string;
    status: string;
    mensage_validation: string;
};
  
interface SolicitationIdoso {
    solicitation : SolicitationProps | undefined;
    onPress: () => void;
}
interface PropsForm {
    name: string;
    cpf: string;
    rg: string;
    adress: string;
  }

export default function SolicitationReject({ solicitation, onPress } : SolicitationIdoso){
  const pagerRef = useRef(null);

  const { auth } = useAuth();
  const { user } = auth;

  const [faceId, setFaceId] = useState();
  const [form, setForm] = useState<PropsForm>();
  const [rg, setRG] = useState();
  const [rgVerse, setRGVerse] = useState();
  const [cpf, setCPF] = useState();
  const [avatar, setAvatar] = useState();
  const [voucher, setVoucher] = useState();
  const [report, setReport] = useState();
  const [statusReport, setStatusReport] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const handlePageChange = (pageNumber: number) => {
    pagerRef.current.setPage(pageNumber);
  };

  useEffect(() => {
    //console.log('SOLICITAÇÃO:',solicitation)
    //console.log('STATUS REPORT::', statusReport);
  }, [statusReport]);

  
  const handleSubmitData = async () => {
    setLoading(true);

    let url_user_face;
    if (faceId == null) {
      url_user_face = '';
    } else {
      url_user_face = await uploadImageOnS3(faceId);
    }

    let url_rg;
    if (rg == null) {
      url_rg = solicitation?.url_rg;
    } else {
      url_rg = await uploadImageOnS3(rg);
    }
    let url_rg_verse;
    if (rgVerse == null) {
      url_rg_verse = solicitation?.url_rg_verse;
    } else {
      url_rg_verse = await uploadImageOnS3(rgVerse);
    }

    let url_cpf;
    if (cpf == null) {
      url_cpf = solicitation?.url_cpf;
    } else {
      url_cpf = await uploadImageOnS3(cpf);
    }

    let avatar_url;
    if (avatar == null) {
      avatar_url = 'https://appidoso.s3.us-east-2.amazonaws.com/avatar-52rbegi8qg.jpg';
    } else {
      avatar_url = await uploadImageOnS3(avatar);
    }

    let residency;
    if (voucher == null) {
      residency = solicitation?.residency;
    } else {
      residency = await uploadImageOnS3(voucher);
    }

    let sickness;
    if (report == null) {
      sickness = solicitation?.sickness;
    } else {
      sickness = await uploadImageOnS3(report);
    }

    //console.log('Fomr:', form);
    //console.log('rg:', rg);
    //console.log('cpf:', cpf);
    //console.log('avatar:', avatar);
    //console.log('voucher:', voucher);
    //console.log('report:', report);
    //console.log('rg_verset:', rgVerse);
    //console.log('faceId:', faceId);

    let response = 'Solicitação realizada com sucesso!';

    try {
      const newCarteira = {
        id: solicitation?.id,
        name: form?.name,
        cpf: form?.cpf,
        rg: form?.rg,
        adress: form?.adress,
        url_user_face,
        url_rg,
        url_rg_verse,
        url_cpf,
        avatar: avatar_url,
        residency,
        sickness,
        status: 'validando',
      };
      console.log(newCarteira);
      response = await api.put('/solicitation/updateAll', newCarteira);
      console.log('RESPONSE UPDATE:', response);
      alert('Informações enviadas com sucesso!');
      onPress();
    } catch (error) {
      console.log(error);
      alert('Ocorreu alguma falha, tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PagerView
      style={{ flex: 1 }}
      initialPage={0}
      ref={pagerRef}
      scrollEnabled={false}
    >
      <View style={styles.pagerContainer} key="1">
        <Text style={styles.title}>Solicitação recusada!</Text>
        <View style={{backgroundColor: '#e4e4e4', width: '80%', height:'40%', borderRadius: 5, padding: 10}}>
            <Text style={[styles.subtitle, {fontWeight: 'bold'}]}>Motivo(s): </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.description} >{solicitation?.mensage_validation}</Text>
            </ScrollView>
        </View>
        <Text style={styles.subtitle}>Você deseja realizar uma nova solicitação?</Text>

        <TouchableOpacity style={styles.button} onPress={() => handlePageChange(1)}>
            <Text style={styles.buttonText}>Nova solicitação</Text>
        </TouchableOpacity>
      </View>

      <View key="2" style={styles.pagerContainer}>
        <FormValidate
        data={solicitation}
        onPress={(value: any) => {
            setForm(value);
            handlePageChange(2);
        }}
        />
        <Button title="Voltar" onPress={() => handlePageChange(0)} />
      </View>
      
      <View key="3" style={styles.pagerContainer}>
        <ScanRGUser
          img={solicitation?.url_rg}
          onPress={(value: any) => {
            setRG(value);
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(1)} />
          <Button
            title="Continuar"
            onPress={() => handlePageChange(3)}
          />
        </View>
      </View>
      <View key="4" style={styles.pagerContainer}>
        <ScanRGBackUser
          img={solicitation?.url_rg_verse}
          onPress={(value: any) => {
            setRGVerse(value);
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(2)} />
          <Button
            title="Continuar"
            onPress={() => handlePageChange(4)}
          />
        </View>
      </View>
      <View key="5" style={styles.pagerContainer}>
        <ScanCPFUser
          img={solicitation?.url_cpf}
          onPress={(value: any) => {
            setCPF(value);
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(3)} />
          <Button
            title="Continuar"
            onPress={() => handlePageChange(5)}
          />
        </View>
      </View>
      <View key="6" style={styles.pagerContainer}>
        <ScanAvatarUser
          img='https://appidoso.s3.us-east-2.amazonaws.com/avatar-52rbegi8qg.jpg'
          onPress={(value: any) => {
            setAvatar(value);
          }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(4)} />
          <Button
            title="Continuar"
            onPress={() => handlePageChange(6)}
          />
        </View>
      </View>
      <View key="7" style={styles.pagerContainer}>
        <ScanVoucherUser
          img={solicitation?.residency}
          onPress={(value: any) => {
            setVoucher(value);
          }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(5)} />
          <Button
            title="Continuar"
            onPress={() => handlePageChange(7)}
          />
        </View>
      </View>
      <View key="8" style={styles.pagerContainer}>
        <ScanReportUser
          img={solicitation?.sickness}
          onPress={(value: any) => {
            setReport(value);
          }}
          statusChecked={(value: any) => {
            if (value === 'denied') {
              setStatusReport(true);
            } else {
              setStatusReport(false);
            }
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(6)} />
          <Button
            title="Continuar"
            onPress={() => handlePageChange(8)}
          />
        </View>
      </View>
      <View key="9" style={{ justifyContent: 'center' }}>
        {loading ? (
          <View style={styles.pagerContainer}>
            <Text style={styles.title}>
              Enviando suas informações para nossa central de atendimento.
            </Text>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              flex: 1,
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  textAlign: 'center',
                  fontSize: 30,
                  fontWeight: 'bold',
                },
              ]}
            >
              {`Pronto, ${user?.name}!`}
            </Text>
            <Text
              style={[
                styles.title,
                {
                  fontSize: 20,
                  fontWeight: '500',
                  padding: '3%',
                  marginHorizontal: '5%',
                  textAlign: 'center',
                },
              ]}
            >
              Agora clique no botão "Atualizar Solicitação" para encaminhar seus
              dados! ;)
            </Text>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Button title="Voltar" onPress={() => handlePageChange(7)} />
              <Button
                title="Atualizar Solicitação"
                onPress={() => handleSubmitData()}
              />
            </View>
          </View>
        )}
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: '10%'
    },
    pagerContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#14467C',
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 17,
        padding: 10
    },
    button: {
        marginTop: 20,
        backgroundColor: '#14467C',
        padding: 10,
        width: 300,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    }
});