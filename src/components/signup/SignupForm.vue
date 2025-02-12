<script setup>
import {computed, reactive, ref} from 'vue';
import {validationRules} from '../../../utils/signUpValidation';
import '../../styles/signup/signup-form.scss';
import Alert from '../ui/Alert.vue';
import Button from '../ui/Button.vue';
import FormStep from './FormStep.vue';

const emit = defineEmits(['onRegistrationError']);

const startStep = 'welcome';
const stepHasError = ref(true);
const singUpType = ref('pf');
const currentStep = ref(startStep);
const hasServerError = ref(false);
const isRegistrationComplete = ref(false);
const stepPointer = ref(0);
const formState = reactive({
  email: {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Qual seu email?',
    name: 'email',
    value: '',
  },
  name: {
    id: 'name',
    label: 'Nome',
    type: 'text',
    placeholder: 'Qual seu nome?',
    name: 'name',
    value: '',
  },
  cpf: {
    id: 'cpf',
    label: 'CPF',
    type: 'text',
    placeholder: 'Qual seu CPF?',
    name: 'cpf',
    value: '',
    mask: 'cpf',
  },
  birthDate: {
    id: 'birthDate',
    label: 'Data de nascimento',
    type: 'text',
    placeholder: 'Qual sua data de nascimento? (dd/mm/aaaa)',
    name: 'birthDate',
    value: '',
    mask: 'date',
  },
  phone: {
    id: 'phone',
    label: 'Telefone',
    type: 'tel',
    placeholder: 'Qual seu telefone?',
    name: 'phone',
    value: '',
    mask: 'phone',
  },
  pjName: {
    id: 'pjName',
    label: 'Nome da empresa',
    type: 'text',
    placeholder: 'Qual o nome da empresa?',
    name: 'pjName',
    value: '',
  },
  cnpj: {
    id: 'cnpj',
    label: 'CNPJ',
    type: 'text',
    placeholder: 'Qual o CNPJ?',
    name: 'cnpj',
    value: '',
    mask: 'cnpj',
  },
  pjPhone: {
    id: 'pjPhone',
    label: 'Telefone da empresa',
    type: 'tel',
    placeholder: 'Qual o telefone da empresa?',
    name: 'pjPhone',
    value: '',
    mask: 'phone',
  },
  startUpDate: {
    id: 'startUpDate',
    label: 'Data de abertura',
    type: 'text',
    placeholder: 'Qual data de abertura? (dd/mm/aaaa)',
    name: 'startUpDate',
    value: '',
    mask: 'date',
  },
  password: {
    id: 'password',
    label: 'Senha',
    type: 'password',
    placeholder: 'Qual sua senha?',
    name: 'password',
    value: '',
  },
});
const formErrors = reactive({});
const stepsOrder = ref([startStep, singUpType.value, 'password', 'review']);
const isFirstStep = computed(() => currentStep.value === startStep);
const isLastStep = computed(() => currentStep.value === stepsOrder.value[stepsOrder.value.length - 1]);
const currentStepInt = computed(() => stepPointer.value + 1);
const totalSteps = computed(() => stepsOrder.value.length);

const stepsForm = {
  welcome: {
    title: 'Seja bem vindo(a)!',
    fields: ['email'],
  },
  pf: {
    title: 'Pessoa Física',
    fields: ['name', 'cpf', 'birthDate', 'phone'],
  },
  pj: {
    title: 'Pessoa Jurídica',
    fields: ['pjName', 'cnpj', 'pjPhone', 'startUpDate'],
  },
  password: {
    title: 'Senha de acesso',
    fields: ['password'],
  },
  review: {
    title: 'Revise suas informações',
    field: [],
  },
};

const updateStepsOrder = (stepSlug = '', position = 0, replace = false) => {
  if (stepSlug === '') return;

  if (stepSlug !== '' && stepsOrder.value.indexOf(stepSlug) === -1) {
    if (!replace) {
      stepsOrder.value.splice(position, 0, stepSlug);
      return;
    }

    stepsOrder.value[position] = stepSlug;
    return;
  }
};

const handleSubmit = async (e) => {
  const jsonData = Object.fromEntries(Object.entries(formState).map(([key, field]) => [key, field.value]));
  jsonData.singUpType = singUpType.value;

  try {
    const response = await fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      hasServerError.value = true;
      return;
    }

    if (response.ok && response.status === 201) {
      isRegistrationComplete.value = true;
    }
  } catch (error) {
    hasServerError.value = true;
  }
};

