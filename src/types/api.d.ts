export namespace API {
  export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }

  export interface Client {
    id: string;
    userId: string;
    firstName: string;
    lastName?: string;
  }
}
