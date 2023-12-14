//ルーティングの基準となるpage.tsx
const Home = () => {
  console.log(process.env.TEST);
  return (
    <>
      <div>
        <p>{process.env.TEST}</p>
      </div>
    </>
  );
};
export default Home;
