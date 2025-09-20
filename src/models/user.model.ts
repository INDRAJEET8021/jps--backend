export const CREATE_USER = `
  INSERT INTO users (name, email, phone, password)
  VALUES (?, ?, ?, ?)
`;

export const GET_USER_BY_EMAIL = `
  SELECT * FROM users WHERE email = ?
`;

export const GET_USER_BY_PHONE = `SELECT * FROM users WHERE phone=?`;
