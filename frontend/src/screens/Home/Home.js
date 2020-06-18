import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {Title} from './styles';
import Background from '../../components/Background/Background';
import {appColors} from '../../utils/appColors';
import ShadowButton from '../../components/ShadowButton/ShadowButton';

export default function Home({navigation}) {
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    if (new Date(profile.payDay).getTime() < new Date().getTime()) {
      if (profile.cpf && profile.phone) {
        navigation.navigate('Payment');
      } else {
        navigation.navigate('CompleteRegister');
      }
    }
  }, [navigation, profile.cpf, profile.payDay, profile.phone]);
  //
  /*
      <Neomorph
        inner // <- enable shadow inside of neomorph
        swapShadows // <- change zIndex of each shadow color
        style={{
          shadowRadius: 24,
          borderRadius: 20,
          backgroundColor: darken(0.1, appColors.primary),
          width: 150,
          height: 150,
        }}>

      </Neomorph>
*/
  return (
    <Background>
      <Title>HomePage DevDoido</Title>
      <View style={{flex: 1, alignItems: 'center'}}>
        <ShadowButton textColor={appColors.white} color={appColors.primary}>
          Confirmar Pagamento
        </ShadowButton>
      </View>
    </Background>
  );
}
