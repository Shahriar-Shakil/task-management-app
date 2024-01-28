import LoginForm from "@/components/Form/LoginForm";
import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "flowbite-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <Link
          className="text-3xl font-bold text-gray-800 hover:text-gray-600"
          href="/"
        >
          Next <br />
          Todo App
        </Link>
        <nav>
          <Link href="/registration">
            <Button>SignUp</Button>
          </Link>
        </nav>
      </header>
      <PageWrapper>
        <LoginForm />
      </PageWrapper>
    </>
  );
}
