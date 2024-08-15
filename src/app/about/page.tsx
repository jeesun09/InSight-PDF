import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Us"
}

const About = () => {
  return (
    <>
      <main className="p-5 w-full min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
        <p className="mb-4">
          Welcome to InSight PDF, where the power of AI meets the world of
          digital documents. Our mission is to transform the way you interact
          with your PDFs, making it easier than ever to extract insights, find
          answers, and unlock the full potential of your content.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p className="mb-4">
          In a world overflowing with information, finding the right data at the
          right time is crucial. At InSight PDF, we believe that your documents
          should work for you, not the other way around. By harnessing the
          latest advancements in artificial intelligence, we empower users to
          engage with their PDFs in a more meaningful and intuitive way.
        </p>
        <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
        <p className="text-lg text-gray-600 mb-4">
          InSight PDF is an AI-driven platform that allows you to:
        </p>
        <ul className="list-disc list-inside text-left text-lg text-gray-600 mb-4">
          <li>
            <strong>Chat with Your PDFs</strong>: Ask questions directly to your
            PDFs and get immediate, accurate responses.
          </li>
          <li>
            <strong>Extract Insights</strong>: Dive deep into your documents to
            uncover hidden insights and valuable information.
          </li>
          <li>
            <strong>Enhance Productivity</strong>: Save time and effort by
            getting the information you need without scrolling through endless
            pages.
          </li>
        </ul>
        {""}
        <p className="text-lg text-gray-600 mb-4">
          Thank you for choosing InSight PDF. We&apos;re excited to help you
          unlock the full potential of your documents!
        </p>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions or feedback, feel free to{" "}
          <Link
            href="mailto:jeesunbari2002@gmail.com"
            className="text-blue-500 underline"
          >
            contact us
          </Link>
          . We would love to hear from you!
        </p>
        <div className="flex justify-center mt-8 space-x-6">
          <Link
            href="https://www.facebook.com/jee.sun.09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700"
          >
            <Facebook className="w-8 h-8" />
          </Link>
          <Link
            href="https://github.com/jeesun09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black"
          >
            <Github className="w-8 h-8" />
          </Link>
          <Link
            href="https://x.com/JeesunSk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-400"
          >
            <Twitter className="w-8 h-8" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/jeesun30/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500"
          >
            <Linkedin className="w-8 h-8" />
          </Link>
          <Link
            href="https://www.instagram.com/jeesun___/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-600"
          >
            <Instagram className="w-8 h-8" />
          </Link>
        </div>
      </main>
    </>
  );
};

export default About;
