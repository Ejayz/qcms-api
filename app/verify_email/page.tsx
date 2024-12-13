import IndexHeader from "@/components/UI/IndexHeader";
import IndexWithoutHeader from "@/components/UI/IndexWithoutHeader";
import { EmailTemplate } from "@/components/UI/email-template";

export default function Home() {
  return (
    <IndexWithoutHeader>
      <EmailTemplate firstName="John" />
    </IndexWithoutHeader>
  );
}
