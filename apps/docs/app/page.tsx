import { Button, Header } from "ui";

const Page = () => {
  return (
    <>
      <Header text="Docs" />
      <Button leftSlot={<div>left</div>}>button</Button>
    </>
  );
};

export default Page;
