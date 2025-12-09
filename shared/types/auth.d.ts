//Types added for Authentication
declare module "#auth-utils" {
  interface User {
    id: string;
    username: string;
  }

  interface UserSession {
    // Add your own fields
  }
}

export { User };
