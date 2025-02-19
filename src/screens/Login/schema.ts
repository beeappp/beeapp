import * as Yup from 'yup';

export const validationSchema = Yup.object({
  phone: Yup.string().required(`Парольды енгызыныз`).min(16, `16 сан кажет`),
  passwordLogin: Yup.string()
    .required()
    .min(10, 'Минимум 10 символ')
    .matches(/[a-z]/, 'Бір кіші әріп болуы тиіс')
    .matches(/[A-Z]/, 'Бір үлкен әріп болуы тиіс')
    .matches(/[0-9]/, 'Бір сан болуы тиіс')
    .matches(/[@$!%*?&#]/, 'Бір арнайы символ болуы тиіс (@$!%*?&#)'),
});
