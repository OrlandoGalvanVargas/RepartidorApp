export type RootStackParamList = {
    Initial: undefined;
    Login: undefined;
    Main: undefined;
    // Agrega aquí otras rutas si es necesario
  };
  
  // Esto es para que useNavigation sepa los tipos disponibles
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }