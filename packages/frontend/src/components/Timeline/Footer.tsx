interface FooterProps {
  caption: string;
  username: string;
}

const PostFooter = ({ caption, username }: FooterProps) => {
  return (
    <div className="p-4 pt-2 pb-1 prose prose-invert">
      <h3 className="mb-0">{username}</h3>
      <span className="">{caption}</span>
    </div>
  );
};

export default PostFooter;
