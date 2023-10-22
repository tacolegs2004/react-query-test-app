import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useMutationState,
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

  const mutations = useMutationState<TPost>({
    filters: { status: "pending" },
    select: (mutation) => mutation.state.variables as TPost,
  });

  return (
    <div>
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
      <ul>
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
      <div className=" mt-4">
        <span className="bg-gray-900 p-2 mt-2 rounded-md">
          current pending mutations
        </span>
        {mutations.map((mutation) => (
          <h1 key={mutation.id} className="text-lg mt-2">
            {mutation.header}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default App;
