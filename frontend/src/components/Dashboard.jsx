import TextForm from "./TextForm";
import FileForm from "./FileForm";

const Dashboard = () => {
  window.onbeforeunload = function (e) {
    e = e || window.event;

    e.returnValue = "You want to leave ? ";
  };

  return (
    <div className="mx-6 my-2">
      <FileForm />
      <div className="border my-2"></div>
      <TextForm />
    </div>
  );
};

export default Dashboard;
