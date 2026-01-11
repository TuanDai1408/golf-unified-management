
export type Language = 'vi' | 'ko' | 'en';

export interface AuthTranslations {
    login: string;
    register: string;
    username: string;
    password: string;
    email: string;
    signIn: string;
    signUp: string;
    forgotPassword: string;
    noAccount: string;
    haveAccount: string;
    adminPortal: string;
    managerPortal: string;
    invalidCredentials: string;
    welcomeBack: string;
    createAccount: string;
    selectLanguage: string;
    logout: string;
}

export const authTranslations: Record<Language, AuthTranslations> = {
    vi: {
        login: 'Đăng nhập',
        register: 'Đăng ký',
        username: 'Tên đăng nhập',
        password: 'Mật khẩu',
        email: 'Email',
        signIn: 'Đăng nhập',
        signUp: 'Đăng ký ngay',
        forgotPassword: 'Quên mật khẩu?',
        noAccount: 'Chưa có tài khoản?',
        haveAccount: 'Đã có tài khoản?',
        adminPortal: 'Cổng quản trị Admin',
        managerPortal: 'Cổng quản lý Sân Golf',
        invalidCredentials: 'Thông tin đăng nhập không hợp lệ. Gợi ý: admin/admin',
        welcomeBack: 'Chào mừng trở lại',
        createAccount: 'Tạo tài khoản mới',
        selectLanguage: 'Chọn ngôn ngữ',
        logout: 'Đăng xuất',
    },
    ko: {
        login: '로그인',
        register: '회원가입',
        username: '사용자 이름',
        password: '비밀번호',
        email: '이메일',
        signIn: '로그인',
        signUp: '지금 가입하세요',
        forgotPassword: '비밀번호를 잊으셨나요?',
        noAccount: '계정이 없으신가요?',
        haveAccount: '이미 계정이 있으신가요?',
        adminPortal: '관리자 포털',
        managerPortal: '골프장 관리 포털',
        invalidCredentials: '잘못된 자격 증명입니다. 힌트: admin/admin',
        welcomeBack: '환영합니다',
        createAccount: '새 계정 만들기',
        selectLanguage: '언어 선택',
        logout: '로그아웃',
    },
    en: {
        login: 'Login',
        register: 'Register',
        username: 'Username',
        password: 'Password',
        email: 'Email',
        signIn: 'Sign In',
        signUp: 'Sign Up Now',
        forgotPassword: 'Forgot Password?',
        noAccount: "Don't have an account?",
        haveAccount: 'Already have an account?',
        adminPortal: 'Admin Portal',
        managerPortal: 'Golf Club Manager',
        invalidCredentials: 'Invalid credentials. Hint: admin/admin',
        welcomeBack: 'Welcome Back',
        createAccount: 'Create New Account',
        selectLanguage: 'Select Language',
        logout: 'Logout',
    },
};
