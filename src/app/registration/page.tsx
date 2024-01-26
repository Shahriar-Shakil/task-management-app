import RegistrationForm from "@/components/Form/RegistrationForm";
import PageWrapper from "@/components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <main className=" min-h-screen  p-8 md:p-24  ">
        <RegistrationForm />
      </main>
    </PageWrapper>
  );
}
