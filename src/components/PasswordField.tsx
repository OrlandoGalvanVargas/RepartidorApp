import { TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../screens/login/LoginStyles";
import Ionicons from "react-native-vector-icons/Ionicons";

export const PasswordField = ({
    password,
    showPassword,
    setPassword,
    setShowPassword,
    passwordError
  }: {
    password: string;
    showPassword: boolean;
    setPassword: (text: string) => void;
    setShowPassword: (show: boolean) => void;
    passwordError: string;
  }) => (
    <View style={styles.passwordContainer}>
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null, styles.passwordInput]}
        placeholder="Contraseña"
        placeholderTextColor="#828282" 
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Campo de contraseña"
        accessibilityHint="Ingrese su contraseña registrada"
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => setShowPassword(!showPassword)}
        accessibilityLabel={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        accessibilityRole="button"
      >
        <Ionicons 
          name={showPassword ? "eye-off" : "eye"} 
          size={24} 
          color="#999" 
        />
      </TouchableOpacity>
    </View>
  );
  