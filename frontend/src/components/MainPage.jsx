import { getChannels } from '../store/channelsApi';
import { getMessages } from '../store/messagesApi';

const MainPage = () => {
  console.log(getChannels());
  console.log(getMessages());
  return (
    <>
      <h2>Главная страница</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima cumque
        eum sequi hic voluptatibus, corrupti facilis eligendi inventore
        similique sapiente autem maxime numquam accusamus ad, vel animi neque
        aliquam quasi.
      </p>
    </>
  );
};

export default MainPage;
