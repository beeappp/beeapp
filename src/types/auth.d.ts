interface loginForm {
  code?: string;
  phone: string;
}

interface registerForm {
  email: string;
  uniqueName: string;
  date?: Date;
}

interface RootStateauthForm {
  isLogined: boolean;
  image: string;
  user: {
    email: string;
    uniqueName: string;
    phone?: string;
  };
}
