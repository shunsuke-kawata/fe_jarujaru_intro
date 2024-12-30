interface signupParams {
  username: string;
  password: string;
  confirmPassword: string;
}

interface loginParams {
  username: string;
  password: string;
}

export type { signupParams, loginParams };
