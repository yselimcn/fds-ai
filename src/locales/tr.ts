const dictionary = {
    page: {
        home: {
            title: 'Lorem ipsum dolor sit amet',
            description:
                ' ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
    component: {
        input: {
            placeholder: 'Tasarımın Geleceğine Hoş Geldiniz',
        },
        email_input: {
            placeholder: 'email@ornek.com',
            error: {
                invalid: 'Lütfen geçerli bir e-posta adresi girin.',
                required: 'E-posta adresi zorunludur.',
            },
        },
        password_input: {
            placeholder: 'Parolanız',
            strength: {
                weak: 'Zayıf',
                medium: 'Orta',
                strong: 'Güçlü',
            },
            criteria: {
                uppercase: 'Parola bir büyük harf içermelidir.',
                lowercase: 'Parola bir küçük harf içermelidir.',
                number: 'Parola bir rakam içermelidir.',
                special: 'Parola bir özel karakter içermelidir.',
                minLength: 'Parola en az {min} karakter olmalıdır.',
            },
            error: {
                required: 'Parola zorunludur.',
                minLength: 'Parola en az {min} karakter olmalıdır.',
            },
            showPassword: 'Parolayı göster',
            hidePassword: 'Parolayı gizle',
        },
        button: {
            submit: 'Gönder',
        },
        phone_input: {
            placeholder: 'Telefon numarası',
            error: {
                required: 'Telefon numarası gerekli.',
                invalid: 'Geçersiz telefon numarası.',
            },
        },
        date_picker: {
            select_date: 'Tarih seçiniz',
            select_date_range: 'Tarih aralığı seçiniz',
        },
    },
    themes: {
        default: 'Default',
        parasut: 'Paraşüt',
        bizmu: 'Bizmu',
    },
} as const

export type Dictionary = typeof dictionary

export default dictionary
