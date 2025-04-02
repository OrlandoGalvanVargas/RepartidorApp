import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { styles } from "../screens/login/LoginStyles";

export const LoginButton = ({
    isLoading,
    handleLogin
  }: {
    isLoading: boolean;
    handleLogin: () => void;
  }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={handleLogin}
      disabled={isLoading}
      accessible={true}
      accessibilityLabel="Botón para iniciar sesión"
      accessibilityRole="button"
    >
      <ThemedText type="defaultSemiBold" style={styles.buttonText}>
        {isLoading ? 'Cargando...' : 'Iniciar sesión'}
      </ThemedText>
    </TouchableOpacity>
  );
  