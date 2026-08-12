export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: {
    department: string;
    title: string;
  };
};