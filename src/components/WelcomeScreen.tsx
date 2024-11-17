import React, {useState, useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ButtonContainer, ButtonText, GreetingText, WelcomeText} from './styles';
import {ArrowRight} from 'lucide-react-native';

interface IWelcomeScreenProps {
  setShowWelcome: React.Dispatch<React.SetStateAction<boolean>>;
}

const WelcomeScreen = ({
  setShowWelcome,
}: IWelcomeScreenProps): React.JSX.Element => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(heightAnim, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  let heightPorcentage = heightAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const handleContinue = () => {
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setShowWelcome(false);
    });
  };

  return (
    <Animated.View
      style={[styles.animatedViewMain, {height: heightPorcentage}]}>
      <Animated.View
        style={[{opacity: opacityAnim}, styles.animatedViewContent]}>
        <WelcomeText>Bem-vindo ao MyMoney!</WelcomeText>
        <GreetingText>
          Gerencie suas finanças com facilidade e eficiência.
        </GreetingText>

        <ButtonContainer onPress={handleContinue}>
          <ButtonText>Continuar</ButtonText>
          <ArrowRight color={'#71c7ec'} size={30} />
        </ButtonContainer>
      </Animated.View>
    </Animated.View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  animatedViewMain: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedViewContent: {
    flex: 1,
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
