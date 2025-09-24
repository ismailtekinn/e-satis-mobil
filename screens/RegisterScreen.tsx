import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { Register } from "../types/authType";
import { useUser } from "../contex/useContext";
import { register } from "../api/auth";
import { useTranslation } from "react-i18next";

const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [formData, setFormData] = useState<Register>({
    Name: "",
    Surname: "",
    Username: "",
    Email: "",
    Password: "",
    Phone: "",
  });

  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("register.title"),
    });
  }, [navigation]);

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;

    setFormData((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };
  const handleSubmit = async () => {
    try {
      const response = await register(formData);
      if (response && response.isSuccess) {
        alert(`${t("alertMessage.createSuccess")}`);

        navigation.navigate("Login");
      } else {
        setError(t("alertMessage.createError"));
      }
    } catch (error) {
      console.error("Registration failed: ", error);
      setError(t("alertMessage.createError"));
    }
  };
  return (
    <ImageBackground
      source={require("../assets/img/abstract_background.jpg")}
      style={styles.container}
    >
      <Text style={styles.title}>{t("register.title")}</Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          placeholder={t("register.name")}
          style={styles.input}
          value={formData.Name}
          onChangeText={(text) => setFormData({ ...formData, Name: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          placeholder={t("register.surname")}
          style={styles.input}
          value={formData.Surname}
          onChangeText={(text) => setFormData({ ...formData, Surname: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          placeholder={t("register.username")}
          style={styles.input}
          value={formData.Username}
          onChangeText={(text) => setFormData({ ...formData, Username: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="call-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          placeholder={t("register.phone")}
          style={styles.input}
          value={formData.Phone}
          onChangeText={(text) => setFormData({ ...formData, Phone: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          placeholder={t("register.Address")}
          style={styles.input}
          keyboardType="email-address"
          value={formData.Email}
          onChangeText={(text) => setFormData({ ...formData, Email: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          placeholder={t("register.password")}
          style={styles.input}
          secureTextEntry
          value={formData.Password}
          onChangeText={(text) => setFormData({ ...formData, Password: text })}
        />
      </View>

      {/* <TouchableOpacity style={styles.registerButton}>
        <Ionicons name="checkmark-circle" size={24} color="#fff" />
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
        <Text>{t("register.sign_up")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>{t("register.sign_in")}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderRadius: 25,
    width: 280,
    height: 45,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
  },
  registerButton: {
    top: 15,
    width: 120, // Biraz daha büyük yapalım
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: "#a4d6ed",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    transform: [{ scale: 1 }],
  },
  registerButtonnPressed: {
    transform: [{ scale: 0.95 }],
  },
  alreadyText: {
    color: "#888",
    marginBottom: 15,
  },
  loginText: {
    color: "#ffff",
    top: 85,
    fontWeight: "bold",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
