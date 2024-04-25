import { useGetChannelsQuery } from '../api/channelsApi';

const Chat = () => {
  const { data } = useGetChannelsQuery();
  console.log(useGetChannelsQuery());
  console.log(data);
  return (
    <div className="text-center mt-5">
      <h1 className="text-muted">Chat</h1>
      {data?.length ? <div>{data.map((item) => <li key={item.id}>{item.name}</li>)}</div> : null}
    </div>
  );
};

export default Chat;
