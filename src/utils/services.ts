import AWS from 'aws-sdk';
import { encode, decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

export const uploadImageOnS3 = async (file: any) => {
  try {
    const s3bucket = new AWS.S3({
      accessKeyId: 'AKIATGZSAQHEECVIBR7T',
      secretAccessKey: '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',
    });

    const ext = await file.uri.match(/.+\.(.+)/)[1];
    const name = await Math.random().toString(36).slice(-10);

    let contentType = 'image/jpeg';

    const base64 = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const arrayBuffer = await decode(base64);

    console.log('Array Buffer', arrayBuffer);

    const params = {
      Bucket: 'appidoso',
      Key: 'avatar-' + name + '.' + ext,
      Body: arrayBuffer,
      ContentType: contentType,
      ACL: 'public-read',
    };

    const data = await s3bucket.upload(params).promise();
    return data.Location;
  } catch (error) {
    return Promise.reject(new Error('Error, tente novamente!'));
  }
};

export const uploadImageOnRekognition = async (file: any) => {
  try {
    const s3bucket = new AWS.S3({
      accessKeyId: 'AKIATGZSAQHEECVIBR7T',
      secretAccessKey: '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',
    });

    const ext = await file.uri.match(/.+\.(.+)/)[1];
    const name = await Math.random().toString(36).slice(-10);

    let contentType = 'image/jpeg';

    const base64 = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const arrayBuffer = await decode(base64);

    const params = {
      Bucket: 'bucket-rekognition2',
      Key: name + '.' + ext,
      Body: arrayBuffer,
      ContentType: contentType,
      ACL: 'public-read',
    };

    const data = await s3bucket.upload(params).promise();
    return data.Location;
  } catch (error) {
    return Promise.reject(new Error('Error, tente novamente!'));
  }
};

export const comparebleImages = async (
  image01: string,
  image02: string,
  func: (response: string) => void
) => {
  console.log('Image01', image01);
  console.log('Image02', image02);

  let array_01 = image01.split('/');
  let name_01 = array_01[3];

  let array_02 = image02.split('/');
  let name_02 = array_02[3];

  console.log('Name01', name_01);
  console.log('Name02', name_02);

  const params = {
    SourceImage: {
      S3Object: {
        Bucket: 'bucket-rekognition2',
        Name: name_01,
      },
    },
    TargetImage: {
      S3Object: {
        Bucket: 'bucket-rekognition2',
        Name: name_02,
      },
    },
    SimilarityThreshold: 70,
  };

  var rekognition = new AWS.Rekognition({
    accessKeyId: 'AKIATGZSAQHEECVIBR7T',
    secretAccessKey: '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',
    region: 'us-east-1',
  });

  var resultado = 'hehe';

  rekognition.compareFaces(params, function (err, response) {
    if (err) {
      //console.log(err, err.stack); // an error occurred
      func('Deu algum error, tente novamente.');
      console.log('Deu algum error, tente novamente.');
    } else {
      //console.log('Foi');

      if (response.FaceMatches?.length) {
        //console.log(response.FaceMatches[0].Similarity);
        //console.log('Tudo ok');
        func('Reconhecimento facial valido!');
        console.log('Reconhecimento facial valido!');
      } else if (response.UnmatchedFaces) {
        //console.log(response.UnmatchedFaces);
        //console.log('O usuário é inválido!');
        func('Reconhecimento facial inválido!');
        console.log('Reconhecimento facial inválido!');
      }
    }
  });

  console.log(resultado);
};
