import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import "./App.css";

const qyeryClient = new QueryClient();

type TPost = {
  id: number;
  header: string;
  body: string;
};

const posts: TPost[] = [
  {
    id: 1,
    header: "This is header 1",
    body: "This is body 1",
  },
  {
    id: 2,
    header: "This is header 2",
    body: "This is body 2",
  },

  {
    id: 3,
    header: "This is header 3",
    body: "This is body 3",
  },

  {
    id: 4,
    header: "This is header 4",
    body: "This is body 4",
  },
];
let index = posts.length + 1;

function App() {
  return (
    <QueryClientProvider client={qyeryClient}>
      <Todo />
    </QueryClientProvider>
  );
}

const Todo = () => {
  const { isPending, variables, mutate } = useMutation({
    mutationFn: async (post: TPost) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      posts.push(post);
      index++;
    },
  });

  const { data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => posts,
  });

  return (
    <ul>
      <button
        onClick={() =>
          mutate({
            id: index,
            header: `This is header ${index}`,
            body: `This is post ${index}`,
          })
        }
      >
        Mutate
      </button>
      {data?.map((post) => (
        <li key={post.id}>{post.header}</li>
      ))}
      {isPending && (
        <li
          style={{
            opacity: 0.5,
          }}
        >
          {variables.header}
        </li>
      )}
    </ul>
  );
};

export default App;
