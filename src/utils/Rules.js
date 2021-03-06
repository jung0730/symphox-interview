export const email = (value) => /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(value) || 'invalid email'
export const number = (value) => (!isNaN(Number(value)) && !!value && /^[0-9]*$/.test(value)) || 'number only'
export const required = (value) => (((typeof value === 'string') && value.trim() !== '') || !!value) || 'required'