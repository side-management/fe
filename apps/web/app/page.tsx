import { Button, Header } from "ui";
import { match } from "utils";

export default function Page() {
  const a = match({ a: "1", b: "test" })
    .with({ a: "1" }, () => "1")
    .with({ a: "2", b: "test" }, () => "2")
    .otherwise(() => "3");

  console.log(a);
  return (
    <>
      <Header text="Web" />
      <Button leftSlot={<div>left</div>}>{a}</Button>
    </>
  );
}
