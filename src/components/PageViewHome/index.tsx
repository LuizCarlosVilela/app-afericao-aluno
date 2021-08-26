import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

//Libraries
import PagerView from 'react-native-pager-view';

//States
import { useAuth } from '@states/auth';

//Utils
import api from '@utils/api';
import { uploadImageOnS3, uploadImageOnRekognition } from '@utils/services';

//Components
import Button from '@components/Button';
import FormValidate from '@components/FormValidate';
import Scan from '@components/Scan';
import ScanReportUser from '@components/ScanReportUser';
import ScanFaceUser from '@components/ScanFaceUser';

//Styles
const { height, width } = Dimensions.get('window');

interface PropsValidation {
  onPress: () => void;
}
interface PropsForm {
  name: string;
  cpf: string;
  rg: string;
  adress: string;
}

const PageViewHome: React.FC<PropsValidation> = ({ onPress }) => {
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
    //console.log('STATUS REPORT::', statusReport);
  }, [statusReport]);

  const handleSubmitData = async () => {
    setLoading(true);

    let url_user_face;
    if (faceId == null) {
      url_user_face = '';
    } else {
      url_user_face = await uploadImageOnRekognition(faceId);
    }

    let url_rg;
    if (rg == null) {
      url_rg = '';
    } else {
      url_rg = await uploadImageOnS3(rg);
    }
    let url_rg_verse;
    if (rgVerse == null) {
      url_rg_verse = '';
    } else {
      url_rg_verse = await uploadImageOnS3(rgVerse);
    }

    let url_cpf;
    if (cpf == null) {
      url_cpf = '';
    } else {
      url_cpf = await uploadImageOnS3(cpf);
    }

    let avatar_url;
    if (avatar == null) {
      avatar_url = '';
    } else {
      avatar_url = await uploadImageOnS3(avatar);
    }

    let residency;
    if (voucher == null) {
      residency = '';
    } else {
      residency = await uploadImageOnS3(voucher);
    }

    let sickness;
    if (report == null) {
      sickness = '';
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
      const newSolicitation = {
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

        user_id: user?.id,
      };
      console.log('SOLICITAÇÃO:', newSolicitation);
      response = await api.post('/solicitation/create', newSolicitation);
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
      <View key="1" style={styles.pagerContainer}>
        <View style={{ marginBottom: '20%' }}>
          <Text
            style={[
              styles.title,
              { textAlign: 'center', fontSize: 30, fontWeight: 'bold' },
            ]}
          >
            Seja bem-vindo!
          </Text>
          <Text
            style={[
              styles.title,
              {
                textAlign: 'center',
                fontWeight: '500',
                marginHorizontal: '2%',
              },
            ]}
          >
            Para receber a sua carteira de idoso digital é necessário primeiro
            realizar uma solicitação para os nossos agentes
          </Text>
        </View>

        <Button title="Continuar " onPress={() => handlePageChange(1)} />
      </View>

      <View key="2" style={styles.pagerContainer}>
        <FormValidate
          onPress={(value: any) => {
            setForm(value);
            handlePageChange(2);
          }}
        />
      </View>

      <View key="3" style={styles.pagerContainer}>
        <ScanFaceUser
          onPress={(value: any) => {
            setFaceId(value);
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(1)} />
          <Button
            title="Continuar"
            disabled={!faceId}
            onPress={() => handlePageChange(3)}
          />
        </View>
      </View>

      <View key="4" style={styles.pagerContainer}>
        <Scan
          title="Selecione ou tire uma foto da parte frontal do RG"
          onPress={(value: any) => {
            setRG(value);
            console.log(value);
          }}
          img={rg}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(2)} />
          <Button
            title="Continuar"
            disabled={!rg}
            onPress={() => handlePageChange(4)}
          />
        </View>
      </View>
      <View key="5" style={styles.pagerContainer}>
        <Scan
          title="Selecione ou tire uma foto da parte detrás do RG"
          onPress={(value: any) => {
            setRGVerse(value);
          }}
          img={rgVerse}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(3)} />
          <Button
            title="Continuar"
            disabled={!rgVerse}
            onPress={() => handlePageChange(5)}
          />
        </View>
      </View>
      <View key="6" style={styles.pagerContainer}>
        <Scan
          title="Selecione ou tire uma foto do seu CPF"
          onPress={(value: any) => {
            setCPF(value);
          }}
          img={cpf}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(4)} />
          <Button
            title="Continuar"
            disabled={!cpf}
            onPress={() => handlePageChange(6)}
          />
        </View>
      </View>
      <View key="7" style={styles.pagerContainer}>
        <Scan
          title="Selecione ou tire uma foto sua"
          onPress={(value: any) => {
            setAvatar(value);
          }}
          img={avatar}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(5)} />
          <Button
            title="Continuar"
            disabled={!avatar}
            onPress={() => handlePageChange(7)}
          />
        </View>
      </View>
      <View key="8" style={styles.pagerContainer}>
        <Scan
          title="Selecione ou tire uma foto do seu comprovante de residência"
          onPress={(value: any) => {
            setVoucher(value);
          }}
          img={voucher}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Voltar" onPress={() => handlePageChange(6)} />
          <Button
            title="Continuar"
            disabled={!voucher}
            onPress={() => handlePageChange(8)}
          />
        </View>
      </View>
      <View key="9" style={styles.pagerContainer}>
        <ScanReportUser
          onPress={(value: any) => {
            //console.log('report valor:', value)
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
          <Button title="Voltar" onPress={() => handlePageChange(7)} />
          <Button
            title="Continuar"
            disabled={statusReport}
            onPress={() => handlePageChange(9)}
          />
        </View>
      </View>
      <View key="10" style={{ justifyContent: 'center' }}>
        {loading ? (
          <View
            style={[
              styles.pagerContainer,
              { marginHorizontal: '10%', flex: 1 },
            ]}
          >
            <Text style={[styles.title, { fontSize: 25, textAlign: 'center' }]}>
              Enviando suas informações para nossa central de atendimento.
            </Text>
            <ActivityIndicator size="large" color="#14467C" />
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
              Agora clique no botão "Enviar Solicitação" para encaminhar seus
              dados! ;)
            </Text>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Button title="Voltar" onPress={() => handlePageChange(8)} />
              <Button
                title="Enviar Solicitação"
                onPress={() => handleSubmitData()}
              />
            </View>
          </View>
        )}
      </View>
    </PagerView>
  );
};

export default PageViewHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  pagerContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#14467C',
    marginBottom: 20,
  },
});
