<script setup>
import {computed, reactive, ref} from 'vue';
import {validationRules} from '../../../utils/signUpValidation';
import Alert from '../ui/Alert.vue';
import Button from '../ui/Button.vue';
import Container from '../ui/Container.vue';
import FormStep from './FormStep.vue';

const emit = defineEmits(['onRegistrationError']);
const totalSteps = 4;
const stepHasError = ref(true);
const singUpType = ref('pf');
const currentStep = ref(1);
const hasServerError = ref(false);
const isRegistrationComplete = ref(false);
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
const isFirstStep = computed(() => currentStep.value === 1);
const isLastStep = computed(() => currentStep.value === totalSteps);
const stepsForm = {
  1: {
    title: 'Seja bem vindo(a)!',
    fields: ['email'],
  },
  2: {
    title: 'Pessoa Física',
    fields: ['name', 'cpf', 'birthDate', 'phone'],
  },
  3: {
    title: 'Senha de acesso',
    fields: ['password'],
  },
  4: {
    title: 'Revise suas informações',
    field: [],
  },
};

const handleSingUpTypeChange = (e) => {
  singUpType.value = e.target.value;
  stepsForm[2].title = singUpType.value === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica';
  stepsForm[2].fields =
    singUpType.value === 'pf' ? ['name', 'cpf', 'birthDate', 'phone'] : ['pjName', 'cnpj', 'pjPhone', 'startUpDate'];
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

const handleNextStepNav = () => {
  validateStepFields();

  if (!stepHasError.value) {
    currentStep.value++;
    stepHasError.value = true;
  }
};

const handlePrevStepNav = () => {
  currentStep.value--;

  if (isFirstStep.value) {
    resetFormErrors();
    return;
  }
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
  <div>
    <div v-if="!isRegistrationComplete">
      <span
        >Etapa <span class="mb-signup-form-current-step">{{ currentStep }}</span> de {{ totalSteps }}</span
      >
      <form @submit.prevent="handleSubmit" class="mb-signup-form">
        <h2>{{ stepsForm[currentStep].title }}</h2>
        <!-- Percorrer os steps -->
        <div v-for="(step, key) in stepsForm" :key="step">
          <!-- Se o passo atual for igual a key do step exibe os campos -->
          <Container display="flex" gap="xs" direction="col" v-if="currentStep === +key">
            <FormStep
              :form-state="formState"
              :form-errors="formErrors"
              :step-fields="stepsForm[currentStep].fields"
              @enter="handleInputEnter" />
            <!-- Exibe os campos de pessoa física ou jurídica no passo 1 -->
            <Container display="flex" gap="xs" v-if="currentStep === 1">
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
            </Container>
          </Container>
        </div>

        <!-- Review step -->
        <Container
          display="flex"
          gap="xs"
          direction="col"
          v-for="(step, key) in stepsForm"
          :key="step"
          v-if="isLastStep">
          <!-- Percorrer os campos do step atual -->
          <FormStep
            :form-state="formState"
            :form-errors="formErrors"
            :step-fields="stepsForm[key].fields"
            @enter="handleInputEnter" />
        </Container>

        <!-- Fim dos passos -->
        <Container display="flex" center marginTop="md">
          <Button v-if="!isFirstStep" type="button" variant="outline" @click="handlePrevStepNav">Anterior</Button>
          <Button v-if="!isLastStep" type="button" variant="solid" @click="handleNextStepNav">Continuar</Button>
          <Button v-else type="submit" variant="solid">Cadastrar</Button>
        </Container>
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

<style scoped>
.mb-signup-form-current-step {
  color: var(--brand);
}
</style>
