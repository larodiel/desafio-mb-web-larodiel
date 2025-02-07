export const validationRules = {
  email: (value) => {
    if (!value) {
      return {
        message: 'O email é obrigatório',
        isValid: false,
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return {
        message: 'Email inválido',
        isValid: false,
      };
    }

    return {
      message: '',
      isValid: true,
    };
  },
  name: (value) => {
    if (!value) {
      return {
        message: 'O nome é obrigatório',
        isValid: false,
      };
    }

    if (value.length < 3) {
      return {
        message: 'O nome deve ter no mínimo 3 caracteres',
        isValid: false,
      };
    }
    return {
      message: '',
      isValid: true,
    };
  },
  cpf: (value) => {
    if (!value) {
      return {
        message: 'O CPF é obrigatório',
        isValid: false,
      };
    }
    const cleanedCPF = value.replace(/\D/g, '');

    if (
      cleanedCPF.length !== 11 ||
      [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
      ].includes(cleanedCPF)
    ) {
      return {message: 'CPF inválido', isValid: false};
    }

    const digits = cleanedCPF.split('').map(Number);

    const calculateDigit = (factor) => {
      const sum = digits.slice(0, factor - 1).reduce((acc, num, i) => acc + num * (factor - i), 0);
      const remainder = (sum * 10) % 11;
      return remainder === 10 || remainder === 11 ? 0 : remainder;
    };

    if (calculateDigit(10) !== digits[9] || calculateDigit(11) !== digits[10]) {
      return {message: 'CPF inválido', isValid: false};
    }

    return {message: '', isValid: true};
  },
  birthDate: (value) => {
    if (!value) {
      return {
        message: 'A data de nascimento é obrigatória',
        isValid: false,
      };
    }
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(value)) {
      return {
        message: 'Data inválida',
        isValid: false,
      };
    }
    const [, day, month, year] = value.match(regex);
    const date = new Date(year, month - 1, day);
    if (date > new Date()) {
      return {
        message: 'Data não pode ser futura',
        isValid: false,
      };
    }

    return {
      message: '',
      isValid: true,
    };
  },
  phone: (value) => {
    if (!value) {
      return {
        message: 'O telefone é obrigatório',
        isValid: false,
      };
    }
    const cleanPhone = value.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return {
        message: 'Telefone inválido',
        isValid: false,
      };
    }
    return {
      message: '',
      isValid: true,
    };
  },
  pjName: (value) => {
    if (!value) {
      return {
        message: 'O nome é obrigatório',
        isValid: false,
      };
    }
    if (value.length < 3) {
      return {
        message: 'O nome deve ter no mínimo 3 caracteres',
        isValid: false,
      };
    }
    return {
      message: '',
      isValid: true,
    };
  },
  cnpj: (value) => {
    if (!value) {
      return {
        message: 'O CNPJ é obrigatório',
        isValid: false,
      };
    }
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const cleanedCNPJ = value.replace(/\D/g, '');

    if (cleanedCNPJ.length !== 14 || /^0{14}$/.test(cleanedCNPJ)) {
      return {message: 'CNPJ inválido', isValid: false};
    }

    const digits = cleanedCNPJ.split('').map(Number);

    const calculateDigit = (length) => {
      const sum = digits
        .slice(0, length)
        .reduce((acc, num, i) => acc + num * weights[i + (weights.length - length)], 0);
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    if (calculateDigit(12) !== digits[12] || calculateDigit(13) !== digits[13]) {
      return {message: 'CNPJ inválido', isValid: false};
    }

    return {message: '', isValid: true};
  },
  pjPhone: (value) => {
    if (!value) {
      return {
        message: 'O telefone da empresa é obrigatório',
        isValid: false,
      };
    }
    const cleanPhone = value.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return {
        message: 'Telefone inválido',
        isValid: false,
      };
    }
    return {
      message: '',
      isValid: true,
    };
  },
  startUpDate: (value) => {
    if (!value) {
      return {
        message: 'A data de abertura é obrigatória',
        isValid: false,
      };
    }
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(value)) {
      return {
        message: 'Data inválida',
        isValid: false,
      };
    }
    const [, day, month, year] = value.match(regex);
    const date = new Date(year, month - 1, day);
    if (date > new Date()) {
      return {
        message: 'Data não pode ser futura',
        isValid: false,
      };
    }

    return {
      message: '',
      isValid: true,
    };
  },
  password: (value) => {
    if (!value) {
      return {
        message: 'A senha é obrigatória',
        isValid: false,
      };
    }
    if (value.length < 8) {
      return {
        message: 'A senha deve ter no mínimo 8 caracteres',
        isValid: false,
      };
    }

    return {
      message: '',
      isValid: true,
    };
  },
};

const commonFields = [
  'email',
  'password',
];

export const pjFields = [...commonFields, 'pjName', 'cnpj', 'pjPhone', 'startUpDate'];

export const pfFields = [...commonFields, 'name', 'cpf', 'birthDate', 'phone'];

export const signUpFields = {
  pf: pfFields,
  pj: pjFields,
}
