import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { signUpFields, validationRules } from '../utils/signUpValidation.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, '../dist')));

app.use(helmet());
app.use(express.json());

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.post('/registration', (req, res) => {
  const { singUpType } = req.body;

  if (!singUpType || (singUpType !== 'pf' && singUpType !== 'pj')) {
    return res.status(400).json({message: 'Tipo de cadastro inválido'});
  }

  const formFields = signUpFields[singUpType];
  for (const field of formFields) {
    if(!req.body[field]) {
      return res.status(400).json({message: `O campo ${field} é obrigatório`});
    }
    const validateField = validationRules[field];
    const validationResult = validateField(req.body[field]);
    if (!validationResult.isValid) {
      return res.status(400).json(validationResult);
    }
  }

  res.status(201).json({message: 'Registrado com sucesso'});
});

app.listen(8088);
