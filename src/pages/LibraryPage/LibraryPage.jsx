import AddBookForm from "../../components/AddBookForm";
import AlreadyReadList from "../../components/AlreadyReadList";
import GoingToReadList from "../../components/GoingToReadList";
import ReadingNowList from "../../components/ReadingNowList";

const LibraryPage = () => {
  return (
    <>
      <AddBookForm />
      <AlreadyReadList />
      <ReadingNowList />
      <GoingToReadList />
    </>
  );
};

export default LibraryPage;
