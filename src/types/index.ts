export interface IUser {
  id: string;
  username: string;
}
export interface IExpense {
  id?: string;
  userId?: string;
  title: string;
  amount: number;
  date: Date;
  showDate?: boolean;
}

export interface IFilters {
  title?: string;
  minAmount?: number;
  maxAmount?: number;
  fromDate?: Date;
  toDate?: Date;
}


export interface IInfoAboutExpense {
    maxDate?: Date;
    minDate?: Date;
    totalExpenses: number;
    expenses: IExpense[];
  }