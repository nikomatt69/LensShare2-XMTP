const List = ({ items, mt }: { items: string[]; mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
    {items.map((item: string) => (
      <p
        key={item}
        className="text-gray-400 text-sm  hover:underline cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => (
  <div className="mt-6 hidden xl:block">
    <List items={[]} mt={false} />
    <List items={[]} mt />
    <List items={[]} mt />
    <a className="text-gray-400 text-sm mt-5" href="https://lens-do-it.vercel.app/" target="_blank" rel="noreferrer">→ Click here for a testnet Lens handle</a>
    <p className="text-gray-400 text-sm mt-5">© 2022 LensShare</p>
  </div>
);

export default Footer;