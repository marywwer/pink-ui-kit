import { AuthResponse, User } from "../../store/auth/authTypes";

type StoredUser = User & {
  password: string;
};

const USERS_KEY = "pink-shop-users";

const ADMIN_EMAIL = "admin@fleur.ru";
const ADMIN_PASSWORD = "admin123";

const getUsers = (): StoredUser[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const createToken = () => {
  return `mock-token-${crypto.randomUUID()}`;
};

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAuthApi = {
  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    await delay();

    const users = getUsers();

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      throw new Error("Пользователь с таким email уже существует");
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role: "user",
    };

    saveUsers([...users, newUser]);

    const { password: _, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      token: createToken(),
    };
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    await delay();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return {
        user: {
          id: "admin",
          name: "Администратор",
          email: ADMIN_EMAIL,
          role: "admin",
        },
        token: createToken(),
      };
    }

    const users = getUsers();

    const foundUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!foundUser) {
      throw new Error("Неверный email или пароль");
    }

    const { password: _, ...userWithoutPassword } = foundUser;

    return {
      user: userWithoutPassword,
      token: createToken(),
    };
  },
};
