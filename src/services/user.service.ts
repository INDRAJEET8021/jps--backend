import { CREATE_USER, GET_USER_BY_EMAIL, GET_USER_BY_PHONE } from '@models/user.model';
import bcrypt from 'bcrypt';
import { getConnection } from 'database/dbConnection';
import jwt from 'jsonwebtoken';

interface CreateUserDTO {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginUserDTO {
  identifier: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

class UserService {
  public async registerUser(data: CreateUserDTO) {
    const connection = getConnection();

    // Check if user with email exists
    const [existingUser]: any = await connection.query(GET_USER_BY_EMAIL, [data.email]);
    if (existingUser.length > 0) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Insert user
    const [result]: any = await connection.query(CREATE_USER, [
      data.name,
      data.email,
      data.phone,
      hashedPassword,
    ]);

    return { id: result.insertId, ...data, password: undefined };
  }

  // Password-based login
  public async loginUser(data: LoginUserDTO) {
    const connection = getConnection();
    let user: any;

    // Check if identifier is email or phone
    if (data.identifier.includes('@')) {
      const [rows]: any = await connection.query(GET_USER_BY_EMAIL, [data.identifier]);
      user = rows[0];
    } else {
      const [rows]: any = await connection.query(GET_USER_BY_PHONE, [data.identifier]);
      user = rows[0];
    }

    if (!user) {
      throw new Error('User not found');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } };
  }
}

export default UserService;
