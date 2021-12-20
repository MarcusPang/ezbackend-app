import Sidebar from './Sidebar';
import Timeline from './Timeline';

const Feed = () => {
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <Timeline />
      <Sidebar />
    </div>
  );
};

export default Feed;