const validateStepFields = () => {
  const currentFields = stepsForm[currentStep.value].fields;
  let hasError = false;

  for (let fieldIndex in currentFields) {
    const field = currentFields[fieldIndex];
    const stepValidationRules = validationRules[field];
    const validationResult = stepValidationRules(formState[field].value);

    if (validationResult && !validationResult.isValid) {
      hasError = true;
      formErrors[field] = validationResult;
      break;
    }
  }

  stepHasError.value = hasError;
  return hasError;
};

const handleSingUpTypeChange = (e) => {
  singUpType.value = e.target.value;
  updateStepsOrder(singUpType.value, 1, true);
};

const handleNextStepNav = () => {
  validateStepFields();

  if (!stepHasError.value && !isLastStep.value) {
    stepPointer.value++;

    const nextStep = stepsOrder.value[stepPointer.value];
    if (!nextStep) return;
    currentStep.value = nextStep;

    stepHasError.value = true;
  }
};

const handlePrevStepNav = () => {
  if (isFirstStep.value) {
    resetFormErrors();
    return;
  }

  stepPointer.value--;
  const prevStep = stepsOrder.value[stepPointer.value];

  if (!prevStep) return;

  currentStep.value = prevStep;
};

const handleInputEnter = () => {
  if (!isLastStep.value) {
    handleNextStepNav();
    return;
  }

  handleSubmit();
};

const resetFormErrors = () => {
  Object.keys(formErrors).forEach((key) => {
    formErrors[key] = '';
  });
};
</script>
<template>
  <div class="mb-signup-container">
    <div v-if="!isRegistrationComplete">
      <span class="mb-signup-step"
        >Etapa <span class="mb-signup-step-current">{{ currentStepInt }}</span> de {{ totalSteps }}</span
      >
      <form @submit.prevent="handleSubmit" class="mb-signup-form">
        <h2>{{ stepsForm[currentStep].title }}</h2>
        <div class="mb-signup-step-form-container" v-if="!isLastStep">
          <FormStep
            :form-state="formState"
            :form-errors="formErrors"
            :step-fields="stepsForm[currentStep].fields"
            @enter="handleInputEnter" />
          <!-- Exibe os campos de pessoa física ou jurídica no passo 1 -->
          <div class="mb-signup-type-input" v-if="currentStep === startStep">
            <span>
              <input
                id="pf"
                type="radio"
                :checked="singUpType === 'pf'"
                name="singUpType"
                value="pf"
                @change="handleSingUpTypeChange" />
              <label for="pf">Pessoa Física</label>
            </span>
            <span>
              <input
                id="pj"
                type="radio"
                :checked="singUpType === 'pj'"
                name="singUpType"
                value="pj"
                @change="handleSingUpTypeChange" />
              <label for="pj">Pessoa Jurídica</label>
            </span>
          </div>
        </div>

        <!-- Review step -->
        <div class="mb-signup-step-form-container" v-for="(step, key) in stepsOrder" :key="step" v-if="isLastStep">
          <!-- Percorrer os campos do step atual -->
          <FormStep
            v-if="stepsForm[step].fields"
            :form-state="formState"
            :form-errors="formErrors"
            :step-fields="stepsForm[step].fields"
            @enter="handleInputEnter" />
        </div>

        <!-- Fim dos passos -->
        <div class="mb-signup-navigation">
          <Button v-if="!isFirstStep" type="button" variant="outline" @click="handlePrevStepNav">Anterior</Button>
          <Button v-if="!isLastStep" type="button" variant="solid" @click="handleNextStepNav">Continuar</Button>
          <Button v-else type="submit" variant="solid">Cadastrar</Button>
        </div>
      </form>
    </div>
    <div v-else>
      <h2>Parabéns, seu cadastro foi realizado com sucesso!</h2>
      <p>Em breve você receberá um email com as instruções para acessar sua conta.</p>
    </div>
  </div>
  <Alert type="error" v-if="hasServerError" title="Erro ao processar o cadastro">
    <div class="alert-description">Por favor, verifique se os dados foram preenchidos corretamente.</div>
  </Alert>
</template>
