export type PostDetailsType = {
  id: string;
  title: string;
  updatedAt?: string;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
  Comment: {
    createdAt?: string;
    id: string;
    title: string;
    postId: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
