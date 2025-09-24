// import React, { useLayoutEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Alert,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../types";
// import { useNavigation } from "@react-navigation/native";
// import { useUser } from "../contex/useContext";
// import { SignIn } from "../types/authType";
// import { login } from "../api/auth";
// import { useTranslation } from "react-i18next";

// const LoginScreen = () => {
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
//   const { handleToken, handleLogin } = useUser();
//   const [formData, setFormData] = useState<SignIn>({
//     phone: "",
//     password: "",
//   });

//   const { t } = useTranslation();

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: t("login.title"),
//     });
//   }, [navigation]);
//   const handleChange = (name: keyof SignIn, value: string) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     const { phone, password } = formData;
//     if (phone === "" || password === "") {
//       alert(`${t("alertMessage.loginEntryInput")}`);
//     } else {
//       const response = await login(formData);
//       const { user, token } = response.data;
//       if (token && user) {
//         handleToken(token);
//         navigation.navigate("MainPage");
//         handleLogin(user);
//       } else {
//         if (response.statusCode === 404) {
//           alert(t("alertMessage.userNotFound")); 
//         } else {
//           alert(t("alertMessage.loginFailed"));
//         }
//       }
//     }
//   };

//   return (
//     <ImageBackground
//       source={require("../assets/img/abstract_background.jpg")}
//       style={styles.container}
//     >
//       <Text style={styles.title}>{t("login.title")}</Text>

//       <View style={styles.inputContainer}>
//         <Ionicons
//           name="call-outline"
//           size={20}
//           color="#888"
//           style={styles.icon}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder={t("login.phone")}
//           value={formData.phone}
//           onChangeText={(value) => handleChange("phone", value)}
//           autoCapitalize="none"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Ionicons
//           name="lock-closed-outline"
//           size={20}
//           color="#888"
//           style={styles.icon}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder={t("login.password")}
//           value={formData.password}
//           onChangeText={(value) => handleChange("password", value)}
//           secureTextEntry
//           autoCapitalize="none"
//         />
//       </View>

//       <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
//         <Text>{t("login.signIn")}</Text>
//       </TouchableOpacity>

//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity>
//           <Text style={styles.forgotText}>{t("login.forgotPassword")}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//           <Text style={styles.registerText}>{t("login.register")}</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingHorizontal: 15,
//     borderRadius: 25,
//     width: 280,
//     height: 45,
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "transparent",
//   },
//   loginButton: {
//     top: 15,
//     width: 120, // Biraz daha büyük yapalım
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 15,
//     borderRadius: 15,
//     backgroundColor: "#a4d6ed",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 6,
//     transform: [{ scale: 1 }],
//   },

//   loginButtonPressed: {
//     transform: [{ scale: 0.95 }],
//   },
//   forgotText: {
//     color: "#ffff",
//     fontSize: 15,
//     textDecorationLine: "underline",
//   },
//   registerText: {
//     color: "#ffff",
//     top: 5,
//     fontWeight: "bold",
//     fontSize: 15,
//     textDecorationLine: "underline",
//   },
//   buttonsContainer: {
//     flexDirection: "column", // Butonları dikey hizalamak için
//     alignItems: "center", // Ortalar
//     top: 140, // Butonların üst kısmına boşluk ekler
//   },
// });

// export default LoginScreen;


import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useUser } from '../contex/useContext';
import { SignIn } from '../types/authType';
import { login } from '../api/auth';
import { RootStackParamList } from '../types';

const { width } = Dimensions.get('window');

// TypeScript interfaces
interface FormData extends SignIn {
  phone: string;
  password: string;
}

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

// BlurView alternative component
interface BlurViewProps {
  children: React.ReactNode;
  style?: any;
  intensity?: number;
  tint?: string;
}

const BlurView: React.FC<BlurViewProps> = ({ children, style }) => {
  return (
    <View style={[style, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]}>
      {children}
    </View>
  );
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { handleToken, handleLogin } = useUser();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<string>('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('login.title'),
    });
  }, [navigation, t]);

  const handleChange = (name: keyof FormData, value: string): void => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    const { phone, password } = formData;
    
    if (phone === '' || password === '') {
      Alert.alert(t('alertMessage.error'), t('alertMessage.loginEntryInput'));
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(formData);
      const { user, token } = response.data;
      
      if (token && user) {
        handleToken(token);
        navigation.navigate('MainPage');
        handleLogin(user);
      } else {
        if (response.statusCode === 404) {
          Alert.alert(t('alertMessage.error'), t('alertMessage.userNotFound'));
        } else {
          Alert.alert(t('alertMessage.error'), t('alertMessage.loginFailed'));
        }
      }
    } catch (error) {
      Alert.alert(t('alertMessage.error'), t('alertMessage.loginFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = (inputName: string): void => {
    setFocusedInput(inputName);
  };

  const handleBlur = (): void => {
    setFocusedInput('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Logo Section */}

            {/* Form Container */}
            <BlurView style={styles.formContainer}>
              {/* Phone Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('login.phone')}</Text>
                <View style={[
                  styles.inputContainer,
                  focusedInput === 'phone' && styles.inputContainerFocused
                ]}>
                  <Ionicons 
                    name="call-outline" 
                    size={20} 
                    color={focusedInput === 'phone' ? '#ec4899' : '#9ca3af'} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={formData.phone}
                    onChangeText={(value) => handleChange('phone', value)}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    placeholder={t('login.phonePlaceholder')}
                    placeholderTextColor="#9ca3af"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('login.password')}</Text>
                <View style={[
                  styles.inputContainer,
                  focusedInput === 'password' && styles.inputContainerFocused
                ]}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={20} 
                    color={focusedInput === 'password' ? '#8b5cf6' : '#9ca3af'} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(value) => handleChange('password', value)}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#9ca3af" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isLoading || !formData.phone || !formData.password}
                style={[
                  styles.loginButton,
                  (!formData.phone || !formData.password || isLoading) && styles.loginButtonDisabled
                ]}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={isLoading ? ['#6b7280', '#6b7280'] : ['#ec4899', '#8b5cf6', '#06b6d4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginButtonGradient}
                >
                  {isLoading ? (
                    <View style={styles.loginButtonContent}>
                      <Text style={styles.loginButtonText}>{t('login.loading')}</Text>
                    </View>
                  ) : (
                    <View style={styles.loginButtonContent}>
                      <Text style={styles.loginButtonText}>{t('login.signIn')}</Text>
                      <Ionicons name="arrow-forward" size={20} color="white" />
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Forgot Password */}
              <TouchableOpacity 
                style={styles.forgotPassword}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPasswordText}>
                  {t('login.forgotPassword')}
                </Text>
              </TouchableOpacity>
            </BlurView>



          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    minHeight: Dimensions.get('window').height,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: width * 0.2,
    height: width * 0.2,
    maxWidth: 80,
    maxHeight: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: Math.min(width * 0.08, 32),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Math.min(width * 0.04, 16),
    color: '#d1d5db',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    height: 56,
  },
  inputContainerFocused: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: '#ec4899',
    borderWidth: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 8,
  },
  loginButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  loginButtonDisabled: {
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginRight: 8,
  },
  forgotPassword: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#d1d5db',
    textDecorationLine: 'underline',
  },
  signUpContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
  },
  signUpLink: {
    color: '#ec4899',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  socialContainer: {
    marginTop: 24,
    width: '100%',
    maxWidth: 400,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#d1d5db',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
  },
  socialButtonBlur: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
  },
  socialIcon: {
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});

export default LoginScreen;