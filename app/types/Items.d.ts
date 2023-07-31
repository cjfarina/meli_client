export interface Item {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: 5;
  description: string;
  location: string;
}

export interface Items {
  items: Array<Item>;
  title: string;
  currentUser: {
    name: string;
    lastname: string;
  };
  categories: Array<String>;
}
