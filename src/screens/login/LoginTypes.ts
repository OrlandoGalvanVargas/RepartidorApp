export interface VerifyResponse {
    message: string;
    data: {
      usuario: {
        id: number;
        nombre: string;
        vehiculo: {
          tipo: string;
          matricula: string;
        };
        sucursal: string;
      };
    };
  }
  
  export interface LoginFormValues {
    email: string;
    password: string;
  }
  
  export interface LoginState {
    emailError: string;
    passwordError: string;
    modalVisible: boolean;
    errorModalVisible: boolean;
    errorMessage: string;
    isLoading: boolean;
    verifyData: VerifyResponse | null;
    loginAttempts: number;
    isBlocked: boolean;
    deviceId: string;
    lockoutEndTime: number | null;
    isSubmitting: boolean;
  }