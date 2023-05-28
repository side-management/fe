import { Button, Header } from "ui";

export default function Page() {
  return (
    <>
      <Header text="Web" />
      <Button leftSlot={<div>left</div>}>button</Button>
    </>
  );
}
