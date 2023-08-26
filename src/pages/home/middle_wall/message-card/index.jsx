import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main/Main";

export default function MessageCard({ tweet }) {
  return (
    <>
      {/* header */}
      <Header tweet={tweet} />
      {/* main - content */}
      {/* footer */}

      <div className="pl-16">
        <Main tweet={tweet} />

        <Footer tweet={tweet} />
      </div>
      <hr className="border-gray-600" />
    </>
  );
}
